const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  // devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}
