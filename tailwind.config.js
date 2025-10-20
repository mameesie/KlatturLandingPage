module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    screens: {
      'xs': '320px',  // or whatever size you prefer
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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