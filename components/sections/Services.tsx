"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const services = [
    {
        id: 1,
        title: "O Padrão Ouro do Posicionamento",
        description: "Entregamos soluções digitais com experiência Apple e velocidade Amazon. Transformamos a sua presença para que você pare de brigar por preço, não pareça amador e atraia clientes High Ticket.",
        icon: "/assets/icons/icon_posicionamento_v2.webp",
        gradientFrom: '#8b5cf6', // Violet
        gradientTo: '#3b82f6',   // Blue
    },
    {
        id: 2,
        title: "Tração e Escala",
        description: "Implementamos sistemas de atração que direcionam as pessoas certas para fechamento. Nossa única métrica de sucesso é ver sua agenda lotada e seu negócio multiplicando o faturamento.",
        icon: "/assets/icons/icon_escala_v2.webp",
        gradientFrom: '#10b981', // Emerald
        gradientTo: '#06b6d4',   // Cyan
    },
    {
        id: 3,
        title: "Conversão e Inteligência",
        description: "Mapeamos gargalos e conduzimos o cliente ideal até um formulário tático ou contato rápido. Você ganha o status de ter a clínica mais desejada da região sem complicação.",
        icon: "/assets/icons/icon_conversao_v2.webp",
        gradientFrom: '#f97316', // Orange
        gradientTo: '#ef4444',   // Red
    },
];

type ServiceProps = typeof services[0];

// --- Novo Componente de Card Skew Gradient Integrado ---
function SkewServiceCard({ service }: { service: ServiceProps }) {
    return (
        <div className="group relative w-[340px] md:w-[480px] h-[450px] md:h-[500px] flex-shrink-0 transition-all duration-500 mr-8 md:mr-16">
            {/* Painéis Skew com Gradiente */}
            <span
                className="absolute top-0 left-[30px] w-[50%] h-full rounded-[24px] md:rounded-[32px] transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)]"
                style={{
                    background: `linear-gradient(315deg, ${service.gradientFrom}, ${service.gradientTo})`,
                }}
            />
            <span
                className="absolute top-0 left-[30px] w-[50%] h-full rounded-[24px] md:rounded-[32px] transform skew-x-[15deg] blur-[30px] opacity-70 transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] group-hover:opacity-100"
                style={{
                    background: `linear-gradient(315deg, ${service.gradientFrom}, ${service.gradientTo})`,
                }}
            />

            {/* Globs super iluminados / animacao com delay */}
            <span className="pointer-events-none absolute inset-0 z-10 overflow-visible">
                <span className="absolute top-[20px] left-[20px] w-0 h-0 rounded-full opacity-0 bg-white/20 backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-all duration-500 animate-[blob_2s_ease-in-out_infinite] group-hover:-top-[30px] group-hover:-left-[30px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                <span className="absolute bottom-[20px] right-[20px] w-0 h-0 rounded-full opacity-0 bg-white/20 backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-all duration-500 animate-[blob_2s_ease-in-out_infinite] [animation-delay:-1s] group-hover:-bottom-[30px] group-hover:-right-[30px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
            </span>

            {/* Conteúdo Principal do Cartão Glassmorphism */}
            <div className="relative z-20 w-full h-full left-0 p-8 md:p-12 bg-[#0a0515]/80 border border-white/5 backdrop-blur-[15px] shadow-2xl rounded-[24px] md:rounded-[32px] text-white transition-all duration-500 group-hover:left-[-20px] group-hover:-translate-y-4 flex flex-col justify-start overflow-hidden group-hover:p-10 md:group-hover:p-[50px_40px]">

                {/* Ícone 3D Emergindo do Canto */}
                <div className="absolute -bottom-24 -right-32 md:-bottom-48 md:-right-56 flex items-center justify-center opacity-40 pointer-events-none transition-all duration-700 group-hover:opacity-70 group-hover:scale-110 group-hover:-rotate-3">
                    <div className="relative w-[420px] h-[420px] md:w-[650px] md:h-[650px]">
                        <Image src={service.icon} alt={service.title} fill className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]" />
                    </div>
                </div>

                <div className="relative z-10 mt-2 md:mt-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight">{service.title}</h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-[85%]">{service.description}</p>
                </div>
            </div>
        </div>
    );
}
// ------------------------------------------------------------------------

export function Services() {
    const targetRef = useRef<HTMLDivElement | null>(null);

    // O targetRef é a nossa seção principal de 450vh responsável por travar o scroll vertical
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Traduz o eixo Y (Scroll) em eixo X com calc mágico. Move a "pista" horizontalmente.
    const x = useTransform(scrollYProgress, [0, 1], ["calc(0% - 0vw)", "calc(-100% + 100vw)"]);

    return (
        <section id="maquina" ref={targetRef} className="relative h-[450vh] z-20">
            <div className="sticky top-0 flex h-[calc(100vh-24px)] md:h-[calc(100vh-40px)] items-center overflow-hidden">
                <motion.div style={{ x }} className="flex items-center gap-0 px-[5vw] md:px-[10vw]">

                    {/* Introdução da Seção */}
                    <div className="w-[85vw] md:w-[45vw] flex-shrink-0 mr-8 md:mr-16">
                        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter mb-6 leading-[1.1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
                            A Máquina de <br className="hidden md:block" />Lucro.
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium drop-shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
                            Engenharia de negócios desenhada para quem fecha o contrato.
                        </p>
                    </div>

                    {/* SkewCards Integrado ao Carrossel */}
                    {services.map((service) => (
                        <SkewServiceCard
                            key={service.id}
                            service={service}
                        />
                    ))}

                </motion.div>
            </div>
            {/* CSS de Estilo Global Enbutido para a animação the Blop requerida */}
            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translateY(10px); }
                    50% { transform: translate(-10px); }
                }
            `}</style>
        </section>
    );
}
