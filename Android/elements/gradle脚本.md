- Gradle脚本----什么是 Gradle

```tex
1、\Gradle Gradle是一个用于构建软件的软件，其他开发环境的构建软件，如：make(C/c++),rake(Ruby),Ant(Java)，Maven(Java),etc;
2、用于如何创建以及何时创建应用；
3、在 Groovy 的顶部来进行构建，Groovy 是类似于 Kotlin 的运行在 JVM 上的语言；
4、build.gradle.kts，是用 Kotlin Gradle 脚本来运行的，与 build.gradle 文件不同；
```

- Gradle的其他使用

```tex
1、在 Android Studio 的上下文使用 Gradle 的时候，IDE 会为你获取 Gradle;
2、去官网下载 Gradle 的二进制包，https://gradle.org/install/
3、安装某个版本： sdk install gradle 8.0
4、Android Studio 等一般根目录下面都有一个 gradle/ 文件夹，叫做 `Gradle Wrapper`；
```

- Gradle Wrapper包含

```tex
1、批处理文件 (gradlew.bat) 或 shell 脚本 (gradlew)；
2、批处理文件和 shell 脚本使用的 JAR 文件（在 gradle/wrapper/ 目录中）；
3、gradle-wrapper.properties 文件（也在 gradle/wrapper/ 目录中）;
4、如果从 github 上下载项目或者导入其他的项目，如果项目包含 gradle/wrapper/gradle-wrapper.properties 文件，需要检查配置文件中的 distributionUrl 属性，该地址会涉及到安全性；
5、如果运行 gradlewrgradlew 命令，会使用 .gradle/ 中的 Gradle 的本地拷贝版本运行，如果没有副本，则会从 distributionUrl 地址；

```

- `Android Studio`使用`gradle-wrapper.properties`文件来标识去哪里下载 `Gradle`

```properties
#Sat Sep 11 19:07:11 EDT 2021
distributionBase=GRADLE_USER_HOME
distributionUrl=https\:\://services.gradle.org/distributions/gradle-7.0.2-bin.zip
distributionPath=wrapper/dists
zipStorePath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
```

- 检查 Gradle 文件

```tex
1、项目含有两个 build.gradle 文件，一个位于根目录，另一个位于 app/;
```

- Kotlin 项目根目录下的 build.gradle 是这样的；


```kotlin
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {// buildscript ，该闭包是您列出要在项目中使用的插件源的地方，这里没有配置，只是配置构建本身。
    repositories {// buildscript 闭包中的 repositories 闭包指示插件的来源。
        google()// 类似地，google() 是一种内置方法，可以让 Gradle 了解可以从 Google 下载插件的站点。
        mavenCentral()
    }
    dependencies {// dependencies 闭包表示包含 Gradle 插件的库。
    	classpath "com.android.tools.build:gradle:7.0.2"// 这是 Gradle 的 Android 插件的来源，它教 Gradle 如何构建 Android 应用程序
    	classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.30"// 它教 Gradle 如何编译 Kotlin 源代码
        // NOTE: Do not place your application dependencies here; they belong
    	// in the individual module build.gradle files
    }
}
task clean(type: Delete) {
	delete rootProject.buildDir
}
```

- Java的项目build.gradle是这样的

```java
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
    	google()
    	mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:7.0.2"
            // NOTE: Do not place your application dependencies here; they belong
    		// in the individual module build.gradle files
    }
}
task clean(type: Delete) {
	delete rootProject.buildDir
}
```

- `app/` 下的 `build.gradle`文件

```json
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.example.myapplication'
    compileSdk 33

    defaultConfig {
        applicationId "com.example.myapplication"
        minSdk 24
        targetSdk 33
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary true
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
    buildFeatures {
        compose true
    }
    composeOptions {
        kotlinCompilerExtensionVersion '1.2.0'
    }
    packagingOptions {
        resources {
            excludes += '/META-INF/{AL2.0,LGPL2.1}'
        }
    }
}

dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.3.1'
    implementation 'androidx.activity:activity-compose:1.3.1'
    implementation "androidx.compose.ui:ui:$compose_ui_version"
    implementation "androidx.compose.ui:ui-tooling-preview:$compose_ui_version" // 真正的依赖
    implementation 'androidx.compose.material:material:1.2.0'
    testImplementation 'junit:junit:4.13.2' // 测试的依赖
    androidTestImplementation 'androidx.test.ext:junit:1.1.3' // 安卓测试的依赖
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation "androidx.compose.ui:ui-test-junit4:$compose_ui_version"
    debugImplementation "androidx.compose.ui:ui-tooling:$compose_ui_version"
    debugImplementation "androidx.compose.ui:ui-test-manifest:$compose_ui_version"
}
```

```tex
\app/build.gradle 文件的说明：针对上述文件
1、\android 闭包包含所有特定于 Android 的配置信息。
2、\dependencies 该闭包用于该模块中代码使用的库；
```

- 请求插件

```kotlin
// 1、app/build.gradle 中的第一行通常请求各种插件，用来指定插件的来源，不一定会全部用上。
plugins {
    id 'com.android.application' 	// 入门项目的 Java 和 Kotlin 版本都将请求 com.android.application 插件。用于使用如何构建 Android app
    id 'kotlin-android' // 基于 Kotlin 的项目也将请求 kotlin-android 插件。用于如何构建 Kotlin 的代码。
}
```

- 用于 Gradle 配置的 Android 插件

```kotlin
// app/build.gradle 文件下的 android 属性，这为 Gradle 配置了 Android 插件，告诉它您希望如何从其源代码、资源等组装您的应用程序的详细信息。
/**
1、compileSdkVersion 指示我们要针对哪个版本的 Android 进行编译。因此，通常我们将 compileSdkVersion 设置为相当现代的 API 级别，例如最新的 Android 生产版本。
2、minSdkVersion 表示您愿意支持的最旧的 Android 版本。
3、targetSdkVersion 指示您在编写代码时所考虑的 Android 版本。
4、defaultConfig 闭包具有 versionCode 和 versionName 属性。这两个值代表您的应用程序的版本。versionName 值是用户将在“设置”应用和 Play 商店等地方看到的版本指示器。另一方面，versionCode 必须是一个整数，新版本的版本代码必须高于旧版本。
5、android 闭包还有一个 buildTypes 闭包。这为不同的“构建类型”提供了特定的配置，例如开发构建的调试和生产构建的发布。
6、compileOptions 和 kotlinOptions 闭包表明我们希望 Java 和 Kotlin 编译器生成 JVM 1.8 字节码。

*/
android {
    compileSdk 31
    defaultConfig {
        applicationId "com.commonsware.jetpack.hello"
        minSdk 21
        targetSdk 31
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled falsefalse
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}
```

- `Package Name` 和 `Application ID`

```kotlin
// package 的值是 应用程序的默认 ID，可以从 mainfest 中进行配置，你也可以进行覆盖它
// application ID 是应用程序的唯一标识：
/**
1、一个设备不能同时安装两个一样的 Application ID 应用；
2、在应用商城不能存在两个 Application ID 相同的应用。
*/
```

