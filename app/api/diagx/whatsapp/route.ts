import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    { auth: { persistSession: false } }
);

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });

    const { error } = await supabase
        .from("leads")
        .update({ cta_whatsapp_clicked: true })
        .eq("email", email);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
}