/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'heist-red': 'var(--heist-red)',
        'heist-red-dark': 'var(--heist-red-dark)',
        'heist-red-bright': 'var(--heist-red-bright)',
        'heist-red-glow': 'var(--heist-red-glow)',
        
        'vault-black': 'var(--vault-black)',
        'vault-charcoal': 'var(--vault-charcoal)',
        'vault-slate': 'var(--vault-slate)',
        'vault-outline': 'var(--vault-outline)',
        
        'mint-gold': 'var(--mint-gold)',
        'mint-gold-bright': 'var(--mint-gold-bright)',
        'mint-gold-dim': 'var(--mint-gold-dim)',
        
        'paper-cream': 'var(--paper-cream)',
        'paper-aged': 'var(--paper-aged)',
        'ink-black': 'var(--ink-black)',
        
        'success-green': 'var(--success-green)',
        'alarm-amber': 'var(--alarm-amber)',
        'danger-flash': 'var(--danger-flash)',
        
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        dossier: ['"Special Elite"', 'monospace'],
        shlop: ['Shlop', 'sans-serif'],
      },
      animation: {
        'alarm-pulse': 'alarm-pulse 2s infinite ease-in-out',
        'fade-slide': 'fade-slide 0.5s ease-out forwards',
        'vault-open': 'vault-open 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        'alarm-pulse': {
          '0%, 100%': { opacity: 0.3, boxShadow: '0 0 10px var(--danger-flash)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 30px var(--danger-flash)' },
        },
        'fade-slide': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'vault-open': {
          from: { transform: 'scale(1)', opacity: 1 },
          to: { transform: 'scale(1.5)', opacity: 0 },
        },
      }
    },
  },
  plugins: [],
};
