import path from "path";
import { exec } from "child_process";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { type Configuration as WebpackConfig } from "webpack";
import { type Configuration as WebpackDevServerConfig } from "webpack-dev-server";

type Configuration = WebpackConfig & {
  devServer?: WebpackDevServerConfig;
};

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    {
      apply: (compiler) => {
        compiler.hooks.compile.tap("WasmPackPlugin", (_compilation) => {
          exec("wasm-pack build ballistics-calc", (_err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      },
    },
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 8080,
    open: true,
    hot: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
};

export default config;
