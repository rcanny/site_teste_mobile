"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Spiral as Hamburger } from "hamburger-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Framer Motion Variants
  const menuVariants: Variants = {
    initial: {
      y: "-100%",
      borderBottomLeftRadius: "50%",
      borderBottomRightRadius: "50%",
    },
    enter: {
      y: "0%",
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom ease-out
    },
    exit: {
      y: "-100%",
      borderBottomLeftRadius: "50%",
      borderBottomRightRadius: "50%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } // Custom ease-in-out + delay for texts to exit first
    }
  };

  const containerVars: Variants = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.4, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  // Masked Text Animation
  const textRevealVars: Variants = {
    initial: { y: "100%", opacity: 0 },
    open: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }
  };

  const links = [
    { title: "Início", href: "#inicio" },
    { title: "A Máquina", href: "#maquina" },
    { title: "Diagnóstico", href: "#diagnostico" },
    { title: "Metodologia", href: "#metodologia" },
    { title: "Casos Reais", href: "#prova" }
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 py-8 w-full z-[60] relative">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group order-1 md:order-2 mix-blend-difference">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-3 h-3 bg-black rounded-full" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">ASTÚCIA</span>
        </div>

        {/* Desktop Menu (Pill) */}
        <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full pl-6 pr-2 py-2 order-2 md:order-1 shadow-2xl">
          <div className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-300 mr-8">
            <Link href="#inicio" className="hover:text-white transition-colors">Início</Link>
            <Link href="#maquina" className="hover:text-white transition-colors">A Máquina</Link>
            <Link href="#diagnostico" className="hover:text-white transition-colors">Diagnóstico</Link>
            <Link href="#metodologia" className="hover:text-white transition-colors">Metodologia</Link>
            <Link href="#prova" className="hover:text-white transition-colors">Casos Reais</Link>
          </div>

          <a href="https://calendly.com/pzdszk/30min" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 group/btn">
            Começar
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Button - Fixed Z-index to always be on top */}
        <div className="flex md:hidden items-center order-2 text-white z-[60]">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center -mr-2">
            <Hamburger
              toggled={isMobileMenuOpen}
              toggle={setIsMobileMenuOpen}
              size={22}
              color="#ffffff"
              rounded
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-xl md:hidden overflow-hidden origin-top"
          >
            {/* Inner Content Container */}
            <div className="flex flex-col items-center justify-center h-full pt-32 pb-12 px-8">
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col items-center gap-6 text-3xl font-medium text-white tracking-tight text-center"
              >
                {links.map((link, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.div variants={textRevealVars}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="inline-block hover:text-gray-400 transition-colors"
                      >
                        {link.title}
                      </Link>
                    </motion.div>
                  </div>
                ))}

                {/* CTA Mobile */}
                <div className="overflow-hidden mt-8">
                  <motion.div variants={textRevealVars}>
                    <a href="https://calendly.com/pzdszk/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 w-fit mx-auto mt-2">
                      Começar agora
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
