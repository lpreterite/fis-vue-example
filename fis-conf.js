/**
 * 目前有三个模式：
 * 
 * fis release              打包压缩文件
 * fis release debug        不会打包和压缩文件
 * fis release publish      打包压缩文件并使用CDN替换
 *
 * 说明：
 * releasePath：生成后文件放置目录
 * url：页面访问时的地址
 * template: 生成后模板临时存放目录
 */

var releasePath = "assets/",
    url = "",
    template = ".template/"

/**
 * all js setting
 */
fis.match('**.js',{
    release: releasePath + "$0",
    optimizer: fis.plugin('uglify-js'),
    isMod: true,
    useHash: true
})

/**
 * all css setting
 */
fis.match('**.css',{
    useHash: true,
    optimizer: fis.plugin('clean-css')
})
fis.match('**.scss',{
    rExt: '.css', // from .scss to .css
    preprocessor : fis.plugin("autoprefixer",{
       "browsers": ["last 5 versions"],
       "cascade": true
    }),
    parser: fis.plugin('node-sass', {
        //fis-parser-sass option
        //if you want to use outputStyle option, you must install fis-parser-sass2 !
        outputStyle: 'expanded'
    }),
    optimizer: fis.plugin('clean-css')
})


/**
 * all template setting
 */
fis.match('**.tpl', {
    release: template + "$&"
})

/**
 * exclude js use mode and hash
 */
fis.match('libs/**', {
    useHash: false
})
fis.match('libs/requirejs/**', {
    isMod: false
})
fis.match('libs/plupload/**', {
    isMod: false
})
fis.match('pkg/**', {
    isMod: false,
    useHash: false
})


//产出页面设置
fis.match('**.php',{ 
    loaderLang: 'html' //让其他后续也能按html方式进行资源加载。
})

//临时测试接口
fis.match('/test/**', {
    release: '$0',
    isMod: false,
    useHash: false,
    useSameNameRequire: false
});

fis.match('/test/server.conf', {
  release: '/config/server.conf'
});

//依赖处理
// npm install [-g] fis3-hook-amd
fis.hook('amd', {
    forwardDeclaration: true,
    paths: {
        'require': "/libs/requirejs/require",
        'underscore': "/libs/underscore/underscore",
        'backbone': "/libs/backbone/backbone",
        'localStorage': "/libs/backbone.localStorage/backbone.localStorage",
        'jquery': "/libs/jquery/jquery",
        'jquery.extend': "/libs/jquery.extend/jquery.extend",
        'moment': "/libs/moment/moment",
        'icheck': "/libs/icheck/icheck",
        'vue': "/libs/vue/vue",
        'vue-router': "/libs/vue-router/vue-router",
        'cookies': "/libs/js-cookie/js-cookie",
        'config': "config/config"
    },
    shim: {
        "app": ['jquery'],
        "libs/bootstrap/bootstrap": ['jquery','jquery.extend']
    },
    tab: 4
})

//产出依赖并定位到html页面上
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        obtainScript: false,
        obtainStyle: true,
        allInOne: {
            css: "pkg/${filepath}_aio.css",
            js: "pkg/${filepath}_aio.js",
            /**
             * 开启后才能打包(allInOne)，然后这里需要注意几点
             * 1. 开启后useInlineMap将会失效
             * 2. libs(外部引用的包)也需要使用“组件化包装”，开启isMod自动包装！
             */
            includeAsyncs: false 
        },
        useInlineMap: true, // 资源映射表内嵌
        resoucemap: "/pkg/${filepath}_aio_map.js"
    }),
    spriter: fis.plugin('csssprites')
})


//npm install [-g] fis3-parser-utc
// fis.match('**.tpl', {
//     parser: fis.plugin('utc'),
//     rExt: "js",
//     useHash: true,
//     optimizer: fis.plugin('uglify-js')
// })

fis.media('debug').match('**.{js,scss,css}',{
    useHash: false,
    optimizer: null
})
fis.media('debug').match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        allInOne: false //true会将所有js按页面打包到一个js文件内
    })
})



/**
 * 打包代码到发布的仓库
 * fis3 release publish -d ../pet-manager-frontend-release
 */
var cdnList = {
        "libs/jquery/dist/jquery.js": "jquery/2.2.1/jquery.min.js",
        "libs/vue/dist/vue.js": "vue/1.0.17/vue.min.js",
        "libs/moment/moment.js": "moment.js/2.11.2/moment.min.js",
        "libs/swiper/dist/js/swiper.js": "Swiper/3.3.1/js/swiper.min.js",
        "libs/bluebird/js/browser/bluebird.js": "bluebird/3.3.3/bluebird.min.js",
        "libs/requirejs/require.js": "require.js/2.1.22/require.min.js",
        "libs/js-cookie/src/js.cookie.js": "js-cookie/2.1.0/js.cookie.min.js",
    },
    keys = Object.keys(cdnList)

for (var i = 0; i < keys.length; i++) {
    fis.media('publish').match(keys[i], {
        domain: 'http://cdn.bootcss.com/',
        url: cdnList[keys[i]]
    })
}
fis.media('publish').match('::package',{
    postpackager: fis.plugin('loader', {
        useInlineMap: false
    })
})
fis.media('publish').match('/test/**',{
    release: false
})