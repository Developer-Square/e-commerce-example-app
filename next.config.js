/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  images: {
    unoptimized: true,
  },
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  webpack: (config) => {
    // this will override the experiments
    // eslint-disable-next-line no-param-reassign
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
});
