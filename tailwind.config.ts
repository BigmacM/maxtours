import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0d1b2a',
          800: '#0a1520',
          900: '#060e18',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8cc6a',
          dark: '#a88920',
        },
        taupe: {
          DEFAULT: '#b8a898',
          light: '#d4c8bc',
          dark: '#8a7a6a',
        },
        'amber-luxury': {
          DEFAULT: '#c87941',
          light: '#e09060',
          dark: '#9a5a28',
        },
        glass: {
          white: 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)',
        'midnight-gradient': 'linear-gradient(135deg, #0d1b2a 0%, #0a1520 50%, #060e18 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(13,27,42,0.4) 0%, rgba(13,27,42,0.85) 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #e8cc6a 50%, #a88920 100%)',
        'amber-gradient': 'linear-gradient(135deg, #c87941 0%, #e09060 100%)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '60px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
        'gold-glow': '0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)',
        'gold-glow-sm': '0 0 12px rgba(212,175,55,0.4)',
        'neumorphic': '6px 6px 16px rgba(0,0,0,0.4), -3px -3px 10px rgba(255,255,255,0.04)',
        'neumorphic-inset': 'inset 4px 4px 12px rgba(0,0,0,0.5), inset -2px -2px 8px rgba(255,255,255,0.05)',
        'card-hover': '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.2)',
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212,175,55,0.5)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};

export default config;
