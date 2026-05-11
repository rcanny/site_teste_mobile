"use client";

interface GlassCardProps {
    color: string;
    children: React.ReactNode;
    className?: string;
}

export const GlassCard = ({ color, children, className = "" }: GlassCardProps) => {
    const filterId = `grain-${color.replace('#', '')}`;

    return (
        <div
            className={`relative flex flex-col gap-5 p-6 h-full w-full rounded-[22px] ${className}`}
            style={{
                background: `linear-gradient(
                    135deg,
                    rgba(255,255,255,0.025) 0%,
                    rgba(255,255,255,0.005) 40%,
                    ${color}06 100%
                )`,
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
            }}
        >
            {/* SVG grain — organic "frosted glass" texture */}
            <svg
                aria-hidden
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                style={{ opacity: 0.07, mixBlendMode: "soft-light" }}
            >
                <filter id={filterId}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter={`url(#${filterId})`} />
            </svg>

            {/* Top-edge highlight */}
            <div
                aria-hidden
                className="absolute top-0 left-8 right-8 h-[1px] pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
            />

            {/* Faint Grid Trace for transparency vestige */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none mix-blend-screen" />

            {/* Ambient Corner Glow */}
            <div
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-[65px] pointer-events-none mix-blend-screen"
                style={{ backgroundColor: color, opacity: 0.18 }}
            />

            {children}
        </div>
    );
};
