const path = require('path')

module.exports = {
    base: './',
    alias: {
        '/@/': path.resolve(__dirname, './src')
    }
}