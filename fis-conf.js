"use strict";

const initFIS = require('./build');

initFIS(fis, {
    output: {
        default: {
            basePath: 'assets',
            pagePath: '',
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
            pagePath: '',
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
                'bluebird',
                'fetch',
                'url-search-params',
                'js-cookie',
                'vue',
                'vue-router',
                'vue-animated-list',
            ],
            'config.js': ['config/config']
        },
        ignore: []
    },
});