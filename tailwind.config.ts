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
          50: '#FAF9F7',
          100: '#F5F3F0',
          200: '#EBE8E3',
          300: '#DDD8D1',
          400: '#CFC8BE',
          500: '#BFB8AA',
          600: '#AAA194',
          700: '#948B7D',
          800: '#6D6660',
          900: '#4A453F',
        },
        secondary: {
          50: '#F7F7F6',
          100: '#EEEEEC',
          200: '#DDDCDA',
          300: '#C7C6C3',
          400: '#B1AFAC',
          500: '#8C8B88',
          600: '#747371',
          700: '#5C5B59',
          800: '#454441',
          900: '#2E2D2B',
        },
        accent: {
          50: '#FEFEFE',
          100: '#FDFDFD',
          200: '#F9F9F9',
          300: '#F5F5F5',
          400: '#F0F0F0',
          500: '#E8E8E8',
          600: '#D1D1D1',
          700: '#B4B4B4',
          800: '#8A8A8A',
          900: '#5F5F5F',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#BDC1C6',
          500: '#9AA0A6',
          600: '#80868B',
          700: '#5F6368',
          800: '#3C4043',
          900: '#202124',
        },
        text: {
          primary: '#000000',
          secondary: '#5F6368',
          muted: '#80868B',
        }
      },
      fontFamily: {
        'sans': ['Glacial Indifference', 'Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Glacial Indifference', 'Inter', 'ui-sans-serif'],
        'body': ['Glacial Indifference', 'Open Sans', 'ui-sans-serif'],
        'accent': ['Dancing Script', 'cursive'],
        'logo': ['Josefin Sans', 'Inter', 'ui-sans-serif'],
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