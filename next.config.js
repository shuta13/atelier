const withImages = require('next-images')

module.exports = withImages({
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: [
        "raw-loader"
      ]
    })
    return config
  }
})