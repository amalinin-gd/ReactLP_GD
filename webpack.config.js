const path = require('path');

const PATHS = {
    source: path.join(__dirname, 'js'),
    build: path.join(__dirname, 'dist'),

};

module.exports = {
    entry: PATHS.source + '/app.js',
    output: {
        filename: 'bundle.js',
        path: PATHS.build
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};