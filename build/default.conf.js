/**
 * 变化的
 *
 * 生成后目录：assets、pages
 * 生成后文件访问地址： url、domain
 * 生成设置：useHash（base目录、pkg目录）
 *
 * 不变的
 * 
 * js依赖及别名
 * 合并文件设置
 * 模板文件设置
 * 推送目录设置
 * 忽略文件设置：test、build
 *
 * 目录结构：
 * build
 * test
 * src
 * - libs #外部的库
 * - assets #共有静态文件目录
 * - components #共有组件目录
 * - pages #页面目录（默认main.js为入口、html名字需和目录名一致）
 */

module.exports = {
    input: 'pages/**/(*.html)',
    output: {
        default: {
            basePath: 'assets',
            pagePath: 'pages',
            test: false,
            url: '',
            domain: '',
        },
        debug: {
            basePath: 'assets',
            pagePath: '',
            test: 'test',
            url: '',
            domain: '',
        },
        qa: {
            basePath: 'assets',
            pagePath: 'pages',
            test: 'tests',
            url: '',
            domain: '',
        }
    },
    //模块化设置
    amd: {
        paths: {
            "config": "config/config",
            "cookies": "libs/js-cookie/src/js.cookie",
            "require": "libs/requirejs/require",
            "vue": "libs/vue/dist/vue",
            "vue-router": "libs/vue-router/dist/vue-router",
            "vue-animated-list": "libs/vue-animated-list/vue-animated-list",
            "jquery": "libs/jquery/dist/jquery",
            "promise": "libs/bluebird/js/browser/bluebird"
        },
        shim: {
            "app": ['jquery']
        },
        tab: 4
    },
    //合并设置
    package: {
        output: 'pkg',
        vendor: {
            'vendor.js': [
                'cookies',
                'vue',
                'vue-router',
                'vue-animated-list',
                'jquery',
                'promise',
            ],
            'config.js': ['config/config.js']
        },
        ignore: []
    },
    //模板处理
    template: {
        output: {
            '**.tpl': '.template'
        }
    },
    //推送测试服务设置
    push: {
        receiver: '',
        dir: ''
    }
};