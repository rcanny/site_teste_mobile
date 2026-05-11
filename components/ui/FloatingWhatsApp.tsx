"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
export const FloatingWhatsApp = () => {
    const wppNumber = "5542999197327";
    const wppMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre a Astúcia.");

    return (
        <motion.a
            href={`https://wa.me/${wppNumber}?text=${wppMessage}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-[52px] h-[52px] rounded-full border top-layer bg-[#09090b] backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all group overflow-hidden border-white/10"
            aria-label="Falar conosco no WhatsApp"
        >
            <div className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <MessageCircle 
                className="w-6 h-6 text-zinc-400 group-hover:text-[#25D366] transition-colors duration-300 relative z-10" 
                strokeWidth={1.5}
            />
        </motion.a>
    );
};
