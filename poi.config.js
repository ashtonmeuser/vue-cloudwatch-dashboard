const path = require('path');
const pkg = require('./package');

module.exports = {
  entry: 'src/index.js',
  html: {
    title: pkg.productName,
    description: pkg.description,
    template: path.join(__dirname, 'index.ejs'),
  },
  plugins: [
    require('@poi/plugin-offline')(), // eslint-disable-line
  ],
};
