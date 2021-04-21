const path = require('path')

module.exports = {
    base: './',
    assetsDir: 'assets',
    esbuildTarget: 'es2015',
    alias: {
        '/@/': path.resolve(__dirname, './src')
    }
}
