'use strict';

exports.packages = function(modules, options){
    const pkgPath = options.output || 'pkg';
    const vendor = options.vendor || {};
    const ignore = options.ignore || [];

    // js合并配置
    let packages = {}; //根据页面合并的文件

    //添加共有组件
    Object.keys(vendor).forEach(function(filename){
        vendor[filename].map(function(filePath){
            return typeof modules[filePath] ? modules[filePath] : filePath;
        });

        packages[pkgPath+'/vendor/'+filename] = vendor[filename];

        //添加至不合并文件中
        ignore.concat(vendor[filename]);
    });

    //添加不合并文件
    Object.keys(packages).forEach(function(filePath){
        if(filePath.indexOf('vendor') > -1) return;
        packages[filePath] = packages[filePath].concat([].concat(ignore).map(function(path){ return '!'+path; }));
    });

    return {packages, ignore};
};


exports.modules = function(){

    return {};
};