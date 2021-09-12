const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  if (argv.mode === "development" || argv.mode === "production") {
    return {
      entry: "./src/index.js",
      output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public"),
      },
      module: {
        rules: [
          {
            loader: "babel-loader",
            test: [/\.js$/, /\.jsx$/],
            exclude: /node_modules/,
          },
          {
            test: [/\.css$/],
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(svg|png|gif|jpg|ico)$/,
            use: {
              loader: "url-loader",
            },
          },
        ],
      },
      resolve: {
        extensions: ["", ".js", ".jsx", ".json"],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
        }),
      ],
      devServer: {
        port: 3000,
        historyApiFallback: true,
      },
    };
  } else {
    console.log("can not find mode!");
  }
};