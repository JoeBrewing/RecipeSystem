module.exports = {
    entry: './main.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
          { test: /\.jsx$/, loader: 'jsx-loader?harmony' } // loaders can take parameters as a querystring
        ]
    }
};