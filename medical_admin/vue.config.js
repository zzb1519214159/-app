const path = require('path'); //引入path模块

function resolve(dir) {
    //path.join(__dirname)设置绝对路径
    return path.join(__dirname, dir)
}

// 项目的主要配置文件
module.exports = {
    // 注释eslint
    lintOnSave: false,
    // 基本路径 rent/
    publicPath: './',

    // 输出文件目录
    outputDir: 'medical',

    // 静态资源目录 (js, css, img, fonts)
    assetsDir: 'assets',

    devServer: {
        hot: true, //注：hot:true为热更新选项，如不需要，删掉即可。
    },

    // 打包时不生成.map文件
    productionSourceMap: false,
    // 链式修改 webpack配置
    chainWebpack: (config) => {
        // 设置路径 别名配置
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@com', resolve('src/components'))
            .set('@utils', resolve('src/utils'))
            .set('@scss', resolve('src/assets/scss'))
            .set('@images', resolve('src/assets/images'))
            //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    // 配置scss全局文件
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                path.resolve(__dirname, './src/assets/scss/commonColor.scss')
            ]
        }
    }
}