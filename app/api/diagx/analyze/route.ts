import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as cheerio from "cheerio";

// Força execução em runtime — impede o Next.js de tentar executar esta route durante o build
export const dynamic = 'force-dynamic';

// The prompt strictly follows the PRD structure
const generateDiagXPrompt = (url: string, signals: string) => `
Você é um auditor técnico sênior de sites digitais da Astúcia Digital Solutions.
Analise os sinais técnicos abaixo, extraídos do site ${url}, e retorne
EXCLUSIVAMENTE um JSON válido sem nenhum texto adicional, comentário ou
formatação markdown fora do JSON.

Estrutura obrigatória de retorno:
{
  "velocidade": {
    "nota": 0,
    "ponto_forte": "<1 frase técnica e direta, max 15 palavras>",
    "ponto_fraco": "<1 frase técnica e direta, max 15 palavras>",
    "recomendacao": "<como a Astúcia Digital Solutions resolve isso, max 20 palavras>"
  },
  "seo": {
    "nota": 0,
    "ponto_forte": "...",
    "ponto_fraco": "...",
    "recomendacao": "..."
  },
  "presenca_local": {
    "nota": 0,
    "ponto_forte": "...",
    "ponto_fraco": "...",
    "recomendacao": "..."
  },
  "mobile": {
    "nota": 0,
    "ponto_forte": "...",
    "ponto_fraco": "...",
    "recomendacao": "..."
  }
}

Regras obrigatórias:
1. As notas (0 a 10) devem ser do tipo Number Inteiro.
2. Seja técnico, mas compreensível para donos de negócios — não para desenvolvedores.
3. Nunca invente dados ausentes nos sinais. Se um sinal está ausente, trate como problema.
4. As notas devem refletir os sinais reais extraídos, sem inventar métricas.
5. As recomendações sempre devem mencionar "Astúcia Digital Solutions" como solução.
6. Se não for possível analisar um eixo por falta de sinais, retorne nota 3 e indique ausência de dados.
7. Responda somente em português do Brasil.

Sinais extraídos do site ${url}:
${signals}
`;

export async function POST(req: Request) {
    try {
        // ✅ Inicializado em runtime — a variável de ambiente já está disponível
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("Gemini API key missing. Returning mock analysis.");
            return NextResponse.json({
                success: true,
                analysis: {
                    velocidade: { nota: 8, ponto_forte: "Carregamento inicial rápido", ponto_fraco: "Imagens pesadas", recomendacao: "Otimizar assets com a Astúcia Digital Solutions" },
                    seo: { nota: 7, ponto_forte: "Meta tags presentes", ponto_fraco: "Falta de schema markup", recomendacao: "Implementar dados estruturados com a Astúcia Digital Solutions" },
                    presenca_local: { nota: 6, ponto_forte: "Mapa encontrado", ponto_fraco: "GMB não otimizado", recomendacao: "Melhorar SEO local com a Astúcia Digital Solutions" },
                    mobile: { nota: 9, ponto_forte: "Viewport configurado", ponto_fraco: "Elementos próximos", recomendacao: "Ajustar UX mobile com a Astúcia Digital Solutions" }
                },
                signals: { mock: true }
            });
        }
        const ai = new GoogleGenAI({ apiKey });

        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // 1. Fetch the target URL server-side to bypass CORS and simulate a real bot
        let html = "";
        try {
            // Format URL correctly
            const fetchUrl = url.startsWith("http") ? url : `https://${url}`;

            // Adding a timeout signal so it doesn't hang indefinitely (Edge/Serverless friendly)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

            const res = await fetch(fetchUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible; AstuciaBot/1.0; +https://astucia.com)",
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!res.ok) {
                throw new Error(`Failed to fetch URL: ${res.status}`);
            }
            html = await res.text();
        } catch (fetchError) {
            console.error("Error fetching URL:", fetchError);
            return NextResponse.json({
                error: "ERR_FETCH",
                message: "Não foi possível acessar a URL. Verifique se o site está online, o formato do endereço ou tente sem o https."
            }, { status: 422 });
        }

        // 2. Use Cheerio to parse HTML efficiently and extract precise signals
        const $ = cheerio.load(html);

        const signals = {
            title: $("title").text()?.trim() || "Nenhum título presente",
            metaDescription: $("meta[name='description']").attr("content")?.trim() || "Ausente",
            h1Count: $("h1").length,
            h2Count: $("h2").length,
            viewportMeta: $("meta[name='viewport']").length > 0 ? "Configurado (Presente)" : "Ausente (Risco Mobile)",
            imagesTotal: $("img").length,
            imagesWithoutAlt: $("img:not([alt]), img[alt='']").length,
            scriptTagsTotal: $("script").length,
            hasMapLinks: html.toLowerCase().includes("maps.google") || html.toLowerCase().includes("goo.gl/maps") ? "Sim (Sinal Positivo Local)" : "Não detectado",
            hasSchemaMarkup: $("script[type='application/ld+json']").length > 0 ? "Sim (Encontrado)" : "Ausente (Baixa otimização semântica)",
            bodyTextLength: $("body").text().replace(/\s+/g, " ").trim().length,
            hasPhoneNumbers: /(\+\d{1,3}\s?)?(\(\d{2}\)\s?)?9?\d{4}[-\s]?\d{4}/.test(html) ? "Presente" : "Não detectado",
        };

        const structuredSignals = JSON.stringify(signals, null, 2);

        // 3. Call Gemini Model for structured analysis based on signals
        const prompt = generateDiagXPrompt(url, structuredSignals);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: prompt,
            });

            let jsonText = response.text || "{}";

            // Purge possible markdown wrappings returned by some GenAI defaults
            jsonText = jsonText.replace(/^```(json)?\s*/i, "").replace(/```$/i, "").trim();

            const analysisResult = JSON.parse(jsonText);

            return NextResponse.json({ success: true, analysis: analysisResult, signals });

        } catch (aiError) {
            console.error("Error parsing/generating with Gemini:", aiError);
            // Fallback payload to avoid breaking the UI for the lead
            return NextResponse.json({
                error: "ERR_AI",
                message: "A IA encontrou instabilidades, mas a extração estrutural funcionou.",
                signals
            }, { status: 500 });
        }

    } catch (error) {
        console.error("General error in DiagX analysis:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}