const path = require('path');

module.exports = {
  devServer: {
    proxy: 'https://explorer.testnet.mile.global',
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
