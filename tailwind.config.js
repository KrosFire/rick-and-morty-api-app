module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: {
          default: "var(--accent)",
          light: "var(--light-accent)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
