"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/lib/config";
import { useIsMobile } from "@/hooks/useMobile";
import Image from "next/image";

const AnimatedBackground = () => {
    const isMobile = useIsMobile();

    // Video refs
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);

    // State to toggle active video
    const [activeVideo, setActiveVideo] = useState(1);

    // Hard lazy load state to secure LCP
    const [videosReady, setVideosReady] = useState(false);
    const crossfadeDuration = 0.5; // seconds

    useEffect(() => {
        // Force the browser to only render the image for the first 2 seconds
        // protecting bandwidth and ensuring the image is the solitary LCP metric.
        const timer = setTimeout(() => setVideosReady(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        // Check if the video triggering the event is the currently active one
        const isCurrentActive =
            (activeVideo === 1 && video === video1Ref.current) ||
            (activeVideo === 2 && video === video2Ref.current);

        if (isCurrentActive && video.duration > 0) {
            const timeLeft = video.duration - video.currentTime;

            // When we reach the crossfade threshold, pass the baton to the other video
            if (timeLeft <= crossfadeDuration) {
                setActiveVideo(prev => (prev === 1 ? 2 : 1));
            }
        }
    };

    useEffect(() => {
        // Reset and play the newly active video
        const playVideo = async (video: HTMLVideoElement) => {
            try {
                // Ensure it's ready, set time to zero
                if (video.currentTime > 0) video.currentTime = 0;
                await video.play();
            } catch (error: unknown) {
                // Ignore AbortError caused by React Strict Mode or rapid state changes
                if (error instanceof Error && error.name !== "AbortError") {
                    console.error("Video play failed", error);
                }
            }
        };

        // Add a tiny delay to ensure DOM refs are fully mounted after an isMobile switch
        const timer = setTimeout(() => {
            if (!videosReady) return; // Wait until they exist

            if (activeVideo === 1 && video1Ref.current) {
                playVideo(video1Ref.current);
            } else if (activeVideo === 2 && video2Ref.current) {
                playVideo(video2Ref.current);
            }
        }, 50);

        return () => clearTimeout(timer);
    }, [activeVideo, isMobile, videosReady]);

    const videoClass = "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out";

    const videoSrc = isMobile ? siteConfig.assets.mobile.videoMain : siteConfig.assets.desktop.videoMain;

    const FallbackBackground = isMobile ? (
        <Image
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            src={siteConfig.assets.mobile.imageFallback}
            alt="Background fallback"
            fill
            priority
            fetchPriority="high"
            unoptimized={true}
        />
    ) : (
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            src={siteConfig.assets.desktop.videoFallback}
        />
    );

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 bg-black">
            {FallbackBackground}

            {videosReady && (
                <>
                    <video
                        ref={video1Ref}
                        muted
                        playsInline
                        preload="auto"
                        onTimeUpdate={handleTimeUpdate}
                        className={`${videoClass} ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
                        src={videoSrc}
                    />

                    <video
                        ref={video2Ref}
                        muted
                        playsInline
                        preload="auto"
                        onTimeUpdate={handleTimeUpdate}
                        className={`${videoClass} ${activeVideo === 2 ? 'opacity-100' : 'opacity-0'}`}
                        src={videoSrc}
                    />
                </>
            )}

            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
    );
};

export default React.memo(AnimatedBackground);
