"use client";

import { motion } from "framer-motion";

// Common content renderer that accepts size overrides
const MarqueeContent = ({ isDesktop = false }) => {
    // Mobile: 5xl (3rem), Desktop reduced by a further 30%: from 2.9rem/5.1rem to approx 2.0rem/3.6rem
    const textClass = isDesktop
        ? "text-[2.0rem] lg:text-[3.6rem] font-black uppercase tracking-wider text-transparent whitespace-nowrap"
        : "text-5xl font-black uppercase tracking-wider text-transparent whitespace-nowrap";

    // Mobile dot: 3xl (1.875rem), Desktop dot reduced by a further 30%: from 1.9rem to approx 1.3rem
    const dotClass = isDesktop
        ? "text-[#84cc16] text-[1.3rem] mx-8 lg:mx-12"
        : "text-[#84cc16] text-3xl mx-6";

    return (
        <div className="flex items-center px-4">
            <span className={textClass} style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>Tráfego Pago</span>
            <span className={dotClass}>•</span>
            <span className={textClass} style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>SEO</span>
            <span className={dotClass}>•</span>
            <span className={textClass} style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>UI/UX</span>
            <span className={dotClass}>•</span>
            <span className={textClass} style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}>Estratégia</span>
            <span className={dotClass}>•</span>
        </div>
    );
};

// Desktop version: Extended width (80vw), smaller font, lower position Y
const DesktopMarquee = () => {
    return (
        <div
            className="absolute bottom-8 lg:bottom-12 right-0 w-[80vw] overflow-hidden pointer-events-none z-[5] hidden md:block"
            style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
            }}
        >
            <motion.div
                className="flex w-fit"
                animate={{ x: [0, "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40, // slightly slower for better immersion due to wider span
                }}
            >
                <div className="flex">
                    <MarqueeContent isDesktop={true} />
                    <MarqueeContent isDesktop={true} />
                </div>
            </motion.div>
        </div>
    );
};

// Mobile version: Untouched original dimensions and positions
const MobileMarquee = () => {
    return (
        <div
            className="absolute bottom-16 right-0 w-full overflow-hidden pointer-events-none z-[5] md:hidden"
            style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 90%, transparent 100%)"
            }}
        >
            <motion.div
                className="flex w-fit"
                animate={{ x: [0, "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35,
                }}
            >
                <div className="flex">
                    <MarqueeContent isDesktop={false} />
                    <MarqueeContent isDesktop={false} />
                </div>
            </motion.div>
        </div>
    );
};

export function InfiniteMarquee() {
    return (
        <>
            <DesktopMarquee />
            <MobileMarquee />
        </>
    );
}
