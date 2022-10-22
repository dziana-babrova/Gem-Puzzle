const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src2/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|avif|mp3)$/i,
        type: "asset",
        generator: {
          filename: "[name][hash][ext]",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["src2/index.scss"],
            },
          },
        ],
      },

    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src2/index.html",
      filename: "./index.html",
    }),
  ],
};
