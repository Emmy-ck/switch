/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#59302C",
          primary: "#BF4209",
          accent: "#CC703D",
          light: "#FCE8CF",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
}
