"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function GlobalAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const volume = 0.3; // Default decent volume
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Bela Chaw Chaw.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Audio playback failed:", error);
          }
          setIsPlaying(false);
        });
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Bela Chaw Chaw.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    
    // Attempt autoplay
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        setIsPlaying(false);
        console.log("Autoplay blocked by browser. User must click to play.");
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <button 
      onClick={toggleAudio}
      className="fixed bottom-5 left-5 z-[9999] flex items-center justify-center w-12 h-12 rounded-full bg-[var(--vault-charcoal)] border border-[var(--heist-red)] text-[var(--mint-gold)] shadow-[0_0_15px_rgba(193,18,31,0.5)] hover:bg-[var(--heist-red-dark)] hover:shadow-[0_0_20px_var(--heist-red-bright)] hover:scale-110 transition-all duration-300"
      aria-label="Toggle Audio"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
