"use client";

import { motion } from "framer-motion";

export function Checkout() {
    return (
        <section className="section-deferred relative w-full py-36 bg-black flex flex-col items-center justify-center min-h-[70vh]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.36, 0.66, 0.6, 1] }}
                    className="text-[4rem] md:text-[6rem] font-serif font-light text-white tracking-tighter mb-12 leading-none max-w-4xl effect-font-gradient"
                >
                    Pare de perder dinheiro
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.36, 0.66, 0.6, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <a
                        href="https://calendly.com/pzdszk/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary group"
                    >
                        Agendar Consultoria <span className="ml-2 font-normal text-white/50 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>

                    <a
                        href="https://wa.me/5542999197327"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary group"
                    >
                        Entrar em Contato <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}

