/**
 * 目前有三个模式：
 * 
 * fis release              打包压缩文件并使用CDN替换
 * fis release debug        不会打包和压缩文件
 * fis release qa           部署到测试服务器
 *
 * 目录参数说明：
 * asset_dir: 生成后文件放置目录
 * template_dir: 页面存放目录
 * template_temp_dir: 组件模板临时存放目录
 * url: 静态资源访问地址
 * push_receiver: 部署服务地址（用于推送文件）
 * push_dir: 部署目录
 */

var asset_dir = "/assets",
    template_dir = "",
    template_temp_dir = ".template/",
    url = asset_dir,
    push_receiver = "",
    push_dir = ""

//require.config的预设定
var amd_paths = { //使常用模块设定别名
        "config": "config/config",
        "cookies": "libs/js-cookie/src/js.cookie",
        "require": "libs/requirejs/require",
        "vue": "libs/vue/dist/vue",
        "vue-router": "libs/vue-router/dist/vue-router",
        "jquery": "libs/jquery/dist/jquery",
        "promise": "libs/bluebird/js/browser/bluebird"
    },
    amd_shim = { //多用于不改目标文件，指定其依赖和暴露内容的效果。
        "app": ['jquery']
    }

//cdn设定
var cdn_domain = "http://cdn.bootcss.com/", //cdn域名
    cdn_list = { //cdn替换列表
        "libs/jquery/dist/jquery.js": "jquery/2.2.1/jquery.min.js",
        "libs/vue/dist/vue.js": "vue/1.0.17/vue.min.js",
        "libs/bluebird/js/browser/bluebird.js": "bluebird/3.3.3/bluebird.min.js",
        "libs/requirejs/require.js": "require.js/2.1.22/require.min.js",
        "libs/js-cookie/src/js.cookie.js": "js-cookie/2.1.0/js.cookie.min.js",
    }

/**
 * 默认设置
 * 对所有文件设定生成目录处理，并添加对js、css、scss文件进行预编译、压缩等处理
 */
/**=================默认设置=================**/

//设定所有文件默认产出目录
fis.match('**',{
    release: asset_dir + '/$0',
    url: url + '$&' //改变引用地址
})

//设定产出页面目录
fis.match('**.{php,html}',{
    release: template_dir + "$&",
    // loaderLang: 'html' //新版本已修复此问题，让非静态页面也能按html方式进行资源加载。
})

//所有tpl模版文件生成到临时目录
fis.match('**.tpl', {
    release: template_dir + template_temp_dir + "$&"
})

//对所有js文件进行如下处理
//模块化包装(define包裹)
//文件名字混合hash值
//同名资源关联加载(这里指和js同名的css文件)
//压缩处理
fis.match('**.js',{
    isMod: true,
    useHash: true,
    useSameNameRequire: true,
    optimizer: fis.plugin('uglify-js')
})

//对所有css文件进行如下处理
//文件名字混合hash值
//压缩处理
fis.match('**.css',{
    useHash: true,
    optimizer: fis.plugin('clean-css')
})
//对所有scss文件进行如下处理
//重命名为'css'
//使用node-sass预编译scss文件
//使用autoprefixer对编译后对文件进行兼容处理
//压缩处理
fis.match('**.scss',{
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-sass option
        //if you want to use outputStyle option, you must install fis-parser-sass2 !
        outputStyle: 'expanded'
    }),
    preprocessor : fis.plugin("autoprefixer",{
       "browsers": ["last 5 versions"],
       "cascade": true
    }),
    optimizer: fis.plugin('clean-css')
})

/**
 * 依赖fis3-hook-amd
 * npm install [-g] fis3-hook-amd
 */
//使用amd方式进行模块化处理
//使用后将按amd规范对js进行模块化包装(define包裹); js必须开启isMod。
fis.hook('amd', {
    //设置别名，使常用模块能快速使用
    paths: amd_paths,
    //多用于不改目标文件，指定其依赖和暴露内容的效果。
    shim: amd_shim,
    tab: 4 //设定内容缩进的空格数
})

/**
 * 依赖fis3-postpackager-loader
 * npm install [-g] fis3-postpackager-loader
 */
//根据js的依赖关系进行分包、压缩、打包处理
//如后端(jsp、asp、php)需要处理加载可分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        obtainScript: false,
        obtainStyle: true,
        allInOne: {
            /**
             * 开启后才能打包(allInOne)，然后这里需要注意几点
             * 1. 开启后useInlineMap将会失效
             * 2. libs(外部引用的包)也需要使用“模块化包装(define包裹)”，开启isMod自动包装！
             */
            includeAsyncs: false,
            //设定生成文件规则
            css: "pkg/${filepath}_aio.css",
            js: "pkg/${filepath}_aio.js"
        },
        useInlineMap: false, // 资源映射表内嵌到页面
        resoucemap: "/pkg/${filepath}_aio_map.js"
    }),
    //图片合并处理
    spriter: fis.plugin('csssprites')
})

//使用cdn替换部分本地模块
var keys = Object.keys(cdn_list)
for (var i = 0; i < keys.length; i++) {
    fis.match(keys[i], {
        domain: cdn_domain,
        url: cdn_list[keys[i]]
    })
}


//部署环境不产出测试用例
fis.match('tests/**',{
    release: false
})
fis.match('tests/mock/**',{
    isMod: false
})

//降低更新频率，(第三方库更新频率比较低）
fis.match('libs/**', {
    useHash: false
})
//requirejs不需要模块化包裹
fis.match('libs/requirejs/**', {
    isMod: false
})
//打包文件也不需要模块化、文件名字混合hash值处理
fis.match('pkg/**', {
    isMod: false,
    useHash: false
})


/**+++++++++++ debug 模式的设定 +++++++++++**/
//debug模式下的js、scss、css不进行压缩，文件名不添加hash值，文件不进行打包压缩
//debug模式产出到本地服务器进行测试
fis.media('debug').match('**.{js,scss,css}',{
    useHash: false,
    optimizer: null
})
fis.media('debug').match('::package', {
    postpackager: fis.plugin('loader', {
        useInlineMap: true,
        allInOne: false
    })
})

//debug模式下产出测试用例
fis.media('debug').match('tests/**',{
    release: asset_dir + '/$0'
})
fis.media('debug').match('tests/(*.html)',{
    release: template_dir+'$1'
})
fis.media('debug').match('tests/mock/(**.js)',{
    release: 'test/$1'
})
fis.media('debug').match('tests/mock/server.conf',{
    release: 'config/server.conf'
})

/**+++++++++++ qa 模式的设定 +++++++++++**/
//部署到测试机
fis.media('qa').match('*',{
    deploy: fis.plugin('http-push', {
        receiver: push_receiver, //部署服务地址
        to: push_dir //部署目录
    })
});

/**=================自定义=================**/

    
