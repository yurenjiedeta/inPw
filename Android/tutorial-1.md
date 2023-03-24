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

- Fragment介绍(---翻译为 片段---)

```tex
\Fragment Fragment也被叫做 sub-activity ，Fragment拥有自己的布局和它自己的行为，有它自己的生命周期回调循环回调，它总被 嵌入到一个 \activity 中，通过它可以显示多个屏幕。
你可以可以在一个 activity 中添加或删除片段，而该 activity 正在运行。你可以在一个单一的 activity 中结合多个片段来构建一个多窗格的用户界面。

\Fragmeng 含有12个生命周期
1、\onAttach 当一旦被添加时调用；
2、\onCreate 用来初始化 Fragment;
3、\onCreateView Creates and returns view hieracrchy(没看懂)
4、\onActivityCreated 在 onCreate 方法调用完毕后调用；
5、\onViewStateRestored 
6、\onStart 可以见到的时候调用
7、\onResume 有交互的时候调用
8、\onPause 没交互的时候调用
9、\onStop 看不见的时候
10、\onDestroyView 
11、\onDestroy 当没有 state 状态的时候调用
12、\onDetach 当和 activity 没有关系的时候调用
```

- Services

```tex
\Services 服务是一种应用组件，可以在后台执行长期运行的操作，它不提供用户界面。一个服务可以处理网络事务，播放音乐，执行文件1/0，或与内容提供商互动等。

\Services 的种类
1、\Foreground  前台服务执行一些对用户来说很明显的操作。前台服务即使在用户不与应用程序互动时也会继续运行。音乐播放器、下载、音频应用程序都是一些前台服务的例子。
2、\Background 后台服务执行的操作不会被用户直接注意到。例如，如果一个应用程序使用一个服务来压缩其存储空间，这通常是一个后台服务。
3、\Bound 当一个应用程序组件通过调用bindService()与它绑定时，一个服务就被绑定了。绑定的服务只在另一个应用程序组件与它绑定时运行。在所有客户端解除对该服务的绑定之前，该服务不能被停止。多个组件可以同时绑定到该服务，但当它们全部解除绑定时，该服务就会被销毁。

\Services 的生命周期
1、\onStartCommand 当另一个组件（如活动）请求启动该服务时，系统通过调用startService()来调用该方法。当这个方法执行时，服务被启动并可以在后台无限期地运行。如果你实现了这一点，当服务的工作完成后，你有责任通过调用stopSelf()或stopService()停止服务。如果你只想提供绑定，你不需要实现这个方法。
2、\onBind 当另一个组件想要与服务绑定时（例如执行RPC），系统通过调用bindService()来调用该方法。在你对这个方法的实现中，你必须提供一个接口，让客户通过返回一个IBinder来与服务通信。你必须始终实现这个方法；然而，如果你不想允许绑定，你应该返回null。当另一个组件想与服务绑定时（比如执行RPC），系统通过调用bindService()来调用这个方法。在这个方法的实现中，你必须提供一个接口，客户端可以通过返回一个IBinder来与服务进行通信。你必须始终实现这个方法；然而，如果你不想允许绑定，你应该返回null。
3、\onCreate 系统调用这个方法来执行一次性的设置程序。程序（在它调用 onStartCommand()或onBind()之前）。如果服务已经在 运行，这个方法就不会被调用。
4、\onDestroy `\start
当服务不再被使用并被销毁时，系统会调用这个方法。你的服务应该实现这个方法以清理任何资源，如线程、注册的监听器或接收器。这是该服务收到的最后一次调用。

如果一个组件通过调用startService()来启动服务（这导致了对onStartCommand()的调用），服务会继续 

继续运行，直到它用stopSelf()停止自己或另一个组件通过调用stopService()停止它。

如果一个组件调用bindService()来创建服务，并且onStartCommand()没有被调用，那么该服务只在该组件与它绑定的时候运行。在服务与所有的客户端解除绑定后，系统会将其销毁。`\end
```

- Intent

```tex
\Intent 它是一个通信对象，能够使用它向 app 组件获取动作，你可以使用他来 [互动 activity 和 机器底层交互] ，比如 启动 activity ，显示一个网页，发送 SMS 邮件等。

Intent 有两种类型
1、\Explicit \Intent Explicit Intent指定了组件。在这种情况下，意图提供了要调用的外部类。

2、\Implicit \Intent 未指定特定组件，它提供信息给系统一作调用。 看下面代码块
```

```java
// \Explicit \Intent
Intent intent = new Intent(MainActivity.this, SecondActivity.class);
startActivity(intent);

// \Implicit \Intent
Intent intent = new Intent(Intent.ACTION_VIEW);
intent.setData(Uri.parse("https://www.google.com"));
startActivity(intent);
```

