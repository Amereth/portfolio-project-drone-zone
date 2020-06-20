const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const filename = ext => `[name].${ext}`


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/img'),
                    to: path.resolve(__dirname, './dist/img')
                },
                {
                    from: path.resolve(__dirname, './src/fonts'),
                    to: path.resolve(__dirname, './dist/fonts')
                }
            ]
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        //   })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            // {
            //     test: /\.(png|jpg|jpeg|svg|gif|ttf|woff|woff2)$/,
            //     use: ['file-loader']
            // },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                } 
            },
        ]
    }
}