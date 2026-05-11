import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { DeferredShells } from "@/components/ui/DeferredShells";
import { SplashScreen } from "@/components/ui/SplashScreen";


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Agência de Design com IA',
  description: 'Criamos o seu site num passe de mágica usando inteligência artificial.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <head>
        {/* T06: Preload mobile LCP image — browser discovers bg-mobile-initial.webp
            3700ms late because it’s referenced inside JS components. This preload
            moves discovery to the very start, targeting LCP < 2.5s. */}
        <link
          rel="preload"
          as="image"
          href="/assets/videos/bg-mobile-initial.webp"
          type="image/webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* T03: DeferredShells is a Client Component that defers
            FloatingWhatsApp via dynamic() with ssr:false,
            preventing it from blocking the main thread on load. 
            SplashScreen was reverted to SSR because deferring it caused a 4s blank screen (FCP/Speed Index degradation). */}
        <SplashScreen />
        <DeferredShells />
        {children}
      </body>
    </html>
  );
}
