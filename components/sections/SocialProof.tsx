"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "O trabalho da equipe redefiniu a nossa percepção sobre desenvolvimento fluido. O novo site lotou nossa agenda meses à frente.",
        author: "Vórtex Odontologia",
        role: "Clínica High-Ticket",
        metrics: "+120% em agendamentos",
    },
    {
        quote: "Nossa equipe adora a estabilidade gerada. Fez o envio de propostas ser muito fácil e incrivelmente rápido e confiável.",
        author: "InovaTech Advocacia",
        role: "Direito Empresarial",
        metrics: "Redução de 45% no CPA",
    },
    {
        quote: "Padrão absurdo. Interface e código que batem de frente com players internacionais. Simplesmente o melhor investimento que fizemos.",
        author: "Lumina Estética",
        role: "Harmonização Facial",
        metrics: "Crescimento sólido",
    }
];

export function SocialProof() {
    return (
        <section id="prova" className="section-deferred relative w-full py-24 sm:py-36 bg-[#000000] flex flex-col items-center border-t border-white/5 overflow-hidden">
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 mb-16 md:mb-24">
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="text-[3.5rem] md:text-[4.8rem] font-sans font-medium text-white tracking-tighter mb-4 leading-none effect-font-gradient"
                    >
                        Além das expectativas
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-2xl text-center"
                    >
                        Focamos em design e performance de ponta que viabilizam o sucesso de negócios impulsionando o crescimento na internet.
                    </motion.p>
                </div>
            </div>

            {/* Testimonial Carousel - DOM Baseado 100% em CSS sem Framer Motion para evitar congelamentos no Scroll */}
            <div className="relative w-full flex overflow-hidden">
                {/* Esmaecimento Lateral */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none"></div>

                {/* Track animado puro por CSS Tailwind */}
                {/* Tivemos cuidado extra para definir a animação diretamente nas regras e impedir o congelamento. */}
                <div
                    className="flex w-max shrink-0 hover:[animation-play-state:paused] gap-6 relative z-10 py-6"
                    style={{ animation: 'infinite-scroll 50s linear infinite' }}
                >
                    {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                        <div
                            key={idx}
                            /* Removemos a classe externa .card que conflita backgrounds, usando 100% Tailwind inline */
                            className="glow-hover relative flex flex-col w-[350px] sm:w-[480px] shrink-0 p-8 rounded-[24px] overflow-hidden group transition-transform duration-300 hover:-translate-y-2"
                            style={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                        >
                            <svg className="mb-6 text-violet-500/50 w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>

                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 flex-1 font-light tracking-wide break-words whitespace-normal">
                                &quot;{item.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4 pt-5 border-t border-white/10 mt-auto">
                                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-black shrink-0 relative flex items-center justify-center">
                                    <span className="flex text-white font-medium leading-none">{item.author.charAt(0)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-white text-sm font-semibold tracking-tight">{item.author}</h4>
                                    <p className="text-gray-500 text-xs mt-1">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

