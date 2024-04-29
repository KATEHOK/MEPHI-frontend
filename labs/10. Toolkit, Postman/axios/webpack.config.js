const path = require('path')

module.exports = {
    entry: {
        task: './src/js/task.js'
    },
    output: {
        path: path.resolve(__dirname, 'dst/js'),
        filename: '[name].js'
    }
}