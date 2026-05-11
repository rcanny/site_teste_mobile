import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { Services } from "@/components/sections/LazyServices";
import { DiagX } from "@/components/sections/DiagX/index";
import { Methodology } from "@/components/sections/Methodology";
import { SocialProof } from "@/components/sections/SocialProof";
import { Checkout } from "@/components/sections/Checkout";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-3 md:p-5 flex-1 flex flex-col z-10">
        <div className="relative isolate flex-1 min-h-[calc(100vh-24px)] md:min-h-[calc(100vh-40px)] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black text-white flex flex-col selection:bg-white/30 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
          <AnimatedBackground />
          <Navbar />
          <InfiniteMarquee />
          <Hero />
        </div>
      </div>

      <Services />

      {/* Bloco 3: DiagX — O Motor de Geração de Leads */}
      <DiagX />

      {/* Bloco 4: Metodologia */}
      <Methodology />

      {/* Bloco 5: Prova Social */}
      <SocialProof />

      {/* Bloco 6: Checkout / Agendamento */}
      <Checkout />
    </div>
  );
}
