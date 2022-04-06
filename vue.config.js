module.exports = {
      publicPath: './',
      devServer: {
        proxy: {
          '/ossapi': {
            target: 'http://101.34.13.19:3001/',
            changeOrigin: true,
            pathRewrite:{
              '^/api':''
            }
          },
          '/foo': {
            target: '<other_url>'
          }
        }
      }
    }