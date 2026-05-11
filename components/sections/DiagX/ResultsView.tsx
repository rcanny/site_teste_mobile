"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Zap, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { DiagXCardContent } from "@/lib/diagx-core";

// Adiciona na interface
interface ResultsViewProps extends DiagXCardContent {
    score: number;
    url: string;
    leadName: string;
    leadEmail: string; // ← novo
    wppNumber?: string;
}

// ✅ 
export const ResultsView = ({
    score,
    url,
    leadName,
    leadEmail,
    positives,
    criticals,
    goldenTip,
    wppNumber = "5542999197327"
}: ResultsViewProps) => {
    const cleanUrl = useMemo(
        () => url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0],
        [url]
    );
    const firstName = useMemo(() => leadName.split(" ")[0], [leadName]);
    const impacto = useMemo(() => Math.min(95, Math.round((10 - score) * 10 + 30)), [score]);
    const wppText = encodeURIComponent(
        `Olá! Acabei de ver o diagnóstico DiagX do meu site ${url} pela Astúcia Digital Solutions e recebi nota ${score}/10. Me chamo ${leadName} e gostaria de entender como vocês podem me ajudar.`
    );

    const handleWhatsAppClick = async () => {
        await fetch('/api/diagx/whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: leadEmail })
        });
        window.open(`https://wa.me/${wppNumber}?text=${wppText}`, '_blank');
    };

    return (
        <section className="w-full min-h-screen flex flex-col items-center px-4 py-20">
            {/* ── Score Header ── */}
            <div className="flex flex-col items-center text-center mb-14 gap-6">
                <ScoreGauge score={score} />
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <h1 className="text-[3.5rem] md:text-[4.8rem] font-sans font-medium text-white tracking-tighter mb-4 leading-none effect-font-gradient">
                        Diagnóstico Concluído
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto text-center">
                        Aqui está o raio-x de <span className="text-white font-medium">{cleanUrl}</span>,{" "}
                        {firstName}.
                    </p>
                </motion.div>
            </div>

            {/* ── Bento Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-5xl mx-auto">
                {/* Card 1 — Pontos Fortes */}
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ShineBorder color="#22c55e" className="h-full">
                        <GlassCard color="#22c55e">
                            {/* Ghost icon */}
                            <div
                                className="absolute bottom-3 right-3 opacity-[0.07] pointer-events-none select-none"
                                aria-hidden
                            >
                                <CheckCircle size={110} color="#22c55e" strokeWidth={1} />
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div
                                    className="p-2 rounded-xl shrink-0"
                                    style={{ backgroundColor: "#22c55e18", border: "1px solid #22c55e35" }}
                                >
                                    <AnimatedIcon icon={CheckCircle} color="#22c55e" size={20} type="bounce" />
                                </div>
                                <h3 className="font-semibold text-white text-base tracking-[-0.01em]">
                                    Pontos Fortes
                                </h3>
                            </div>
                            <ul className="flex flex-col gap-3 relative z-10">
                                {positives.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.08 }}
                                    >
                                        <CheckCircle size={15} className="text-green-400 shrink-0 mt-[3px]" />
                                        <span className="text-zinc-300 text-sm leading-relaxed font-medium">
                                            {item}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </GlassCard>
                    </ShineBorder>
                </motion.div>

                {/* Card 2 — Pontos Críticos */}
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ShineBorder color="#ef4444" className="h-full">
                        <GlassCard color="#ef4444">
                            <div
                                className="absolute bottom-3 right-3 opacity-[0.07] pointer-events-none select-none"
                                aria-hidden
                            >
                                <XCircle size={110} color="#ef4444" strokeWidth={1} />
                            </div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div
                                    className="p-2 rounded-xl shrink-0"
                                    style={{ backgroundColor: "#ef444418", border: "1px solid #ef444435" }}
                                >
                                    <AnimatedIcon icon={XCircle} color="#ef4444" size={20} type="shake" />
                                </div>
                                <h3 className="font-semibold text-white text-base tracking-[-0.01em]">
                                    Onde Você Perde Dinheiro
                                </h3>
                            </div>
                            <ul className="flex flex-col gap-3 relative z-10">
                                {criticals.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 + i * 0.08 }}
                                    >
                                        <XCircle size={15} className="text-red-400 shrink-0 mt-[3px]" />
                                        <span className="text-zinc-200 text-sm leading-relaxed font-semibold">
                                            {item}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </GlassCard>
                    </ShineBorder>
                </motion.div>

                {/* Card 3 — Dica de Ouro */}
                <motion.div
                    className="md:col-span-2 h-full"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ShineBorder color="#9333EA" className="h-full">
                        <GlassCard color="#9333EA">
                            <div
                                className="absolute bottom-3 right-4 opacity-[0.08] pointer-events-none select-none"
                                aria-hidden
                            >
                                <Zap size={130} color="#9333EA" strokeWidth={1} />
                            </div>
                            <div
                                className="absolute inset-0 pointer-events-none rounded-[19px]"
                                style={{ boxShadow: "inset 0 0 40px rgba(147,51,234,0.07)" }}
                            />
                            <div className="flex items-center gap-3 relative z-10">
                                <div
                                    className="p-2 rounded-xl shrink-0"
                                    style={{ backgroundColor: "#9333ea18", border: "1px solid #9333ea35" }}
                                >
                                    <AnimatedIcon icon={Zap} color="#9333EA" size={20} type="pulse" />
                                </div>
                                <h3 className="font-semibold text-white text-base tracking-[-0.01em]">
                                    A Dica de Ouro
                                </h3>
                            </div>
                            <p className="text-zinc-300 text-base leading-relaxed relative z-10 max-w-3xl">
                                {goldenTip}
                            </p>
                            <div className="flex items-center gap-3 relative z-10 mt-1">
                                <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold shrink-0">
                                    Impacto estimado
                                </span>
                                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${impacto}%` }}
                                        transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-purple-400 shrink-0">+{impacto}%</span>
                            </div>
                        </GlassCard>
                    </ShineBorder>
                </motion.div>
            </div>

            {/* ── CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-5 mt-14 w-full max-w-lg mx-auto text-center"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Não sabe como aplicar isso?{" "}
                        <span className="text-white font-semibold">A Astúcia resolve para você.</span>
                    </p>
                    <p className="text-zinc-600 text-xs">Resposta em até 24h. Sem compromisso.</p>
                </div>

                <motion.button
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative group inline-flex w-full md:w-auto items-center justify-center gap-3 px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition-colors duration-200 shadow-[0_0_32px_rgba(147,51,234,0.35)] hover:shadow-[0_0_52px_rgba(147,51,234,0.6)]"
                >
                    <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                        <span className="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-[350%]" />
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 shrink-0"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    Quero Resolver Isso Agora
                    <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
            </motion.div>
        </section>
    );
};