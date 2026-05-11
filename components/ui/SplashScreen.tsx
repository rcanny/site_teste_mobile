"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SplashScreen.module.css";

export function SplashScreen() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Bloqueia o scroll do usuário enquanto a tela de loading estiver visível
        document.body.style.overflow = "hidden";

        // Regra: Duração máxima de 2.5s. Após isso ele força a desmontagem local.
        const timer = setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "unset";
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 flex items-center justify-center bg-[#0D0D12]"
                    style={{ zIndex: 99999 }}
                >
                    <div className={styles.card}>
                        <div className={styles.loader}>
                            <p>Loading</p>
                            <div className={styles.words}>
                                <span className={styles.word}>design</span>
                                <span className={styles.word}>tecnologia</span>
                                <span className={styles.word}>conversão</span>
                                <span className={styles.word}>resultados</span>
                                <span className={styles.word}>design</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
