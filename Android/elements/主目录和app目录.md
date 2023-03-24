1. 左侧项目列表顶部有帅选的下拉，不同的下拉有不同的表现；
2. 函数代码说明：

```kotlin
// 在 Kotlin 程序中，main() 函数是 Kotlin 编译器在代码中开始编译的特定位置；在 Android 应用中，则是由 onCreate() 函数来担任这个角色。
```

- 更新文本

```kotlin
// 任何标有 @Composable 注解的函数都可通过 setContent() 函数或其他可组合函数进行调用。
/**
@Composable 函数名称采用首字母大写形式。
需在该函数前面添加 @Composable 注解。
@Composable 函数无法返回任何内容。
*/
```

- Android Studio的升级方式

```tex
Settings >  “Appearance & Behavior > System Settings > Updates”
```

- Android项目目录说明

```tex
1、\.idea \build 两个目录：.idea/目录和build/目录是由你的项目中的其他文件生成的。
2、\app :app/目录包含构建你的应用程序所需的文件；
3、\build 用来包含生成的 app 文件；
4、\build.gradle 文件： 用来表示如何构建 app ；
5、\External \Libraries 它是用来存放库文件的，MainActivity 类的依赖就基于了 `External Libraries`，`External Libraries` 的大多数库文件都来源于 `Google 的 Android SDK`，一些来自于其他开发者，如： `JetBrains 的 Kotlin` 库支持；
6、\Scratches \and \Consoles目录： 该目录可以创建 “临时文件” ，用于注释或者测试实际项目代码范围之外的编程语言语法。
```

- `app`目录说明

```tex
1、\src app/src目录： 该目录是项目的 “源码集”，它的不同目录，有不同作用
 1-1、 \src/main目录：用来构建 app 的所有源代码；
 1-2、 \src/res目录： 提供资源，如 images 、 icons 、布局样式等；
 1-3、 \src/AndroidManifest.xml 是应用程序的主要目录；
2、\androidTest app/android目录： 用来测试 app 的代码，测试代码在安卓机器上运行；
3、\test app/test目录： 用来测试的，不过是在 JVM 上运行；
```

