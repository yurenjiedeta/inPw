## 1、生成一个签名密钥

```bash
#Windows机器先进入JDK 的 bin 目录下（比如C:\Program Files\Java\jdkx.x.x_x\bin），才能执行keytool命令。mac不需要，直接执行命令即可。
#用keytool命令生成一个私有密钥，my-release-key.keystore的密钥库文件 
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 20000
    -keystore my-release-key.keystore 
    -alias my-key-alias //alias 参数后面的别名，将来为应用签名时需要用到的
    -keyalg RSA 
    -keysize 2048 
    -validity 20000  //-validity 20000 有效期20000天  
#去掉换行
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 20000
#设置密钥库口令，设置密钥库密码为123456，另一个密码提示时默认设为跟密钥库密码一样（可自己选择）
```

## 2、设置 [gradle](https://so.csdn.net/so/search?q=gradle&spm=1001.2101.3001.7020) 变量

```bash
1、把my-release-key.keystore文件放到你工程中的android/app文件夹下。

2、编辑 ~/.gradle/gradle.properties 或是 项目目录/android/gradle.properties文件。

说明：编辑
 			~/.gradle/gradle.properties，修改的是全局配置，对所有项目有效。【当前用户家目录下】
            /android/gradle.properties（项目配置，只对所在项目有效）
            
如果没有gradle.properties文件你就自己创建一个，添加如下的代码，分别为签名、别名、密钥库密码、密码
```

```java
MYAPP_RELEASE_STORE_FILE = my-release-key.keystore 
MYAPP_RELEASE_KEY_ALIAS = my-key-alias 
MYAPP_RELEASE_STORE_PASSWORD = 123456 
MYAPP_RELEASE_KEY_PASSWORD = 123456
```

## 3、把签名配置加入到项目的 gradle 配置中

```java
// 编辑 项目目录/android/app/build.gradle文件，添加如下的签名配置
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
          storeFile file("my-release-key.keystore")
          storePassword "123456"
          keyAlias "my-key-alias"
          keyPassword "123456"
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

## 4、生成发行 APK 包

```bash
cd android 
gradlew clean 如果想重新再更新发布，你可以先使用 
gradlew assembleRelease
```

