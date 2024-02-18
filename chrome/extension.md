- 查看源码

```tex
1、chrome://extensions/ 进入插件管理页，勾选开发者模式，找到对应插件的 id;
2、通过 chrome://version/ 可以查看浏览器的信息，里面有浏览器所在的路径；
3、进入文件夹，然后找到对应 id 的文件夹，里面就是了。
```

- 调试

```tex
1、首先是content.js，因为这部分的代码是在manifest.json声明的，当访问的页面地址匹配我们写的正则时，才会进行注入，比如我们写的matches是https://*/*，即只要是https域名就会执行我们的脚本；（找一个https的地址
打开控制台，找到sources下的content scripts
找到我们插件的名称Debuuger Demo
其中的content.js就是了）
2、其次是background.js，我们回到安装插件的页面（在地址栏输入chrome://extensions）（点击背景页）；
3、popup.js直接点击右键，审查弹出内容。
```

