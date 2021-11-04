module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/style.scss";`,
      },
    },
  },
  lintOnSave: false
};
