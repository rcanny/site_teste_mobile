import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inicializa o cliente Supabase utilizando a Service Role Key.
// Isso permite contornar o RLS e gravar os dados sem expor chaves públicas que concedem gravação,
// pois a operação inteira acontece restrita ao Server/Edge do Next.js.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
});

export async function POST(req: Request) {
    try {
        if (!supabaseUrl || !supabaseServiceKey) {
            console.warn("Supabase keys are missing. Running in mock/dry-run mode.");
            return NextResponse.json({
                success: true,
                mock: true,
                message: "Atenção: Credenciais do Supabase ausentes no env.local. Simulação bem sucedida."
            });
        }

        const body = await req.json();

        // Desestruturação dos campos enviados pelo front-end (Paywall / Tela 3)
        const {
            nome,
            email,
            url_testada,
            score_calculado,
            device_os = "Unknown",
            gemini_response_raw = null,
            cta_whatsapp_clicked = false
        } = body;

        // Validação mínima de sanidade no servidor
        if (!nome || !email || !url_testada) {
            return NextResponse.json({ error: "Nome, e-mail e URL são obrigatórios." }, { status: 400 });
        }

        // Insere na tabela 'leads' conforme a documentação do PRD
        const { data, error } = await supabase
            .from("leads")
            .insert([
                {
                    nome,
                    email,
                    url_testada,
                    score_calculado: Math.round(score_calculado || 0),
                    device_os,
                    gemini_response_raw,
                    cta_whatsapp_clicked,
                }
            ]);

        if (error) {
            console.error("Supabase Error [Insert Lead]:", error);
            return NextResponse.json({ error: "Database error", details: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, lead: data });

    } catch (err: unknown) {
        console.error("General error [Insert Lead]:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
