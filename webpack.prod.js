const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引入抽取css样式插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(common, {
    mode: 'production',
    // devtool: 'source-map', //独立配置源码映射
    entry: {
        index: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/[name].[chunkhash:5].js',
        chunkFilename: 'assets/[name].[chunkhash:5].js',
        publicPath: '',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, //抽取css样式文件
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
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        //配置样式抽取插件，生成的css文件名称为[name],[name]为entry中定义的key
        new MiniCssExtractPlugin({
            filename: 'dist/assets/[name].css'
        }),
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
			template:'./public/index.html',
			filename:'index.html',
			chunks:['index']
		})
    ]
})