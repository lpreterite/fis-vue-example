#fis-vue-example

结合fis与vue的手脚架例子，同时提供一些实际开发时使用比较广泛的功能实现。


##快速开始

安装支持
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



##例子包含

1. 快速使用、部署和打包
2. 模拟数据接口
3. 测试用例
4. 组件化
5. 模块化
6. 标准化数据模型
7. 标准化错误提示
8. 标准化对象模型
9. 标准化目录结构
10. 统一化信息提示
11. 上传例子


##目录结构

```
components/ 组件
config/     配置
libs/       外部库
utils/      扩展类
models/     数据模型
partials/   代码片段
views/      视图

tests/      测试用例
└ apis/   模拟数据接口
```


##例子是基于
```
//构建
{
    "fis3": "^3.3.16",
    "fis-parser-node-sass": "^0.1.4",
    "fis3-hook-amd": "^0.1.1",
    "fis3-postpackager-loader": "^1.3.2",
    "fis3-preprocessor-autoprefixer": "^0.1.0"
}

//前端库
{
    "jquery": "2.2.0",
    "bluebird": "^3.4.1",
    "vue": "^1.0.25",
    "normalize-css": "^4.1.1",
    "vue-router": "^0.7.13",
    "js-cookie": "^2.1.2",
    "requirejs": "^2.2.0",
    "jquery-store": "^1.0.0"
}
```
