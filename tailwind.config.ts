import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#A67B5B',
        'dark-terracotta': '#8B6543',
        cream: '#D4C4B0',
        'light-cream': '#E8DFD0',
        gold: '#D4A574',
        'section-dark-bg': '#6B4E3D',
        'section-dark-text': '#F5EFE7',
        'section-light-bg': '#FAF6F1',
        'section-light-text': '#5A4A3A',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
