const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: path.join(__dirname, "src/js/background.js"),
    content: path.join(__dirname, "src/js/content.js"),
    popup: path.join(__dirname, "src/js/popup.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/css", to: "css" },
        { from: "src/popup.html", to: "popup.html" },
        { from: "src/icons", to: "icons" },
      ],
    }),
  ],
};
