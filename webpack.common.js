const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/assets/js/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "production.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  /*PLUGIN */
  plugins: [
    /*html plugins */
    new HTMLWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
  ],
};
