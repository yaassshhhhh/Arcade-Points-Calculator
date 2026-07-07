"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt autoplay if browser allows (often blocked until user interaction)
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay prevented by browser.", err);
        setIsPlaying(false);
      });
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      <audio
        ref={audioRef}
        src="/Bela%20Chaw%20Chaw.mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className="br-panel"
        style={{
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "1px solid var(--br-red)",
          borderRadius: "50%",
          clipPath: "none",
          background: "rgba(0,0,0,0.8)"
        }}
        title="Toggle Theme Music"
      >
        {isPlaying ? <Volume2 size={24} color="var(--br-orange)" /> : <VolumeX size={24} color="var(--br-muted)" />}
      </button>
    </div>
  );
}
