import { useState, useMemo, useCallback } from "react";
import { getDeterministicScore, getCardContent, isValidSiteUrl } from "@/lib/diagx-core";

export const useDiagX = () => {
    const [step, setStep] = useState<number>(1);
    const [url, setUrl] = useState<string>("");
    const [leadName, setLeadName] = useState<string>("");
    const [leadEmail, setLeadEmail] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);

    // Novas variáveis de estado para armazenar o retorno da API
    const [apiData, setApiData] = useState<Record<string, any> | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [urlError, setUrlError] = useState<string>("");


    const valid = useMemo(() => isValidSiteUrl(url), [url]);

    // O Score é mantido determinístico como visual base (conforme PRD pipeline) ou dinâmico
    const score = useMemo(() => getDeterministicScore(url), [url]);

    // O conteúdo da "UI" inicialmente usa o mock, mas é mascarado pelos dados do Gemini se existirem
    const cardContent = useMemo(() => {
        if (!apiData || !apiData.analysis) {
            return getCardContent(score);
        }

        const analysis = apiData.analysis;

        // Pega as chaves (ex: velocidade, seo, mobile, presenca_local) ignorando erros pontuais estruturais
        const keys = Object.keys(analysis).filter(k => analysis[k] && analysis[k].ponto_forte);

        const positives = keys.map(k => analysis[k].ponto_forte);
        const criticals = keys.map(k => analysis[k].ponto_fraco);

        // A Dica de ouro é a recomendação da pior nota
        let worstEixo = keys[0];
        let worstNota = 10;
        keys.forEach(k => {
            if (analysis[k].nota < worstNota) {
                worstNota = analysis[k].nota;
                worstEixo = k;
            }
        });

        const goldenTip = worstEixo ? analysis[worstEixo].recomendacao : getCardContent(score).goldenTip;

        return {
            positives: positives.length > 0 ? positives : getCardContent(score).positives,
            criticals: criticals.length > 0 ? criticals : getCardContent(score).criticals,
            goldenTip: goldenTip || getCardContent(score).goldenTip
        };

    }, [apiData, score]);

    const handleUrlSubmit = useCallback(async () => {
        setTouched(true);
        if (valid) {
            setStep(2); // Inicia imediatamente a UI do Theater Terminal
            setIsAnalyzing(true);

            // Dispara requisição Edge/Serverless silenciosamente no Background (8~12s limit)
            try {
                const response = await fetch('/api/diagx/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        url: url.startsWith("http") ? url : `https://${url}`
                    })
                });

                if (response.status === 422) {
                    setStep(1);
                    setUrlError("Verifique se a URL existe e está correta.");
                    setIsAnalyzing(false);
                    return;
                }

                const data = await response.json();

                if (data.success && data.analysis) {
                    setApiData(data); // Salva com sucesso para renderizar no passo 4
                } else if (data.signals) {
                    setApiData(data); // Salva os sinais crus pro fallback local
                }

            } catch (err) {
                console.error("Analysis Background Error:", err);
            } finally {
                setIsAnalyzing(false);
            }
        }
    }, [valid, url]);

    const handleTerminalFinish = useCallback(() => {
        setStep(3);
    }, []);

    const handleLeadUnlock = useCallback(async (name: string, email: string) => {
        setLeadName(name);
        setLeadEmail(email);

        // Dispara requisição para a nossa mais recente rota de captura no Supabase
        try {
            await fetch('/api/diagx/capture', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    url_testada: url,
                    score_calculado: parseFloat((score * 10).toString()), // 1-10 ref convertido de 45-68 visual se houver
                    device_os: window.navigator.userAgent,
                    gemini_response_raw: apiData ? apiData.analysis : null
                })
            });
        } catch (captureErr) {
            console.error("Lead Capture Error:", captureErr);
            // Non-blocking: mesmo que caia ou a internet pise, nós entregamos o conteúdo por UX!
        }

        // Destranca o relatório para a Tela 4 na força brutal da fluidez
        setStep(4);
    }, [url, apiData, score]);

    const handleUrlChange = useCallback((newUrl: string) => {
        setUrl(newUrl);
        setTouched(true);
        setUrlError(""); // ← limpa erro ao digitar
    }, []);

    return {
        step,
        url,
        leadName,
        leadEmail,
        touched,
        valid,
        score,
        cardContent,
        isAnalyzing,
        urlError,
        handleUrlChange,
        handleUrlSubmit,
        handleTerminalFinish,
        handleLeadUnlock
    };
};
