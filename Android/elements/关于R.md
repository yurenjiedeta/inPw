- R

```kotlin
setContentView(RR.layout.activity_main)
// setContentView() 告诉活动“这是要显示的 UI”。 R.layout.activity_main 值是对我们的 activity_main.xml 布局资源的引用。
```

- 使用`R.type.name`来引用资源

```tex
1、\type 是资源的类型（例如，布局），不包括目录名称上可能存在的任何后缀，如 color 等；
2、\name 是 “value” 资源的名称属性或其他类型资源的文件名，不包括文件扩展名;
```

- 资源管理

```tex
1、Android Studio 含有一个 `Resource Manager`按钮，位于`Project`下面的一个页签；
如下图，左上角有 `+` 来添加资源；
2、对于大项目来说，这个资源管理用于查找资源就很方便了
```

![res manager](./res manager.png)

- `AndroidManifest.xml`

```tex
1、该文件位于 src/main/ 文件夹中，该文件用来声明 `activity` 的内部内容，可以用来设置哪个 `activity` 来显示在 app 上；
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.commonsware.jetpack.hello">>
    <application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:supportsRtl="true"
    android:theme="@style/Theme.HelloWorld">
        <activity
        android:name=".MainActivity"
        android:exported="true">
            <intent-filter><intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter></intent-filter>
        </activity>
    </application>
</manifest>
```

```tex
1、\manifest manifest元素不会包含太多东西，只含有一些 xml 的命名空间等一两个属性;
2、\package manifest 元素的 package 属性：这表明构建工具将在哪里生成一些Java代码供你的应用程序使用。
```

- `Application`元素

```tex
1、安卓应用中，绝大多数的界面都和 Application 的子元素相关，例如 activity 元素；
2、为这些活动的行为提供默认值，例如使用什么主题来指定颜色等 (android:theme)；
3、提供有关其他应用程序使用的应用程序的详细信息（例如，设置），例如应用程序的显示名称 (android:label) 和图标（android:icon，有时是 android:roundIcon）；
4、配置整体应用程序行为，例如它是否处理从右到左语言（又名 RTL），例如阿拉伯语和希伯来语 (android:supportsRtl)；
5、配置应用程序如何与操作系统的其他部分集成的某些方面，例如它是否希望参与整个设备的备份（android:allowBackup）;
6、Application的子元素：Activity、Services、Content providers、Broadcast receivers;如下图
```

![app-sub-elm](./app-sub-elm.png)

- `Activity`元素

```xml
<activity
android:name=".MainActivity"
android:exported="true">>
    <intent-filter><intent-filter>
    <action<action android:name="android.intent.action.MAIN" />/>
    <category<category android:name="android.intent.category.LAUNCHER" />/>
    </intent-filter></intent-filter>
</activity>
```

```tex
1、\android:name android:name属性标明是对应这哪个的 Java 类 或哪个 Kotlin 类（Java含有 "."前缀），有时候，会使用完整名称，如 （com.commonsware.helloworld.MainActivity），有时候也会只有一个类名，如（MainActivity）；
2、会含有 <intent-filter> 元素，描述什么条件下会显示这个 activity ；
3、<intent-filter> 存在于 activity 下的子元素，会随着 activity 的启动而启动；
```

- `<service>, <provider>, <receiver>`特性

```tex
1、拥有一个属性 android:name ，用来识别该组件的实现代码；
2、或者都拥有一个 <intent-filter> 子元素；
3、或者都含有其他的元素。
```

- 安卓布局资源

```tex
1、安卓布局资源通过与 xml 绑定，构建工具会根据您的每个布局资源为您生成一个 Java 类。该类可以帮助你设置布局，还可以为您提供访问该布局中每个命名小部件的字段。通过 build.gradle 文件的属性：buildFeatures:{viewbinding:true} ；
2、在 simpleText、simpleButton 两个项目中，因为我们的布局资源是activity_main.xml，所以我们得到了ActivityMainBinding。然后，通过下面代码框来使用。
```

```java
import com.commonsware.jetpack.samplerj.simplebutton.databinding.ActivityMainBinding;// 根据打包原则而定下来的命名空间
package com.commonsware.jetpack.samplerj.simplebutton;

import android.os.Bundle;
import android.os.SystemClock;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private final long startTimeMs = SystemClock.elapsedRealtime();
  private ActivityMainBinding binding;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    binding = ActivityMainBinding.inflate(getLayoutInflater());// 我们通过调用静态inflate()方法获得一个ActivityMainBinding实例，传入从getLayoutInflater()获得的LayoutInflater 。
    setContentView(binding.getRoot());// binding.getRoot，它代表布局视图层次结构的根，该句等价于 setContentView(R.layout.activity_main)
    binding.showElapsed.setOnClickListener(v -> updateButton());// binding.showElapsed ，showElapsed 是 Button xml 中的 android:id 命名
    updateButton();
  }

  void updateButton() {
    long nowMs = SystemClock.elapsedRealtime();
    String caption = getString(R.string.elapsed, (nowMs - startTimeMs) / 1000);

    binding.showElapsed.setText(caption);
  }
}
// LayoutInflater知道如何获取布局资源并创建相应的 Java 对象来表示该资源中的所有小部件和容器。当我们之前调用setContentView(R.layout.activity_main)时，在幕后，setContentView()使用了LayoutInflater。 ActivityMainBinding还使用LayoutInflater。

// 鉴于ActivityMainBinding对象，我们可以调用setContentView()，这次不传入 R.layout.activity_main。我们已经使用ActivityMainBinding和LayoutInflater扩充了布局我们不需要做两次。
```

- 占位符

```xml
<resources>
  <string name="app_name">Jetpack: Button</string>
  <string name="elapsed">%d seconds since started!</string><!--- 此处的 %d 是动态填充文本时候用的占位符  String caption = getString(R.string.elapsed, (nowMs - startTimeMs) / 1000); --->
</resources>

```

- R 的出处

```kotlin
// 1、R类将由<manifest>元素中的package属性标识的Java 包中的构建工具代码生成。因此，对于包为 com.commonsware.jetpack.sampler.simplebutton 的项目， R的完全限定类名称为 com.commonsware.jetpack.sampler.simplebutton.R ；
// 2、Java 和 Kotlin 有一个共同的规则：你不需要导入与你所在的类在同一个包中的类。因此，在我们的项目中， MainActivity可以引用R而无需import语句，因为MainActivity和R在项目的包中（例如，com.commonsware.jetpack.sampler.simplebutton）。
// 3、如果使用类的包和 manifest 的包不同，则 R 就需要引入了。
// 4、如果 Android Studio 知道R是什么但无法识别某些特定资源，请尝试通过 Android Studio 主菜单中的 Build > Rebuild Project 手动构建项目。这会强制R重新生成，并且可能会解决您的问题。
```

