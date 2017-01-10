"use strict";

const initFIS = require('./build'); 

initFIS(fis, {
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
        },
        packages: [{
            name: 'vue-animated-list',
            location: '/libs/vue-animated-list',
            main: 'vue-animated-list'
        }],
        shim: {}
    },
    //合并设置
    package: {
        output: 'pkg',
        vendor: {
            'vendor.js': [
                'js-cookie',
                'vue',
                'vue-router',
                'vue-animated-list',
                'jquery',
                'promise',
            ],
            'config.js': ['config/config']
        },
        ignore: []
    },
});