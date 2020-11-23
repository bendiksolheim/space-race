const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const debug = process.env.DEBUG === "true";

module.exports = {
  entry: "./src/index.ts",

  mode: "development",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      DEBUG: debug,
    }),
  ],

  devServer: {
    port: 3000,
  },
};
