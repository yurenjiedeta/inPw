- AndroidManifest.xml文件 

```tex
1、AndroidManifest.xml文件包含了你的软件包的信息。包括应用程序的组件，如活动、服务、广播接收器、内容提供者等。
2、它负责通过提供权限来保护应用程序访问任何受保护的部分。
3、它还声明了应用程序要使用的安卓api。
4、它列出了仪器化类。仪表类提供剖析和其他信息。这些信息在应用程序发布之前被删除。
```

- xml元素小说明

```tex
<manifest>  ---- 翻译为 清单

1\manifest是AndroidManifest.xm|文件的根元素。它有描述活动类的 package name 的 package 属性。

2\application <application>  ---  它是 manifest 的子元素，它包括命名空间的生命，包含 activity 等几个子元素。 `这个元素的常用属性是图标、标签、主题等。`

3\activity <activity> activity 必须在AndroidManifest.xm|文件中定义。它有许多属性，如标签、名称、主题和启动模式等。

4\intent-filter <intent-filter> 是活动的子元素，它描述了活动、服务或广播接收器可以响应的意图的类型。

5\action <action> 它为 意图过滤器(intent-filter) 添加一个动作。意向过滤器必须至少有一个 动作(<action>) 元素。

6\category <category> 它为意图过滤器添加了一个类别名称。
```

- activity

```tex
\activity activity是用于在手机界面和用户打交道的，多个 activity 会相互协助，主页、列表页、详情页 等等。
它有 7 个生命周期：
1、\onCreate 第一次创建的时候调用；
2、\onStart 当 activity 变得用户可见的时候调用；
3、\onResume 当用户和应用交互的时候会调用；
4、\onPause 当当前的 activity 被暂停，其他 activity 被 Resume 的时候会被调用；
5、\onStop 当 activity 不再看得见的时候；
6、\onRestart 当 stoping 后重新启动；
7、\onDestroy 当 activity 被系统销毁的时候调用；
```

