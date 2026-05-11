import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = (supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
    : null;

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });

    if (!supabase) {
        console.warn("Supabase client not initialized. Skipping WhatsApp status update.");
        return NextResponse.json({ success: true, mock: true });
    }

    const { error } = await supabase!
        .from("leads")
        .update({ cta_whatsapp_clicked: true })
        .eq("email", email);

    if (error) {
        console.error("Supabase Error [WhatsApp]:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}