'use strict';

const path = require('path');

exports.packages = function(amd, options){ 
    const pkgPath = options.output || 'pkg';
    const vendor = options.vendor || {};
    const ignore = options.ignore || [];
    let paths = {}; 

    //把amd.packages内的合并到paths 
    amd.packages.forEach(function(pkg){
        paths[pkg.name] = path.posix.join(pkg.location, pkg.main); 
    });
    paths = Object.assign(paths, amd.paths); 

    // js合并配置
    let packages = {}; //根据页面合并的文件

    //添加共有组件
    Object.keys(vendor).forEach(function(filename){
        let pkg = []; 
        vendor[filename].forEach(function(filePath){
            let result;
            let values = (obj)=> Object.keys(obj).map((key)=> obj[key]);

            if(Object.keys(paths).indexOf(filePath) > -1) result = paths[filePath];
            if(values(paths).indexOf(filePath) > -1) result = filePath;
            if(!!result) pkg.push(result);
        }); 
        packages[pkgPath+'/vendor/'+filename] = pkg;

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


exports.modules = function(pkg){
    const bower = { 
        package: (name)=> { 
            try{ 
                return require(`../src/libs/${name}/bower.json`); 
            }catch(e){ 
                return require(`../src/libs/${name}/.bower.json`); 
            } 
        }, 
        location: (name)=> `/libs/${name}` 
    }; 
 
    let result = [];

    Object.keys(pkg.dependencies).forEach(function(name){ 
        let _bower = bower.package(name); 
        let location = bower.location(name);
        if(typeof _bower.main === 'undefined') return;
        if(_bower.main.constructor === Array) return;
        result.push({ 
            name: name, 
            location: location, 
            main: _bower.main 
        });
    });

    return result;
};