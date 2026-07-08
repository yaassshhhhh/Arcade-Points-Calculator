'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function HeaderNav() {
  const pathname = usePathname();

  const links = [
    { label: "The Briefing", href: "/" },
    { label: "The Vault Room", href: "/dashboard" },
    { label: "The Gang", href: "/leaderboard" },
    { label: "Safe House", href: "/facilitator", highlight: true },
    { label: "Skill Badges", href: "/skill-badges" },
    { label: "Resources", href: "/resources" },
    { label: "Swags", href: "/swags" },
  ];

  return (
    <nav className="heist-nav">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_var(--heist-red)]">
          <Image src="/professor1.png" alt="Professor Logo" fill className="object-contain" />
        </div>
        <span className="font-display text-2xl tracking-widest text-white group-hover:text-gray-200 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center">
          VAULT
          <span className="bg-[var(--heist-red)] text-black px-2 py-0.5 ml-2 rounded-sm shadow-[0_0_15px_var(--heist-red)] font-black text-xl -skew-x-12 group-hover:scale-110 transition-transform duration-300 inline-block">
            XP
          </span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden lg:flex items-center gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
          
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`font-mono text-sm uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 ${
                isActive 
                  ? "text-[var(--heist-red-bright)] border-[var(--heist-red-bright)] drop-shadow-[0_0_8px_var(--heist-red-glow)]" 
                  : link.highlight 
                    ? "text-[var(--mint-gold)] border-[var(--mint-gold-dim)] hover:text-[var(--mint-gold-bright)] hover:border-[var(--mint-gold)]"
                    : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--vault-outline)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>


    </nav>
  );
}
