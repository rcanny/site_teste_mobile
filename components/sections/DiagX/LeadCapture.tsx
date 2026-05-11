"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedGenerateButton from "@/components/ui/AnimatedGenerateButton";

interface LeadCaptureProps {
    url: string;
    onUnlock: (name: string, email: string) => void;
}

export const LeadCapture = ({ url, onUnlock }: LeadCaptureProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const isValid = name.trim().length >= 2 && email.includes("@");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl mx-auto z-20 md:mt-16"
        >
            <div className="flex flex-col items-center text-center">
                <h3 className="text-[3.5rem] md:text-[4.8rem] font-sans font-medium text-white tracking-tighter mb-4 leading-none effect-font-gradient">
                    Early Access
                </h3>
                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                    Relatório bloqueado. Libere sua análise técnica de{" "}
                    <span className="text-white font-medium">{url}</span>.
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isValid) onUnlock(name, email);
                    }}
                    className="w-full max-w-2xl mx-auto relative group"
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent opacity-50 blur-[1px]" />

                    <div className="relative flex flex-col md:flex-row items-center bg-[#09090b] backdrop-blur-3xl md:rounded-full rounded-2xl overflow-hidden transition-all border p-[2px] border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-focus-within:border-[#9333EA]/40 group-focus-within:shadow-[0_8px_40px_rgba(147,51,234,0.15)]">
                        {/* Orb (Desktop only) */}
                        <div className="hidden md:flex pl-3 pr-1 py-0 items-center justify-center relative">
                            <div className="relative flex items-center justify-center w-12 h-12">
                                <div className="absolute inset-0 bg-[#c084fc] rounded-full blur-[12px] opacity-60 animate-pulse" />
                                <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-[#fdf4ff] via-[#d8b4fe] to-[#7e22ce] shadow-[0_0_15px_#c084fc] animate-[spin_4s_linear_infinite]">
                                    <div className="absolute inset-[1.5px] rounded-full border border-white/40" />
                                </div>
                            </div>
                        </div>

                        {/* Input Nome */}
                        <div className="w-full md:w-auto flex-1 flex items-center px-4 md:px-5 shrink-0 min-h-[80px] md:min-h-[48px] border-b md:border-b-0 border-white/5 md:border-l">
                            <input
                                required
                                type="text"
                                placeholder="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-full bg-transparent border-none outline-none text-white text-base md:text-sm placeholder:text-gray-500 font-medium font-sans"
                            />
                        </div>

                        {/* Input Email */}
                        <div className="w-full md:w-auto flex-1 flex items-center px-4 md:px-5 shrink-0 min-h-[80px] md:min-h-[48px] border-b md:border-b-0 border-white/5 md:border-l">
                            <input
                                required
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-full bg-transparent border-none outline-none text-white text-base md:text-sm placeholder:text-gray-500 font-medium font-sans"
                            />
                        </div>

                        {/* Botão */}
                        <div className="w-full md:w-auto p-2 md:p-1.5 md:ml-1 flex items-center justify-center shrink-0">
                            <AnimatedGenerateButton
                                className="w-full flex md:inline-flex"
                                labelIdle="Entrar Agora"
                                labelActive="Acessando..."
                                disabled={!isValid}
                                type="submit"
                                highlightHueDeg={270}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-8 text-[0.65rem] md:text-xs font-medium text-gray-600 tracking-wider uppercase">
                        Protegido por reCAPTCHA.{" "}
                        <span className="underline decoration-gray-700 underline-offset-2">Privacidade</span> e{" "}
                        <span className="underline decoration-gray-700 underline-offset-2">Termos de uso</span>.
                    </div>
                </form>
            </div>
        </motion.div>
    );
};
