"use client";

import { AnimatePresence, motion } from "framer-motion";
import { URLInputStep } from "./URLInputStep";
import { TheaterTerminal } from "./TheaterTerminal";
import { LeadCapture } from "./LeadCapture";
import { ResultsView } from "./ResultsView";
import { useDiagX } from "@/hooks/useDiagX";

export function DiagX() {
    const {
        step,
        url,
        leadName,
        leadEmail,
        touched,
        valid,
        score,
        cardContent,
        urlError,
        handleUrlChange,
        handleUrlSubmit,
        handleTerminalFinish,
        handleLeadUnlock,
    } = useDiagX();

    return (
        <div id="diagnostico" className="relative w-full min-h-screen overflow-hidden bg-[#010102] selection:bg-[#9333EA]/30 selection:text-white flex items-center justify-center py-24 md:py-0 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_60px_rgba(147,51,234,0.15)] md:shadow-[0_-30px_80px_rgba(147,51,234,0.2)] z-20">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9333EA]/30 blur-[100px] md:h-[500px] md:w-[500px]" />
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Vinheta Expandida (efeito blur/fade-out do grid mais intenso nas bordas e cantos) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#010102_100%)] z-0" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#010102] via-[#010102]/80 to-transparent z-0" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#010102] via-[#010102]/80 to-transparent z-0" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:max-w-7xl">
                <AnimatePresence mode="wait">
                    {/* ── STEP 1: URL Input ── */}
                    {step === 1 && (
                        <URLInputStep
                            url={url}
                            valid={valid}
                            touched={touched}
                            urlError={urlError}
                            onUrlChange={handleUrlChange}
                            onSubmit={handleUrlSubmit}
                        />
                    )}

                    {/* ── STEP 2: Theater Terminal ── */}
                    {step === 2 && <TheaterTerminal key="step-2" onFinish={handleTerminalFinish} />}

                    {/* ── STEP 3: Paywall ── */}
                    {step === 3 && (
                        <LeadCapture key="step-3" url={url} onUnlock={handleLeadUnlock} />
                    )}

                    {/* ── STEP 4: Results (ResultsView Bento) ── */}
                    {step === 4 && (
                        <motion.div
                            key="step-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <ResultsView
                                score={score}
                                url={url}
                                leadName={leadName}
                                leadEmail={leadEmail}
                                positives={cardContent.positives}
                                criticals={cardContent.criticals}
                                goldenTip={cardContent.goldenTip}
                                wppNumber="5542999197327"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
