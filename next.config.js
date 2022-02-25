// const webpack = require("webpack");
// const {parsed:envKeys} = require("dotenv").config({path:"./.env"});

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // webpack(config){
  //   config.plugins.push(new webpack.EnvironmentPlugin(envKeys))
  //   return config
  // }
}