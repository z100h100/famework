// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');  //引入插件

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextWebapckPlugin.extract({ use: 'css-loader' })
                    }
                }
            },
          {
            test: /\.scss$/,
            use: [{
              loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
              loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
              loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
          },
          {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('src/icons')],
            options: {
              symbolId: 'icon-[name]'
            }
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
          }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractTextWebapckPlugin('style.css')
    ],
    resolve: {  //导入的时候不用写拓展名
        extensions: [' ', '.js', '.json', '.vue', '.scss', '.css']
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    }
}
