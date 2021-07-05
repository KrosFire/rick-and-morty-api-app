module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
    safelist: [
      "grid-cols-1",
      "grid-cols-2",
      "grid-cols-3",
      "grid-cols-4",
      "grid-cols-5",
      "grid-cols-6",
      "grid-cols-7",
      "grid-cols-8",
      "grid-cols-9",
      "grid-cols-10",
      "grid-cols-11",
      "grid-cols-12",
      "grid-cols-none",
    ],
  },
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
