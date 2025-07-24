import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F8F4FD',
          100: '#F1E8FB',
          200: '#E8DAEF',
          300: '#D4B7E3',
          400: '#C197D4',
          500: '#AD76C5',
          600: '#9A5CB6',
          700: '#8147A7',
          800: '#6A3885',
          900: '#532B63',
        },
        secondary: {
          50: '#FEF7FB',
          100: '#FDEFF7',
          200: '#F8BBD9',
          300: '#F499C7',
          400: '#F177B5',
          500: '#ED55A3',
          600: '#E93391',
          700: '#D91A7F',
          800: '#B01866',
          900: '#87134D',
        },
        accent: {
          50: '#FDFEFE',
          100: '#FAF2F2',
          200: '#F5E5E5',
          300: '#F0D8D8',
          400: '#EBCBCB',
          500: '#E6BEBE',
          600: '#E1B1B1',
          700: '#DCA4A4',
          800: '#D79797',
          900: '#D28A8A',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        text: {
          primary: '#2C3E50',
          secondary: '#5A6B7D',
          muted: '#8B9AAB',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Inter', 'ui-sans-serif'],
        'body': ['Open Sans', 'ui-sans-serif'],
        'accent': ['Dancing Script', 'cursive'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { 
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
} satisfies Config; 