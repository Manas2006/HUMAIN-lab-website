import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f8f5',
          100: '#e9ede6',
          200: '#d3dccd',
          300: '#b0c0a8',
          400: '#88a07a',
          500: '#6a8d6d',
          600: '#547258',
          700: '#455c49',
          800: '#3a4c3e',
          900: '#324035',
        },
        primary: {
          DEFAULT: '#88B08B',
          dark: '#6A8D6D',
          light: '#A8C5AB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-sage': 'linear-gradient(180deg, rgb(203, 218, 201) 0%, rgb(206, 221, 201) 100%)',
      },
    },
  },
  plugins: [],
}
export default config

