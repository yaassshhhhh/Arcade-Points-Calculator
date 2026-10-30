"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

export default function ScrollVideo({ videoSrc }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const quoteRef = useRef(null);
  const titleRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let tl;
    let isSeeking = false;
    let targetTime = 0;
    let rafId = null;

    // Smoothly seek video on animation frame to avoid blocking the main scroll thread
    const updateVideoFrame = () => {
      if (video && video.duration) {
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }
      isSeeking = false;
    };

    const setupScroll = () => {
      // Kill previous timeline if re-initializing
      if (tl) tl.kill();

      // Create responsive GSAP timeline with optimized scrub distance
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%", // Fast, responsive 120vh scroll distance (no stuck feeling!)
          scrub: 0.2, // Ultra-responsive scrub without sluggish delay
          pin: true, // Cleanly pin the vault door while opening
          anticipatePin: 1, // Smoothly prepare pin without layout jerk
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (video && video.duration) {
              targetTime = video.duration * self.progress;
              if (!isSeeking) {
                isSeeking = true;
                rafId = requestAnimationFrame(updateVideoFrame);
              }
            }
          }
        }
      });

      // Dummy tween to establish timeline duration
      tl.to({}, { duration: 1 });

      // Center title "THE BRIEFING" fades out smoothly early in scroll
      tl.to(
        titleRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.35,
          ease: "power1.out"
        },
        0.05
      );

      // Scroll Down Indicator fades out immediately when scrolling starts
      tl.to(
        indicatorRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: "power1.out"
        },
        0.02
      );

      // Quote emerges smoothly near the end of the vault door sequence
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
        0.65
      );
    };

    const handleVideoLoad = () => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) {
        // Ignore
      }
      setupScroll();
    };

    // If video is already ready
    if (video.readyState >= 2) {
      handleVideoLoad();
    } else {
      video.addEventListener("loadeddata", handleVideoLoad, { once: true });
      // Fallback: If network is slow, setup scroll trigger immediately so page doesn't glitch
      const fallbackTimer = setTimeout(setupScroll, 500);
      return () => {
        clearTimeout(fallbackTimer);
        video.removeEventListener("loadeddata", handleVideoLoad);
      };
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [videoSrc]);

  // Smooth scroll directly to the mission briefing form
  const handleScrollToForm = () => {
    const formEl = document.getElementById("mission-briefing");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight * 1.3,
        behavior: "smooth"
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Vault Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover opacity-85 pointer-events-none"
        muted
        playsInline
        preload="auto"
      />

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none z-10" />

      {/* Center Title (Fades out smoothly on scroll) */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
      >
        <h2 className="text-white text-6xl md:text-8xl font-display uppercase tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] opacity-80 mix-blend-overlay text-center">
          THE BRIEFING
        </h2>
      </div>

      {/* Quote Overlay (Emerges as the vault door opens) */}
      <div
        ref={quoteRef}
        className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 max-w-xl z-20 pointer-events-none opacity-0 px-4"
      >
        <p className="text-white font-dossier text-2xl sm:text-3xl md:text-5xl leading-relaxed text-right drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
          &quot;The greatest heist isn&apos;t money. <br />
          <span className="text-[var(--heist-red)] font-display tracking-[0.1em] text-3xl sm:text-4xl md:text-7xl mt-3 block">
            IT&apos;S CLOUD MASTERY.
          </span>
          &quot;
        </p>
        <div className="text-[var(--text-muted)] font-mono text-right mt-4 text-xs sm:text-sm uppercase tracking-[0.3em]">
          &mdash; Arcade Facilitator
        </div>
      </div>

      {/* Interactive "Scroll to Enter Vault" Helper Indicator */}
      <div
        ref={indicatorRef}
        onClick={handleScrollToForm}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer group"
      >
        <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[var(--mint-gold)] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">
          SCROLL TO ENTER VAULT
        </span>
        <div className="w-8 h-8 rounded-full border border-[var(--mint-gold)]/50 group-hover:border-white bg-black/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-all">
          <ChevronDown size={18} className="text-[var(--mint-gold)] group-hover:text-white animate-bounce" />
        </div>
      </div>
    </div>
  );
}
