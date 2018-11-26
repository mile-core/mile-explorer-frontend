const path = require('path');

module.exports = {
  devServer: {
    proxy: 'https://explorer.mile.global',
    // proxy: 'http://localhost:8042',
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.sass'),
      ],
    },
  },
};
