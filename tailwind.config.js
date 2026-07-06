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
        // Battle Royale palette
        'br-orange':  '#FF6B00',
        'br-olive':   '#4A5D23',
        'br-red':     '#C41E1E',
        'br-green':   '#7CB518',
        'br-dark':    '#0d1117',
        'br-dark2':   '#1a1f16',
        'br-text':    '#E8E8E8',
        'br-muted':   '#8A9A7B',
        // dim / glow variants
        'br-orange-dim': 'rgba(255,107,0,0.18)',
        'br-olive-dim':  'rgba(74,93,35,0.35)',
        'br-red-dim':    'rgba(196,30,30,0.25)',
        'br-green-dim':  'rgba(124,181,24,0.20)',
      },
      fontFamily: {
        display: ['Rajdhani', 'Orbitron', 'sans-serif'],
        body:    ['Inter', 'Roboto', 'sans-serif'],
        mono:    ['"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(255,107,0,0.6), 0 0 40px rgba(255,107,0,0.3)',
        'olive-glow':  '0 0 15px rgba(74,93,35,0.5)',
        'red-glow':    '0 0 20px rgba(196,30,30,0.6)',
        'green-glow':  '0 0 15px rgba(124,181,24,0.5)',
      },
      animation: {
        'pulse-glow':   'pulse-glow 2s ease-in-out infinite',
        'scan-cursor':  'scan-cursor 1s step-end infinite',
        'fade-slide':   'fade-slide 0.5s ease-out forwards',
        'bar-fill':     'bar-fill 1.2s ease-out forwards',
        'count-up':     'count-up 1.5s ease-out forwards',
        'scanline':     'scanline 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { textShadow: '0 0 20px rgba(255,107,0,0.8), 0 0 40px rgba(255,107,0,0.4)' },
          '50%':       { textShadow: '0 0 40px rgba(255,107,0,1),   0 0 80px rgba(255,107,0,0.6)' },
        },
        'scan-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'fade-slide': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'bar-fill': {
          from: { width: '0%' },
          to:   { width: 'var(--bar-target)' },
        },
        'scanline': {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      clipPath: {
        'hex':    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        'panel':  'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        'panel-sm': 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
      },
    },
  },
  plugins: [],
};
