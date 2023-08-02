/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    // experimental: {
    //     externalDir: true,
    // },
    webpack(config) {
        config.resolve.alias = {
          ...config.resolve.alias,
          "@flappyblock/shared" : path.resolve(__dirname, "../shared")
        }
        return config
    }
}

module.exports = nextConfig
