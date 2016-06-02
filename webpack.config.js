"use strict";

let path = require("path")
    , NpmInstallPlugin = require("npm-install-webpack-plugin")
    , HtmlWebpackPlugin = require("html-webpack-plugin")
    , webpack = require("webpack")
;

module.exports = {
    cache: true,
    entry: {
        app: [path.resolve("./src", "app.js")]
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
        publicPath: ""
    },
    plugins: [
        new NpmInstallPlugin({
            dev: function(module, path){
                return [            //Any dependencies listed here will be installed as production dependencies, not dev

                ].indexOf(module) === -1
            },
            peerDependencies: true
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: 'body'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|assets|\.spec\.js$/,
                loader: 'babel?presets[]=es2015&cacheDirectory'
            },
            // plain 'ol CSS files
            {test: /\.css$/, loader: "style!css"},

            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}

        ]
    }
}