import { animations, components, palettes, rounded, shade } from '@tailus/themer';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    './node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: palettes.trust,
    },
  },
  plugins: [
    rounded,
    shade,
    components,
    animations,
  ],
};
