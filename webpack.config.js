const path = require('path');

module.exports = {
  entry: './chatbot_widget.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
    ],
  },
  mode: 'production', // Change to 'development' for debugging
};
