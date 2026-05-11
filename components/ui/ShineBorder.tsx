"use client";

import { motion } from "framer-motion";

interface ShineBorderProps {
    color: string;
    children: React.ReactNode;
    className?: string;
}

export const ShineBorder = ({ color, children, className = "" }: ShineBorderProps) => (
    <div className={`relative rounded-[24px] p-[2px] overflow-hidden ${className}`}>
        {/* Rotating shine ink: Isolated translation wrapper + purely rotating child */}
        <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2500px] h-[2500px] pointer-events-none">
            <motion.div
                className="w-full h-full rounded-full"
                style={{
                    background: `conic-gradient(
                        from 0deg,
                        transparent   0%,
                        transparent  44%,
                        ${color}10   50%,
                        ${color}40   65%,
                        ${color}80   74%,
                        ${color}40   80%,
                        ${color}10   87%,
                        transparent  94%,
                        transparent 100%
                    )`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
        </div>

        {/* ALINHAMENTO MATEMÁTICO PERFEITO */}
        <div className="relative z-10 bg-[#09090E] rounded-[22px] w-full h-full overflow-hidden">
            {children}
        </div>
    </div>
);
