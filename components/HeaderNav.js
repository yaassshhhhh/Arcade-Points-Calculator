'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  React.useEffect(() => {
    const checkLogin = () => {
      const url = sessionStorage.getItem("arcadeProfileUrl");
      if (url) {
        setIsLoggedIn(true);
        const name = sessionStorage.getItem("arcadeUserName") || "Operative";
        let avatar = sessionStorage.getItem("arcadeUserAvatar");
        if (!avatar || avatar === "null" || avatar === "undefined") {
          avatar = "/professor.png";
        }
        setUserProfile({ name, avatar });
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("arcadeProfileUrl");
    sessionStorage.removeItem("arcadeUserName");
    sessionStorage.removeItem("arcadeUserAvatar");
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/");
  };

  const links = [
    { label: "The Briefing", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Facilitator", href: "/facilitator", highlight: true },
    { label: "Skill Badges", href: "/skill-badges" },
    { label: "Resources", href: "/resources" },
    { label: "Swags", href: "/swags" },
  ];

  return (
    <nav className="heist-nav">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_var(--heist-red)]">
          <Image src="/professor1.png" alt="Professor Logo" fill className="object-contain" />
        </div>
        <span className="font-display text-xl md:text-2xl tracking-widest text-white group-hover:text-gray-200 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center">
          VAULT
          <span className="bg-[var(--heist-red)] text-black px-2 py-0.5 ml-1 md:ml-2 rounded-sm shadow-[0_0_15px_var(--heist-red)] font-black text-lg md:text-xl -skew-x-12 group-hover:scale-110 transition-transform duration-300 inline-block">
            XP
          </span>
        </span>
      </Link>

      {/* Desktop Nav links */}
      <div className="hidden lg:flex items-center gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
          
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`font-shlop text-xl md:text-2xl uppercase tracking-[0.05em] transition-all duration-300 pb-1 border-b-2 whitespace-nowrap ${
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
        {isLoggedIn && userProfile && (
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-[var(--vault-outline)]">
            <div className="flex items-center gap-2 group/profile cursor-pointer" onClick={() => router.push('/dashboard')} title={userProfile.name}>
              <div className="w-8 h-8 rounded-full border border-[var(--vault-outline)] overflow-hidden bg-black flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={userProfile?.avatar || '/professor.png'} 
                  alt={userProfile?.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/professor.png'; }} 
                />
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="font-shlop text-xl tracking-[0.05em] text-[var(--heist-red)] hover:text-white transition-colors duration-300 ml-2 bg-transparent border border-transparent hover:border-white px-2 rounded"
              title="Logout"
            >
              LOGOUT
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[var(--heist-red)] transition-colors p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[var(--vault-charcoal)] border-b border-[var(--heist-red)] shadow-[0_10px_30px_rgba(0,0,0,0.8)] lg:hidden flex flex-col py-4 px-6 z-50"
          >
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-shlop text-2xl uppercase tracking-[0.05em] transition-all duration-300 py-3 border-b border-[var(--vault-outline)] last:border-0 ${
                    isActive 
                      ? "text-[var(--heist-red-bright)]" 
                      : link.highlight 
                        ? "text-[var(--mint-gold)]"
                        : "text-[var(--text-muted)] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isLoggedIn && userProfile && (
              <div className="py-4 border-b border-[var(--vault-outline)] flex items-center justify-between">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setIsOpen(false); router.push('/dashboard'); }} title={userProfile.name}>
                  <div className="w-8 h-8 rounded-full border border-[var(--vault-outline)] overflow-hidden bg-black flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={userProfile?.avatar || '/professor.png'} 
                      alt={userProfile?.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = '/professor.png'; }} 
                    />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="font-shlop text-xl tracking-[0.05em] text-[var(--heist-red)] hover:text-white transition-colors bg-[var(--vault-charcoal)] px-3 py-1 rounded border border-[var(--heist-red)]"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
