import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'theme-dark-blue': '#0663BA',
        'theme-blue': '#66B2FF',
        'theme-green': '#00CC66',
        'theme-red': '#FF6666',
        'theme-orange': '#FFB570'
      }
    },
  },
  plugins: [],
}
export default config
