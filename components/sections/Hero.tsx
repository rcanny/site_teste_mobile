import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <main id="inicio" className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 w-full max-w-5xl mx-auto mt-[-5vh] scroll-mt-24">
            {/* Headline */}
            <h1 className="text-[3.5rem] md:text-[4.8rem] font-sans font-medium text-white tracking-tighter mb-4 leading-none effect-font-gradient max-w-4xl mx-auto">
                Troque as apostas por um <br className="hidden md:block" />ecossistema de previsibilidade.
            </h1>

            {/* Subheadline */}
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                Pare de adivinhar de onde virá seu próximo cliente. Instale a engenharia de elite que une design magnético e dados reais para blindar seu faturamento.
            </p>

            {/* CTA Button */}
            {/* CTA Button */}
            <a href="https://calendly.com/pzdszk/30min" target="_blank" rel="noopener noreferrer" className="inline-flex group items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-200 hover:-translate-y-0.5 mx-auto">
                Acessar tecnologia de elite
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
        </main>
    );
}
