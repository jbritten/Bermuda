const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => {
    process.env.NODE_ENV = (env && env.NODE_ENV) || "development";
    const devMode = process.env.NODE_ENV !== "production";
    return {
        entry: path.resolve(__dirname, "src/index.js"),
        devtool: "source-map",
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "assets/"),
            publicPath: "/assets/"
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["transform-class-properties"]
                        }
                    }]
                },
                {
                    test: /\.((s[ac]ss)|(css))$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CopyWebpackPlugin([{
                from: path.resolve("src/images"),
                to: path.resolve("./assets/images")
            }])
        ]
    };
};
