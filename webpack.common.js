const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
    module: {
        rules: [
            //配置babel-loader用来编译和解析js
            {
                test: /\.(m?js|jsx)$/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.(png|svg|svga|jpg|gif|mp4)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[hash][ext][query]',
                    publicPath: '',
                }
            },
        ]
    },
    plugins: [
        new ESLintPlugin({
            extensions: ['.js', '.jsx'],
            failOnError: true,
            emitWarning: true,
            emitError: true,
        })
    ]
}