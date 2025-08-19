// webpack/config/optimization.js
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export const sharedOptimization = {
  runtimeChunk: "single",
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all",
        priority: 20,
      },
      common: {
        minChunks: 2,
        name: "common",
        priority: 10,
        reuseExistingChunk: true,
      },
    },
  },
};

export const prodOptimization = {
  ...sharedOptimization,
  minimize: true,
  minimizer: [
    "...", // Terser
    new CssMinimizerPlugin(),
  ],
  moduleIds: "deterministic",
  chunkIds: "deterministic",
  sideEffects: true,
  usedExports: true,
  concatenateModules: true,
};
