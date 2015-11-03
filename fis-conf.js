fis.match('**.js',{
    release: "assets/$0",
    optimizer: fis.plugin('uglify-js'),
    isMod: true,
    useHash: true
})
fis.match('{components,views}/**', {
    useSameNameRequire: true
})


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
        allInOne: true, //各类资源需要按需加载的
        useInlineMap: false // 资源映射表内嵌
    }),
    spriter: fis.plugin('csssprites')
})


//npm install [-g] fis3-parser-utc
fis.match('**.tpl', {
    //parser: fis.plugin('utc'),
    // rExt: "js",
    useHash: true,
    // optimizer: fis.plugin('uglify-js')
})

fis.media('debug').match("**.{tpl,js}", {
    useHash: false,
    optimizer: false
})
fis.media('debug').match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        allInOne: true //各类资源需要按需加载的
    })
})
