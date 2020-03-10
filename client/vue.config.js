const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/queue' : {
        target: 'http://localhost:8888/'
      },
      '/auth' : {
        target: 'http://localhost:8888/'
      }
    }
  }
}
