const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: path.resolve(__dirname, "dist/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/static"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
