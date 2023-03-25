const path = require('path');

module.exports = {
  entry: './scripts/init.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
};