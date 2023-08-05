/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    transpilePackages: ["@flappyblock/shared"],
    // webpack(config) {
    //   // config.resolve.alias = {
    //   //   ...config.resolve.alias,
    //   //   "@flappyblock/shared" : path.resolve(__dirname, "../shared")
    //   // };
    //   // config.resolve.extensionAlias = {
    //   //   ...config.resolve.extensionAlias,
    //   //   ".js": [".ts", ".tsx", ".js", ".jsx"],
    //   //   ".mjs": [".mts", ".mjs"],
    //   //   ".cjs": [".cts", ".cjs"],
    //   // };
    //   return config
    // }
}

module.exports = nextConfig
