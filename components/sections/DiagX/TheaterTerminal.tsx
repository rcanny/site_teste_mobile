"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TheaterTerminalProps {
    onFinish: () => void;
}

export const TheaterTerminal = ({ onFinish }: TheaterTerminalProps) => {
    const [lines, setLines] = useState<number>(0);
    const scriptMsgs = [
        "> Iniciando DiagX...",
        "[▓▓▓░░░░░░░] Conectando ao cluster de análise...",
        "✦ Módulo 1 — Velocidade & Performance",
        "✦ Módulo 2 — SEO On-Page",
        "✦ Módulo 3 — Presença Local & Autoridade",
        "✦ Módulo 4 — Design & Experiência Mobile",
        "[██████████] Compilando relatório final...",
        "> Análise completa. Resultado disponível.",
    ];

    useEffect(() => {
        if (lines < scriptMsgs.length) {
            const timer = setTimeout(() => setLines((p) => p + 1), 700);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(onFinish, 1200);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lines]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl mx-auto z-20 md:mt-24"
        >
            <div className="rounded-[24px] p-[1px] bg-gradient-to-b from-white/40 to-white/5 shadow-[0_8px_32px_rgba(255,255,255,0.1)] relative">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-[24px]" />
                <div className="relative bg-white/[0.08] backdrop-blur-[40px] overflow-hidden rounded-[23px] border border-white/20">
                    {/* Terminal title bar */}
                    <div className="px-5 py-4 border-b border-white/10 flex gap-2 items-center bg-white/10">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        <span className="ml-4 text-xs font-mono text-gray-500 tracking-wider">
                            diagx-terminal ~ astucia-engine
                        </span>
                    </div>
                    {/* Terminal body */}
                    <div className="p-6 md:p-8 font-mono text-sm md:text-base h-[300px] flex flex-col items-start gap-2">
                        {scriptMsgs.slice(0, lines).map((msg, i) => (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i}
                                className={
                                    msg.startsWith(">")
                                        ? "text-[#9333EA] font-semibold"
                                        : msg.includes("██")
                                            ? "text-emerald-400 font-semibold"
                                            : msg.includes("✦")
                                                ? "text-purple-300"
                                                : "text-gray-400"
                                }
                            >
                                {msg}
                            </motion.span>
                        ))}
                        {lines < scriptMsgs.length && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2.5 h-5 bg-[#9333EA] mt-1 shadow-[0_0_10px_#9333EA]"
                            />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
