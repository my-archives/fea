开发计划
========
Front-end Architecture <br/>
项目名称：FEA

## 目标
构建一个可扩展的 JavaScript 应用程序、web application。
不仅仅适用于前端应用程序的开发，还可以用在后端(nodejs)。

## 相关文章
* [Scalable JavaScript Application Architecture](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture)

## 计划

### ***fea.js***
搭建一个由 Module、Sandbox、AppCore 组成的类库 fea.js，这个类库不依赖其他类库(jQuery,YUI,kissy)。
它是整个页面，乃至整个网站的应用的管理中心。

#### fea.js 功能：
    * module: 一个页面可以细分出很多功能模块，每个功能模块占据页面的一块区域。
        模块是一组独立功能的集合，它们之间没有直接依赖关系。
        1. 每一个模块都有自己的 sandbox
        2. 只调用自己或自己 sandbox 中的方法
        3. 不访问 sandbox 之外的 DOM 元素
        4. 不访问非原生的全局对象
        5. 所有的东西只能从 sandbox 中获取
        6. 不创建全局对象
        7. 不直接引用其他模块
    * sandbox: 用来降低 module 间耦合度，与 module、application core 进行交互的接口，
        是 module 与 application core 之间的桥梁。
        1. 接口应该是可信赖
        2. 决定一个 moduel 可以访问架构的哪些部分
        3. 将 module 的请求转化为 application core 的动作
        4. 广播、观察中心，收集 module messages，汇总给 application core，
            再由 application core 处理之后发给 sandbox，sandbox 最后分发给各个 module 。
    * application core: 页面的管理中心，管理页面应用
        1. 控制 module 的初始化、注销
        2. 允许 module 间进行松耦合的交互
        3. 进行错误处理
        4. 要有可扩展性
        5. **与 base library 进行交互，module、sandbox 不关心 Base library 使用什么库**

#### 架构知识点：
    * 只有 base library 知道使用什么浏览器
    * 只有 application core 知道使用哪个 base library
    * 只有 sandbox 知道哪个 application core 正在被使用
    * module 只需要知道 sandbox 是否存在

#### 设计模式/思路：
    * 强沙箱设计
    * 广播模式 + 观察者模式
    * AOP模式

### ***模拟实际产品，对 fea.js 进行测试（不依赖其他类库）***
### ***fea.js 结合 jquery，kissy，yui 进行测试***
### ***对具体页面进行模拟重构***
    * url 重新设计、定义
    * 实现对页面 history 进行监听、控制(hashChange/iframe)
    * 实现对前端模板化，后台只返回数据(json)
    * 实现 module 分块加载、渲染(BigPipe)
    * 利用 base library，搭建一个适合我们自己的组建库
    * 前端 js、css 可以按需加载、异步加载、模块化加载
