"use client";

import { motion } from "framer-motion";
import AnimatedGenerateButton from "@/components/ui/AnimatedGenerateButton";

interface URLInputStepProps {
    url: string;
    urlError?: string;
    valid: boolean;
    touched: boolean;
    onUrlChange: (url: string) => void;
    onSubmit: () => void;
}

export const URLInputStep = ({
    url,
    valid,
    touched,
    urlError,
    onUrlChange,
    onSubmit
}: URLInputStepProps) => {
    return (
        <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col text-center items-center justify-center md:py-12"
        >
            <div className="order-2 mt-12 max-w-4xl shrink-0 md:order-1 md:mt-0 flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold mb-6 backdrop-blur-md">
                    IA + Análise Técnica Real • Gratuito
                </div>

                <h2 className="text-[3.5rem] md:text-[4.8rem] font-sans font-medium text-white tracking-tighter mb-4 leading-none effect-font-gradient">
                    Seu site está afastando <br />
                    clientes agora mesmo?
                </h2>

                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto text-center">
                    O DiagX analisa seu site em tempo real e revela os erros que estão custando dinheiro à sua empresa todo dia.
                </p>

                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    className="w-full max-w-2xl mx-auto group relative mt-4"
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent opacity-50 blur-[1px]" />

                    <div
                        className={`relative flex items-center bg-[#09090b] backdrop-blur-3xl rounded-full overflow-hidden transition-all border p-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-focus-within:shadow-[0_8px_40px_rgba(147,51,234,0.15)] ${!valid && touched && url.length > 0
                            ? "border-red-500/50"
                            : valid
                                ? "border-[#9333EA]/50 group-focus-within:border-[#9333EA]/40"
                                : "border-white/10 group-focus-within:border-[#9333EA]/40"
                            }`}
                    >
                        {/* Orb */}
                        <div className="pl-2 pr-1 py-0 flex items-center justify-center relative">
                            <div className="relative flex items-center justify-center w-11 h-11">
                                <div
                                    className={`absolute inset-0 bg-[#c084fc] rounded-full blur-[12px] transition-all duration-500 ${touched && url.length > 0
                                        ? "opacity-100 scale-110"
                                        : "opacity-50 scale-100 animate-pulse"
                                        }`}
                                />
                                <div
                                    className={`relative w-[22px] h-[22px] rounded-full bg-gradient-to-br from-[#fdf4ff] via-[#d8b4fe] to-[#7e22ce] shadow-[0_0_15px_#c084fc] ${touched && url.length > 0
                                        ? "animate-spin"
                                        : "animate-[spin_4s_linear_infinite]"
                                        }`}
                                >
                                    <div className="absolute inset-[1.5px] rounded-full border border-white/40" />
                                </div>
                            </div>
                        </div>

                        {/* URL Input */}
                        <div className="flex-1 flex items-center px-3 h-11">
                            <input
                                type="text"
                                value={url}
                                onChange={e => onUrlChange(e.target.value)}
                                placeholder="https://seusite.com.br"
                                className="w-full bg-transparent border-none outline-none text-white text-base placeholder:text-gray-600 font-medium"
                            />
                        </div>

                        {/* Desktop button */}
                        <div className="hidden md:flex p-[3px] items-center justify-center shrink-0 translate-x-[2px]">
                            <AnimatedGenerateButton
                                className="md:px-6 md:py-2.5 h-full"
                                labelIdle="Analisar Meu Site — Gratuito"
                                labelActive="Analisando..."
                                disabled={!valid && touched}
                                type="submit"
                                highlightHueDeg={270}
                            />
                        </div>
                    </div>

                    {/* Mobile button */}
                    <div className="md:hidden mt-4 w-full flex justify-center">
                        <AnimatedGenerateButton
                            className="w-full flex"
                            labelIdle="Analisar Meu Site — Gratuito"
                            labelActive="Analisando..."
                            disabled={!valid && touched}
                            type="submit"
                            highlightHueDeg={270}
                        />
                    </div>

                    <p className="text-zinc-500 text-xs mt-3 text-center">
                        Análise concluída em segundos. Sem cadastro agora.
                    </p>

                    {/* Error message */}
                    {!valid && touched && url.length > 0 && (
                        <p className="text-red-400 text-sm mt-2 text-center font-medium">
                            Insira uma URL válida (ex: seusite.com.br)
                        </p>
                    )}

                    {urlError && (
                        <p className="text-red-400 text-sm mt-2 text-center font-medium">
                            {urlError}
                        </p>
                    )}
                </form>
            </div>

            {/* Mobile 3D video radar */}
            <div className="relative order-1 flex items-center justify-center md:hidden mt-8">
                <div className="relative flex h-[180px] w-[180px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-2xl">
                    <video
                        src="/assets/3D-Broadcast.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen pointer-events-none z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/10 to-transparent z-10 pointer-events-none" />
                </div>
            </div>
        </motion.div>
    );
};
