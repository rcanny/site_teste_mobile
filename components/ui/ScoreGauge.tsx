"use client";

import { motion } from "framer-motion";

const getScoreColor = (score: number) => {
    if (score <= 4) return { ring: "#ef4444", text: "text-red-400", label: "Crítico" };
    if (score <= 7) return { ring: "#eab308", text: "text-yellow-400", label: "Atenção" };
    return { ring: "#22c55e", text: "text-green-400", label: "Excelente" };
};

interface ScoreGaugeProps {
    score: number;
}

export const ScoreGauge = ({ score }: ScoreGaugeProps) => {
    const { ring, text, label } = getScoreColor(score);
    const r = 52;
    const circ = 2 * Math.PI * r;

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-36 h-36">
                <div
                    className="absolute inset-0 rounded-full blur-[36px] opacity-25 pointer-events-none"
                    style={{ backgroundColor: ring }}
                />
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden>
                    <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                    <motion.circle
                        cx="60"
                        cy="60"
                        r={r}
                        fill="none"
                        stroke={ring}
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeDasharray={`${circ}`}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: circ - (score / 10) * circ }}
                        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className={`text-4xl font-bold leading-none tracking-tight ${text}`}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        {score.toFixed(1)}
                    </motion.span>
                    <span className="text-zinc-500 text-xs font-medium mt-0.5">/10</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border"
                style={{ color: ring, borderColor: `${ring}40`, backgroundColor: `${ring}12` }}
            >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ring }} />
                {label}
            </motion.div>
        </div>
    );
};
