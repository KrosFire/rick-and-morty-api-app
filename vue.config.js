module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/_variables.scss";`,
      },
    },
  },
};
