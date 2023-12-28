/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      white: 'hsl(var(--white))',
      black: 'hsl(var(--black))',
      gray: {
        DEFAULT: 'hsl(var(--slate-500) / <alpha-value>)',
        50: 'hsl(var(--slate-50) / <alpha-value>)',
        100: 'hsl(var(--slate-100) / <alpha-value>)',
        200: 'hsl(var(--slate-200) / <alpha-value>)',
        300: 'hsl(var(--slate-300) / <alpha-value>)',
        400: 'hsl(var(--slate-400) / <alpha-value>)',
        500: 'hsl(var(--slate-500) / <alpha-value>)',
        600: 'hsl(var(--slate-600) / <alpha-value>)',
        700: 'hsl(var(--slate-700) / <alpha-value>)',
        800: 'hsl(var(--slate-800) / <alpha-value>)',
        900: 'hsl(var(--slate-900) / <alpha-value>)',
        950: 'hsl(var(--slate-950) / <alpha-value>)',
      },
      red: {
        DEFAULT: 'hsl(var(--red-600) / <alpha-value>)',
        50: 'hsl(var(--red-50) / <alpha-value>)',
        100: 'hsl(var(--red-100) / <alpha-value>)',
        200: 'hsl(var(--red-200) / <alpha-value>)',
        300: 'hsl(var(--red-300) / <alpha-value>)',
        400: 'hsl(var(--red-400) / <alpha-value>)',
        500: 'hsl(var(--red-500) / <alpha-value>)',
        600: 'hsl(var(--red-600) / <alpha-value>)',
        700: 'hsl(var(--red-700) / <alpha-value>)',
        800: 'hsl(var(--red-800) / <alpha-value>)',
        900: 'hsl(var(--red-900) / <alpha-value>)',
        950: 'hsl(var(--red-950) / <alpha-value>)',
      },
      blue: {
        DEFAULT: 'hsl(var(--blue-600) / <alpha-value>)',
        50: 'hsl(var(--blue-50) / <alpha-value>)',
        100: 'hsl(var(--blue-100) / <alpha-value>)',
        200: 'hsl(var(--blue-200) / <alpha-value>)',
        300: 'hsl(var(--blue-300) / <alpha-value>)',
        400: 'hsl(var(--blue-400) / <alpha-value>)',
        500: 'hsl(var(--blue-500) / <alpha-value>)',
        600: 'hsl(var(--blue-600) / <alpha-value>)',
        700: 'hsl(var(--blue-700) / <alpha-value>)',
        800: 'hsl(var(--blue-800) / <alpha-value>)',
        900: 'hsl(var(--blue-900) / <alpha-value>)',
        950: 'hsl(var(--blue-950) / <alpha-value>)',
      },
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
