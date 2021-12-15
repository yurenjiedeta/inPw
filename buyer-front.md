- 关于 link 标签

```javascript
//旧版的link标签一般用来引入样式
//只能出现于 head 部分，不限制出现次数
//HTML5出现了更强大的功能，通过 rel 来设置更多的文档与链接
```

- 关于meta标签

```javascript
//一般的meta标签，通过设置 name 值来产生效果
/*
name的值为 viewport的时候:viewport设置的时候，是把手机的页面置于一个虚拟的“窗口”。
content的值：xxx=xx，多值的情况下用逗号隔开
with：设置 viewport 的宽度；
height：viewport 的高度
user-scalable：是否允许缩放
minimum-scale：允许缩放的最小比例
maximum-scale：允许缩放的最大比例
target-densitydpi:设置像素点
*/

/*
name="format-detection"
content="telephone=no" //忽略页面中的数字为电话号码
content="email=no" //忽略页面中的邮箱格式为邮箱
*/

/*
name="author"
contect="name,xxx@163.com" //设置作者姓名及联系方式
*/

/*
<meta charset="utf-8"/> //声明文档使用的字符编码
*/

/*
<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
*/

/*
<!-- 搜索引擎抓取 -->
<meta name="robots" content="index,follow"/>
*/

/*
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
*/

/*
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 不让百度转码 -->
    <meta http-equiv="Cache-Control" content="no-siteapp" />

    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true">

    <!-- 微软的老式浏览器 -->
    <meta name="MobileOptimized" content="320">

    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->

    <meta name="x5-orientation" content="portrait">
    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- QQ强制全屏 -->

    <meta name="x5-fullscreen" content="true">
    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
   

    <!-- 添加 RSS 订阅 -->
    <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml"/>

    <!-- 添加 favicon icon -->
    <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>


    <!-- sns 社交标签 begin -->
        <!-- 参考微博API -->
        <meta property="og:type" content="类型" />
        <meta property="og:url" content="URL地址" />
        <meta property="og:title" content="标题" />
        <meta property="og:image" content="图片" />
        <meta property="og:description" content="描述" />
    <!-- sns 社交标签 end -->


    <!-- Windows 8 磁贴颜色 -->
    <meta name="msapplication-TileColor" content="#000"/>
    <!-- Windows 8 磁贴图标 -->
    <meta name="msapplication-TileImage" content="icon.png"/>

     <!-- windows phone 点击无高光 -->
    <meta name="msapplication-tap-highlight" content="no">
*/
```

- meta常用例子

```html
<!-- 开启对web app程序的支持，其实意思就是删除默认的苹果工具栏和菜单栏，开启全屏显示 -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!--  改变顶部状态条的颜色 默认值为 default（白色），可以定为 black（黑色）和 black-translucent（灰色半透明） -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- 设置桌面图标的标题 -->
<meta name="apple-mobile-web-app-title" content="标题">

<!-- 设置启动画面 -->
<link rel="apple-touch-startup-image" href="Startup.png" />



<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

<!-- 指示IE以目前可用的最高模式显示内容 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
<!-- 指示IE使用 <!DOCTYPE> 指令确定如何呈现内容。标准模式指令以IE7 标准模式显示，而 Quirks 模式指令以 IE5 模式显示。 -->
<meta http-equiv="X-UA-Compatible" content="IE=Emulate IE7" />


<!-- SEO相关 -->
<!-- 页面描述 -->
<meta name="description" content="不超过150个字符" />
<!-- 页面关键词 -->
<meta name="keywords" content="html5, css3, 关键字"/>
<!-- 定义网页作者 -->
<meta name="author" content="魔法小栈" />
<!-- 定义网页搜索引擎索引方式，robotterms是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。 -->
<meta name="robots" content="index,follow" />
```

- 正则表达式的exec和test方法

```js
/*test() 和 exec() (或者组合使用),一样，在相同的全局正则表达式实例上多次调用test将会越过之前的匹配。*/
/*
同样的字符串由 regex.lastIndex来进位
*/
```

