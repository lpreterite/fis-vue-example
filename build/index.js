'use strict';

const path = require('path');
const utils = require('./utils');

const defaults = {
    ignore: [
        '*.md',
        '*.json',
        '*.browserrc',
        '*.gitignore',
        'LICENSE',
        '*.sublime-project',
        'build/**',
        'tests/**',
        'libs/**'
    ],
    input: 'pages/**/(*.html)',
    output: {
        basePath: 'assets',
        pagePath: '',
        url: '',
        domain: '',
    },
    //模块化设置
    amd: {
        paths: {},
        shim: {},
        packages: [],
        ignore: ['libs/requirejs/require.js','mock/**'], //不模块化组件
        tab: 4
    },
    //合并设置
    package: {
        output: 'pkg',
        vendor: {},
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

function isUndefined(obj){
    return typeof obj === 'undefined';
}

/**
 * 目前有三个模式：
 * 
 * fis release              合并压缩文件（发布版本）
 * fis release debug        不会打包和压缩文件（本地测试版本）
 * fis release qa           部署到测试服务器（线上测试版本）
 *
 */

module.exports = function(fis, opts){

    const conf = {
        input: opts.input || 'pages/**/(*.html)',
        ignore: [].concat(defaults.ignore, opts.ignore ? opts.ignore : []),
        output: Object.assign({ default: defaults.output, debug: defaults.output, qa: defaults.output }, opts.output),
        amd: Object.assign(defaults.amd, opts.amd),
        package: Object.assign(defaults.package, opts.package),
        template: Object.assign(defaults.template, opts.template),
        push: Object.assign(defaults.push, opts.push),
    };

    const useHash = isUndefined(conf.useHash) ? true : conf.useHash;

    fis.set('project.ignore', [].concat(fis.get('project.ignore'), conf.ignore));

    /** default setting */

    //设定所有文件默认产出目录
    const defaultConf = conf.output.default;
    fis.match('**',{
        release: path.posix.join(defaultConf.basePath, '$0'),
        domain: defaultConf.domain,
        url: path.posix.join('/', defaultConf.basePath, defaultConf.url) + '$&' //改变引用地址
    });


    //设定产出页面目录
    fis.match(conf.input, {
        release: path.posix.join(defaultConf.pagePath, "$1")
    });


    //所有tpl模版文件生成到临时目录
    Object.keys(conf.template.output).forEach(function(file){
        const filepath = conf.template.output[file];

        fis.match(file, {
            release: path.posix.join(defaultConf.pagePath, filepath , "$&")
        });
    });

    let jsConf = {
            isMod: true,
            useHash: true,
            useSameNameRequire: true,
            optimizer: fis.plugin('uglify-js')
        },
        cssConf = {
            useHash: useHash,
            useSprite: true,
            optimizer: fis.plugin('clean-css')
        },
        autoprefixer = {
            "browsers":  ["> 5%", "last 2 versions"],
            "cascade": true,
            "flexboxfixer": true,
            "gradientfixer": true
        },
        scssConf = {
            useSprite: true,
            rExt: 'css', // from .scss to .css
            parser: fis.plugin('node-sass', {
                //fis-parser-sass option
                //if you want to use outputStyle option, you must install fis-parser-sass2 !
                outputStyle: 'expanded'
            }),
            postprocessor : fis.plugin("autoprefixer", autoprefixer),
            optimizer: fis.plugin('clean-css')
        };

    //对所有js文件进行如下处理
    //模块化包装(define包裹)
    //文件名字混合hash值
    //同名资源关联加载(这里指和js同名的css文件)
    //压缩处理
    fis.match('**.js', jsConf);
    fis.set('project.fileType.text', 'es');
    fis.match('**.es',  Object.assign({}, jsConf, {
        parser: fis.plugin('babel-6.x')
    }));

    //对所有css文件进行如下处理
    //文件名字混合hash值
    //压缩处理
    fis.match('**.css', cssConf);
    //对所有scss文件进行如下处理
    //重命名为'css'
    //使用node-sass预编译scss文件
    //使用autoprefixer对编译后对文件进行兼容处理
    //压缩处理
    fis.match('**.scss', scssConf);

    //vue文件配置
    fis.set('project.fileType.text', 'vue');
    fis.match('**.vue', {
        isMod: true,
        rExt: 'js',
        useSameNameRequire: true,
        parser: fis.plugin('vue-component')
    });
    fis.match('**.vue:js', {
        parser: fis.plugin('babel-6.x')
    });
    fis.match('**.vue:css', cssConf);
    fis.match('**.vue:scss', scssConf);


    //图片处理
    fis.match('**.png', {
      // fis-optimizer-png-compressor 插件进行压缩，已内置
      optimizer: fis.plugin('png-compressor')
    });


    /** amd setting */

    const amd = { 
        paths: Object.assign({}, conf.amd.paths), 
        shim: Object.assign({}, conf.amd.shim),
        packages: [].concat(utils.modules(require('../bower.json')), conf.amd.packages),
        ignore: conf.amd.ignore
    };

    amd.ignore.forEach(function(module_name){
        let path = typeof amd.paths[module_name] === 'undefined' ? module_name : amd.paths[module_name];
        if(path.indexOf('.js') === -1) path += '.js';
        fis.match(path, {
            isMod: false 
        }); 
    });

    /**
     * 依赖fis3-hook-amd
     * npm install [-g] fis3-hook-amd
     */
    //使用amd方式进行模块化处理
    //使用后将按amd规范对js进行模块化包装(define包裹); js必须开启isMod。
    fis.hook('amd', {
        //设置别名，使常用模块能快速使用
        paths: amd.paths,
        packages: amd.packages,
        //多用于不改目标文件，指定其依赖和暴露内容的效果。
        shim: amd.shim,
        tab: conf.amd.tab || 4, //设定内容缩进的空格数
        extList: ['.js', '.coffee', '.jsx', '.es6', '.es', '.vue']
    });


    /** package setting */

    /**
     * 依赖fis3-postpackager-loader
     * npm install [-g] fis3-postpackager-loader
     */
    //根据js的依赖关系进行分包、压缩、打包处理
    //如后端(jsp、asp、php)需要处理加载可分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    
    const pkg = utils.packages(amd, conf.package);

    fis.match('::package', {
        postpackager: fis.plugin('loader', {
            obtainScript: false,
            obtainStyle: true,
            useInlineMap: false,
            resourceType: 'amd',
            allInOne: {
                includeAsyncs: true, //合并所有异步文件
                ignore: [].concat(pkg.ignore)
            }
        }),
        packager: fis.plugin('deps-pack', pkg.packages),
        //图片合并处理
        spriter: fis.plugin('csssprites')
    });

    //打包文件也不需要模块化、文件名字混合hash值处理
    fis.match(path.posix.join(conf.package.output, '**'), {
        isMod: false,
        useHash: useHash
    });


    /**+++++++++++ debug 模式的设定 +++++++++++**/
    //debug模式下的js、scss、css不进行压缩，文件名不添加hash值，文件不进行打包压缩
    //debug模式产出到本地服务器进行测试
    
    const debugConf = conf.output.debug;
    fis.media('debug').match('**',{
        release: path.posix.join(debugConf.basePath, '$0'),
        domain: debugConf.domain,
        url: path.posix.join('/', debugConf.basePath, defaultConf.url) + '$&' //改变引用地址
    });

    //设定产出页面目录
    fis.media('debug').match(path.posix.join(conf.input), {
        release: path.posix.join(debugConf.pagePath, "$1")
    });

    fis.media('debug').match('**.{js,scss,css}',{
        useHash: false,
        optimizer: null,
        domain: ""
    });

    fis.media('debug').match('::package', {
        postpackager: fis.plugin('loader', {
            useInlineMap: true,
            allInOne: false
        }),
        packager: null
    });

    fis.media('debug').match('mock/(**.js)',{
        release: 'test/$1'
    });
    fis.media('debug').match('mock/server.conf',{
        release: 'config/server.conf'
    });

    /**+++++++++++ qa 模式的设定 +++++++++++**/
    const qaConf = conf.output.qa;
    fis.media('qa').match('**',{
        release: path.posix.join(qaConf.basePath, '$0'),
        domain: qaConf.domain,
        url: path.posix.join('/', qaConf.basePath, defaultConf.url) + '$&' //改变引用地址
    });

    //部署到测试机
    fis.media('qa').match('*',{
        deploy: fis.plugin('http-push', {
            receiver: conf.push.receiver, //部署服务地址
            to: conf.push.dir //部署目录
        })
    });
};