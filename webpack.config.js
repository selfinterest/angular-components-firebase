"use strict";

let path = require("path")
    , NpmInstallPlugin = require("npm-install-webpack-plugin")
    , HtmlWebpackPlugin = require("html-webpack-plugin")
    , webpack = require("webpack")
    , firebaseUrl = process.env.FIREBASE_URL || null
;

if(!firebaseUrl) {
    throw new Error("Must set FIREBASE_URL environment variable");
}

module.exports = {
    cache: true,
    devtool: "sourcemap",
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
        new webpack.DefinePlugin({
            __FIREBASE_URL__: `"${firebaseUrl}"`        //this needs quotation marks because it is inserted _as is_ into the code at compile time.
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            d3: "d3",
            $: "jquery"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|assets|\.spec\.js$/,
                loader: 'babel?presets[]=es2015&cacheDirectory'
            },
            //Sass
            {test: /\.scss$/, loader: "style!css!sass"},

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