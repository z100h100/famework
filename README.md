# 统一框架 project

1. 这个项目是作为vue项目开发的一个公用项目模板
2. 这里包括了项目开发所需准备的初步准备工作
3. 把开发人员在准备要开始一个项目时，只要从git上把该项目模板下载到本地
4. 然后复制一份并重命名为自己即将要着手对项目名称后，开始页面和逻辑部分的开发即可

## 安装步骤 ##

1. 把模板从svn上下载到本地
2. 复制一份该项目，项目名称对应自己正在开发的项目名
3. 进入新项目目录
4. npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

1. 开启服务器，浏览器访问 http://localhost:8080
2. 本地开发时，端口号可从 vue.config.js中修改
3. npm run serve

## 构建生产 ##

1. 执行构建命令，生成的dist文件夹放在服务器下即可访问
2. npm run build

``` 注
1 国内来说npm会比较慢，有时还需要翻墙，故建议安装国内的淘宝镜像cnpm :
2 npm install -g cnpm --registry=https://registry.npm.taobao.org
```


## 技术栈

> vue-cli@3.0 + vue2 + vuex + vue-router + axios + webpack4 + ES5/6/7 + scss

```` 注
# 因为有可能会用到ES6/7故node版本建议使用6.0以上
````


## 目录结构
```
├── src                                         // 源码目录
│   ├── assets                                  // 项目所需公共静态资源，如图片，css等
│   │   ├── images                              // 项目公共图片资源
│   │   └── scss                                // 项目公共样式资源
│   │       └── common.scss                     // 公共样式配置文件
│   ├── apis                                  // 项目公共js资源
│   │   └── ajax                                // ajax组件
│   │       ├── ajax.js                         // 根据axios封装出来的Ajax
│   │       └── index.js                       // axios的再封装
│   ├── components                              // 公共组件
│   │   ├── Breadcrumb
│   │   │   └── index.vue                      // 底部公共组件
│   │   └── Hamburger
│   │       └── index.vue                      // 头部公共组件
│   ├── views                                      // 头部公共组件
│   │   ├── layout
│   │   │   └── layout.vue                   // 项目页面总布局
│   │   └── login
│   │       └── index.vue                       // 登录页
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── store                                   // vuex的状态管理
│   │   ├── getters.js                          // 配置getters
│   │   ├── modules                             // store模块文件夹
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── store.js                            // 引用vuex，创建store
│   ├── App.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件，加载各种公共组件
├── public                                      // 项目公共静态资源，如图片等
│   ├──images                                   // 项目公共图片资源
│   └──index.html                               // 入口html文件
```
