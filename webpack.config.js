const path = require('path');

const PATHS = {
    source: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'dist'),
    public: '/assets'
};

module.exports = {
    entry: PATHS.source + '/js/app.js',
    output: {
        filename: 'bundle.js',
        path: PATHS.build,
        publicPath: PATHS.public
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
    },
    devServer: {
        contentBase: PATHS.source,
        compress: true,
        port: 8080
    }
};