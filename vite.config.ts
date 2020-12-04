const path = require('path')

module.exports = {
    base: './gh-pages/',
    esbuildTarget: 'es2015',
    alias: {
        '/@/': path.resolve(__dirname, './src')
    }
}