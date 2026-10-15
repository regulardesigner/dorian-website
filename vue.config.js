const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // Served from the root of www.doriantailhades.com (see public/CNAME)
  publicPath: '/',
  transpileDependencies: true
})
