/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color palette - White, Grey, Black
        primary: {
          white: '#FFFFFF',
          offwhite: '#FAFAFA',
          light: '#F5F5F5',
          DEFAULT: '#FFFFFF',
        },
        grey: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          DEFAULT: '#757575',
        },
        black: {
          DEFAULT: '#000000',
          soft: '#1A1A1A',
          charcoal: '#2C2C2C',
        },
        // Accent colors for flowers/gifts - Premium & Elegant
        accent: {
          rose: {
            50: '#FFF1F2',
            100: '#FFE4E6',
            200: '#FECDD3',
            300: '#FDA4AF',
            400: '#FB7185',
            500: '#F43F5E',
            600: '#E11D48',
            DEFAULT: '#E11D48',
          },
          pink: {
            50: '#FDF2F8',
            100: '#FCE7F3',
            200: '#FBCFE8',
            300: '#F9A8D4',
            400: '#F472B6',
            500: '#EC4899',
            600: '#DB2777',
            DEFAULT: '#EC4899',
          },
          blush: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            DEFAULT: '#FED7AA',
          },
          sage: {
            50: '#F6F7F6',
            100: '#E8EAE6',
            200: '#D1D6CD',
            300: '#B9C2B3',
            400: '#87A17F',
            DEFAULT: '#87A17F',
          },
        },
        // Semantic colors
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        // Premium sans-serif fonts for headings - modern and elegant
        display: [
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        // Clean sans-serif for body text - modern and readable
        body: [
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'Inter',
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        // Elegant script font for special occasions (optional)
        elegant: [
          'Dancing Script',
          'Great Vibes',
          'Allura',
          'cursive',
        ],
        // Sans-serif alternative for UI elements
        sans: [
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'Inter',
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      letterSpacing: {
        'wider': '0.05em',
        'widest': '0.1em',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}