const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(paths){
    return {
        entry: {
            'widgets': './widgets.js',
        },
        output: {
            filename: '[name].js',
            libraryTarget: 'window',
            library: '[name]'
        },
        optimization: {
            minimize: true,
            removeAvailableModules: true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
                test: /\.js$/,
            })
            ],
        }
    }};