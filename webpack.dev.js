//webpack.dev.js
const webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//merge用法用来将配置内容合并到webpack.base.js中
//第一个参数是原始的webpack的配置json对象
//第二个参数是我们要合并的单独的配置对象
module.exports = merge(common, {
    //定义环境为开发环境
    mode: 'development',
    // devtool: 'inline-source-map', //内联配置源码映射
    entry: {
        index: './src/main.js'
    },
    //配置本地服务
    devServer: {
        //配置本地的静态资源文件夹，用来让这两个文件夹内部的文件可以通过访问http地址直接展示
        static: [
            path.resolve(__dirname, 'dist'), //这里是构建目标路径
            path.resolve(__dirname, 'public') //这里是public部分的内容
        ],
        host: 'localhost', //本地服务启动后的ip地址
        port: 8080, //本地服务启动的端口号
        open: true, //启动时自动打开默认浏览器
    },
    module: {
        rules: [{ //用来编译css代码
            test: new RegExp(`^(?!.*\\.common).*\\.css`),
            use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            mode: 'local',
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    }
                },
                { loader: 'postcss-loader' },
            ]
        },
        {
            test: new RegExp(`^(.*\\.common).*\\.css`),
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }, ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PropTypes: 'prop-types',
            useEffect: ['react', 'useEffect'],
            useState: ['react', 'useState'],
            useCallback: ['react', 'useCallback'],
            useMemo: ['react', 'useMemo'],
            useReducer: ['react', 'useReducer'],
            useRef: ['react', 'useRef'],
            useContext: ['react', 'useContext'],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
    ]
})