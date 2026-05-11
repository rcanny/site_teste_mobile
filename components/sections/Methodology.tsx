"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, TrendingUp, Code2 } from "lucide-react";
import CardSwap, { Card } from "@/components/ui/CardSwap"; // Re-resolving component import

const methodologySteps = [
    {
        icon: Code2,
        title: "Tecnologia Next.js",
        description: "Construímos com a mesma arquitetura de empresas como Netflix e TikTok. O resultado? Carregamento instantâneo que impede seu cliente de desistir antes de ver sua oferta.",
        color: "#8b5cf6", // Violet
    },
    {
        icon: Zap,
        title: "Performance Extrema",
        description: "Cada milissegundo de atraso custa 7% das suas conversões. Otimizamos cada imagem e script para garantir pontuação máxima no Google PageSpeed.",
        color: "#8b5cf6", // Violet
    },
    {
        icon: ShieldCheck,
        title: "UX Magnética",
        description: "Interface intuitiva, sem ruídos. Seu visitante é guiado por um caminho fluido diretamente para o botão de agendar ou comprar.",
        color: "#8b5cf6", // Violet
    },
    {
        icon: TrendingUp,
        title: "Mais ROI em Ads",
        description: "Com um site ultrarrápido, o seu Custo por Clique (CPC) diminui no Google e Meta Ads, multiplicando o retorno do seu investimento em tráfego.",
        color: "#8b5cf6", // Violet
    }
];

export function Methodology() {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
        const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
        e.currentTarget.style.setProperty('--mouse-x', x);
        e.currentTarget.style.setProperty('--mouse-y', y);
    };

    return (
        <section id="metodologia" className="section-deferred relative z-10 w-full py-24 sm:py-36 bg-black flex flex-col items-center overflow-hidden -mt-[2px]">
            {/* Esferas Orgânicas de Fundo (Vazamento de Luz 3D focado atrás do painel) */}
            <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-[#4B0082] rounded-full blur-[50px] opacity-35 pointer-events-none z-0"></div>
            <div className="absolute bottom-[20%] left-[40%] w-[300px] h-[400px] bg-[#4B0082] rounded-full blur-[45px] opacity-40 pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col text-center md:text-left mb-16 md:mb-24 mt-12 w-full max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="text-[3.5rem] md:text-[4.8rem] font-sans font-medium text-white tracking-tighter mb-4 leading-none effect-font-gradient"
                    >
                        Experiência Apple.<br /> Velocidade Amazon.
                    </motion.h2>
                </div>

                {/* Mac Window Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="main-glass-panel z-10 w-full max-w-5xl mx-auto rounded-2xl mb-10 overflow-hidden"
                >
                    {/* Mac Window Header */}
                    <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 md:px-6 relative shadow-sm">
                        <div className="flex gap-2 absolute left-4 md:left-6">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="mx-auto flex items-center justify-center bg-black/40 border border-white/5 rounded-md h-7 px-8 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-2">
                                <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                astucia.com
                            </span>
                        </div>
                    </div>

                    {/* Mac Window Content */}
                    <div className="relative h-[600px] w-full flex flex-col md:flex-row items-center md:items-start justify-between px-8 md:px-16 overflow-hidden">

                        {/* Title & Texto descritivo alinhados a esquerda */}
                        <div className="z-20 w-full md:max-w-xs mt-12 md:mt-24 text-center md:text-left flex flex-col pointer-events-none relative">
                            <h3 className="text-[2.2rem] md:text-4xl font-medium text-white mb-4 leading-[1.1] tracking-tight">
                                Uma máquina <br className="hidden md:block" /> de conversão
                            </h3>
                            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                                Deslize pelos elementos e entenda nossa arquitetura de experiência premium e tráfego.
                            </p>
                        </div>

                        {/* Animação de Card Swap - Ancorada no Bottom Right com Overflow Clip */}
                        <div className="absolute right-[-20px] bottom-[70px] z-10 w-full md:w-auto flex justify-center md:justify-end pr-0">
                            <div style={{ position: 'relative', width: '700px', height: '440px' }}>
                                <CardSwap
                                    width={700}
                                    height={300}
                                    cardDistance={55}
                                    verticalDistance={75}
                                    delay={6500}
                                    pauseOnHover={false}
                                >
                                    {methodologySteps.map((step, index) => (
                                        <Card key={index} style={{ border: 'none', background: 'transparent', padding: 0 }}>
                                            <div
                                                className="card-spotlight card-glass-panel flex flex-col sm:flex-row items-start sm:items-center gap-6 h-full text-left p-8 px-10 z-10 w-full rounded-[24px] overflow-hidden"
                                                onMouseMove={handleMouseMove}
                                            >
                                                {/* Icone à esquerda em forma Rectangular Card */}
                                                <div className="relative z-10 w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-inner" style={{ borderColor: `${step.color}30`, background: `${step.color}10` }}>
                                                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                                                </div>

                                                <div className="flex flex-col justify-center max-w-[460px] pt-1 sm:pt-0">
                                                    <h3 className="relative z-10 text-[1.7rem] font-medium text-white tracking-tight mb-2 leading-none">{step.title}</h3>
                                                    <p className="relative z-10 text-gray-400 text-[1.15rem] font-light leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>

                                                {/* Background Icon (decoração) */}
                                                <step.icon className="absolute -bottom-8 -right-8 w-40 h-40 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ color: step.color }} />
                                            </div>
                                        </Card>
                                    ))}
                                </CardSwap>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

