const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// define preprocessor variables
const opts = {
  DEVELOPMENT: false
};

module.exports = {
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // publicPath: path.resolve(__dirname, "./static"),
    filename: "[name].bundle.js",
  },
  "watch": false,
  "context": __dirname, // to automatically find tsconfig.json
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            "options": {
              "transpileOnly": false, // Set to true if you are using fork-ts-checker-webpack-plugin
              "projectReferences": true
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname)
    ],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
    plugins: [
      new TsconfigPathsPlugin({})
    ],
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    hot: true,
    host: 'localhost',
    //0.0.0.0 //enable remote devices using http://IP_ADDRESS:8080
    port: 8080,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          //https://github.com/terser/terser#compress-options
          //compress: false,
          compress: {
            collapse_vars: false,
            keep_classnames: true,
            keep_fnames: true,
          },
          mangle: false,
          //mangle: {
          //  keep_classnames: true,
          //  keep_fnames: true,
          //  safari10: true,
          //},
          output: {
            comments: false,
          },
          //keep_classnames: true,
          //keep_fnames: true,
          safari10: true,
        },
        extractComments: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      minify: false
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "static",
          globOptions: {
            ignore: ["**/publicroot"]
          }
        }
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
