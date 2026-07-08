"use client";

import { useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global crash caught by error.js:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[var(--vault-black)] text-white relative">
      <div className="fixed inset-0 z-0 bg-[url('/faq-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"></div>
      <div className="relative z-10">
        <HeaderNav />
        <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center min-h-[70vh]">
          <h2 className="font-shlop text-6xl md:text-8xl text-[var(--heist-red)] mb-6 drop-shadow-[0_0_20px_rgba(193,18,31,0.8)] uppercase">
            HEIST COMPROMISED
          </h2>
          <p className="font-mono text-xl text-[var(--text-muted)] mb-8 max-w-2xl">
            A critical system error occurred. The authorities might be tracing our connection.
          </p>
          <p className="font-mono text-sm text-[var(--heist-red)] mb-8">
            ERROR: {error.message || "Unknown anomaly"}
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-[var(--heist-red)] text-white font-display text-xl shadow-[0_0_15px_rgba(193,18,31,0.5)] hover:bg-[var(--heist-red-bright)] transition-colors"
          >
            REBOOT SYSTEM
          </button>
        </div>
      </div>
    </main>
  );
}
