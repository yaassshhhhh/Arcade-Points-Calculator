"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function GlobalAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Bela Chaw Chaw.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        setIsPlaying(false);
        console.log("Autoplay blocked by browser.");
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
    <div style={{
      position: "fixed",
      bottom: "80px",
      right: "20px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "rgba(13, 17, 23, 0.8)",
      backdropFilter: "blur(5px)",
      border: "1px solid var(--br-red)",
      padding: "8px 12px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
    }}>
      <button 
        onClick={toggleAudio}
        style={{ 
          background: "transparent", 
          border: "none", 
          color: "var(--br-red)", 
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.75rem",
          textTransform: "uppercase"
        }}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      
      <input 
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        style={{ width: "60px", accentColor: "var(--br-red)" }}
      />
    </div>
  );
}
