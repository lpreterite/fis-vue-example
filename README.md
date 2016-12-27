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



##例子包含

1. 快速使用、部署和打包
2. 模拟数据接口
3. 测试用例
4. 组件化
5. 模块化
6. 标准化数据模型
7. 错误拦截与提示管理
8. 统一化信息提示
~~9. 上传例子~~


##固定的目录结构

```
components/ 组件
config/     配置
libs/       外部库
utils/      扩展类
models/     数据模型
partials/   代码片段
views/      视图
├ page      页面目录(.html)
└ template  模板目录(.tpl)


tests/       测试目录
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
