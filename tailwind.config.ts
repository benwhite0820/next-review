import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{jsx,tsx}', './app/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo_2)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
