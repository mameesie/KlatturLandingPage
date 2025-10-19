module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        nonamreg: ['var(--font-no-name-regular)'],
        opensanssemibold: ['var(--font-open-sans-semibold)'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}