// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './_main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'leaflet.canvaslayer.field.js',
        library: 'LeafletCanvasLayerField', // The global variable name used if script is included directly in HTML
        libraryTarget: 'umd', // Universal Module Definition
        umdNamedDefine: true // Helps with named AMD modules
    },
    
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        browsers: ['last 2 versions'],
                                        node: '12'
                                    }
                                }]
                            ],
                            plugins: ['@babel/plugin-transform-runtime'] // Add this line
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin(),
        new WebpackShellPluginNext({
            onBuildStart: ['echo "Webpack Start"'],
            onBuildEnd: ['node copy-to-examples.js']
        }),
    ],
};

module.exports = config;
