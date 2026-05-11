"use client";

import dynamic from "next/dynamic";

// Esse componente é explicitamente do lado do cliente ("use client").
// Aqui o Next.js 15 permite desativar o SSR (Server-Side Rendering) 
// para forçar a montagem desta seção apenas DEPOIS que a Hero carregar no navegador do usuário.
export const Services = dynamic(
    () => import("@/components/sections/Services").then((mod) => mod.Services),
    { ssr: false }
);
