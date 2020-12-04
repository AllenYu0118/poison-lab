const path = require('path')

module.exports = {
    base: './',
    esbuildTarget: 'es2015',
    alias: {
        '/@/': path.resolve(__dirname, './src')
    }
}