const path = require('path');
const pkg = require('./package');

/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  entry: [
    'src/polyfills.js',
    'src/index.js',
  ],
  html: {
    title: pkg.productName,
    description: pkg.description,
    template: path.join(__dirname, 'index.ejs'),
  },
  plugins: [
    require('poi-plugin-offline')({
      pwa: './src/pwa.js',
      pluginOptions: {},
    }),
  ],
};
