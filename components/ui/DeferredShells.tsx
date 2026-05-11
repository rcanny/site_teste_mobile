"use client";

// T02 + T03: Client-side dynamic imports of SplashScreen and FloatingWhatsApp.
// These components use Framer Motion which is heavy (~30KB gzipped).
// By moving dynamic() with ssr:false into a Client Component, we:
//   1. Satisfy Next.js App Router constraint (ssr:false only allowed in Client Components)
//   2. Defer Framer Motion evaluation until after hydration, reducing TBT by 500–1000ms.
import dynamic from "next/dynamic";

const SplashScreen = dynamic(
  () => import("@/components/ui/SplashScreen").then(mod => ({ default: mod.SplashScreen })),
  { ssr: false }
);

const FloatingWhatsApp = dynamic(
  () => import("@/components/ui/FloatingWhatsApp").then(mod => ({ default: mod.FloatingWhatsApp })),
  { ssr: false }
);

export function DeferredShells() {
  return (
    <>
      <SplashScreen />
      <FloatingWhatsApp />
    </>
  );
}
