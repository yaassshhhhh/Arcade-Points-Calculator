"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollVideo({ videoSrc }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const quoteRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger inside useEffect for Next.js SSR compatibility
    gsap.registerPlugin(ScrollTrigger);
    
    const video = videoRef.current;
    if (!video) return;

    let tl;

    const setupScroll = () => {
      // Create GSAP timeline
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // 300vh of scrolling distance
          scrub: 0.5, // Smooth scrubbing
          pin: true, // Pin the container while scrolling
          onUpdate: (self) => {
            if (video && video.duration) {
              // Smoothly map scroll progress (0-1) to video duration
              video.currentTime = video.duration * self.progress;
            }
          }
        }
      });

      // Dummy tween to define a timeline length of 1
      tl.to({}, { duration: 1 });

      // Fade out the center title "THE BRIEFING"
      tl.to(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3
      }, 0.1); // Starts fading out shortly after scroll begins

      // Animate the quote in from the right at the end of the video (progress 0.7 to 1.0)
      tl.fromTo(quoteRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.3 },
        0.7
      );
    };

    const handleVideoLoad = () => {
      // Force video to pause and reset so seeking works reliably on all devices
      video.pause();
      video.currentTime = 0;
      // Some browsers (like Safari) need a tiny play/pause nudge to unlock the video for seeking
      video.play().then(() => {
        video.pause();
      }).catch(() => {
        // Autoplay might be blocked, that's okay, we just want to seek
      });
      setupScroll();
    };

    if (video.readyState >= 3) { // HAVE_FUTURE_DATA
      handleVideoLoad();
    } else {
      // Use loadeddata instead of loadedmetadata to ensure the first frame is actually ready
      video.addEventListener('loadeddata', handleVideoLoad);
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoad);
      }
      if (tl) {
        tl.kill();
      }
      // Clean up all ScrollTriggers created in this component
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover opacity-80"
        muted
        playsInline
        preload="auto"
      />
      
      {/* Center Title (Fades out) */}
      <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <h2 className="text-white text-6xl md:text-8xl font-display uppercase tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] opacity-70 mix-blend-overlay">
          THE BRIEFING
        </h2>
      </div>

      {/* Quote Overlay (Appears at the end of scroll) */}
      <div 
        ref={quoteRef} 
        className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 max-w-xl z-20 pointer-events-none opacity-0"
      >
        <p className="text-white font-dossier text-3xl md:text-5xl leading-relaxed text-right drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          &quot;The greatest heist isn&apos;t money. <br/>
          <span className="text-[var(--heist-red)] font-display tracking-[0.1em] text-4xl md:text-7xl mt-4 block">
            IT&apos;S CLOUD MASTERY.
          </span>&quot;
        </p>
        <div className="text-[var(--text-muted)] font-mono text-right mt-6 text-sm uppercase tracking-[0.3em]">
          — Arcade Facilitator
        </div>
      </div>
      

    </div>
  );
}
