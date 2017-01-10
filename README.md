#fis-vue-example

结合fis与vue的手脚架例子，同时提供一些实际开发时使用比较广泛的功能实现。


##快速开始

安装依赖
```
$ npm install
```

本地部署并监控文件
```
$ npm run dev
```

发布
```
$ npm run publish
```

预览本地效果
```
$ npm run server
```


部署至测试服务器并监控文件
```
$ npm run qa
```
> 需要在测试机部署上传接收脚本（或者服务）
> [nodejs版本](https://github.com/fex-team/receiver)
> [php版本](https://github.com/fex-team/fis-command-release/blob/master/tools/receiver.php)



## 例子包含

1. 快速使用、部署和打包
2. 模拟数据接口
3. ~~测试用例~~
4. 组件化
5. 模块化
6. 标准化数据模型
7. 错误拦截与提示管理
8. 统一化信息提示
9. ~~上传例子~~
10. es6支持
11. vue支持

## 设置
封装了fis设置，只需修改参数便能达到需要的效果，当然理解fis原理是大前提。

### 简单设置
```
{
    output: {
        default: {
            basePath: 'assets', //静态资源输出目录
            pagePath: 'pages',  //页面文件输出目录
            test: false,        //输出测试目录
            url: '',            //访问地址，同fis设置的url
            domain: '',         //访问域，同fis设置的domain
        }
    }
}
```

### 区分本地调试与发布

output设置添加debug设置
```
{
    output: {
        default: {
            basePath: 'assets',
            pagePath: 'pages'
        },
        debug: {
            basePath: 'assets',
            pagePath: ''
        }
    }
}
```

生成本地测试代码(对应`output.default`规则)
```
$ npm run dev
```

生成部署代码(对应`output.debug`规则)
```
$ npm run publish
```

> 默认生成到`../release`目录下与项目同名


### 发布至线上测试服务器

output设置添加qa设置
```
{
    output: {
        default: {
            basePath: 'assets',
            pagePath: 'pages'
        },
        qa: {
            basePath: 'assets',
            pagePath: 'pages'
        }
    },
    //推送测试服务设置
    push: {
        receiver: '192.168.0.110',
        dir: '/www/fis-test'
    }
}
```

生成并推送到服务器
```
$ npm run qa
```

### 加载器设置
说明参照[fis3-hook-amd](https://github.com/fex-team/fis3-hook-amd)
```
{
    paths: {
        "config": "config/config",
    },
    packages: [{
        name: 'vue-animated-list',
        location: '/libs/vue-animated-list',
        main: 'vue-animated-list'
    }],
    shim: {
        "/pages/index/app": ['jquery']
    },
    tab: 4
}
```

#### 关于packages
目前已自动加载bower库中相应的资源，部分库比较杂乱，存在加载不到的情况需手动写上设置。

#### 关于shim
```
[ERROR] Cannot read property 'dirname' of undefined
```
如出现以上bug，请在shim的key最前加上 '/'，不然会当成已命名的包加载。

### 合并设置
合并规则按`vendor`下的`key`作合并后的文件名字，`value`是需要合并的文件，合并的内容是可自定义的。
```
{
    output: {...},
    amd: {...},
    package: {
        output: 'pkg',         //合并文件的目录
        vendor: {              //合并文件规则
            'vendor.js': [     //包含可使用库名字和文件路径
                'js-cookie',
                'vue',
                'vue-router',
                'vue-animated-list',
                'jquery',
                'promise',
            ],
            'config.js': ['config/config']
        }
    }
}
```

## 固定的目录结构

```
build/         fis设置目录
src/ 
├ config/      设置
├ libs/        外部库
├ utils/       扩展类
├ models/      数据模型
├ partials/    代码片段
├ pages/       视图
  └ index      页面目录(.html)
```

## 运行环境
```
node 4.5.0
npm 3.10.x
python 2.7.x
fis3 3.3.12以上

win系统还需 Microsoft Visual Studio 2010以上
linux系统需要 c++运行环境
```

### 环境安装细节
win下需要管理者权限
```
# 更新npm
sudo npm update -g npm

# 安装fis3
sudo npm install -g fis3
```

## 安装依赖
命令行进入项目目录根
```
npm i
```

### 安装其他问题
假如运行出错，或很久不动，可能是node-sass安装问题，使用`ctrl+c`停止命令，然后重装。
```
npm rebuild node-sass
```
