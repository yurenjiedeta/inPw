- 环境配置

```tex
1、在电脑系统上，安装 Java JDK;
2、电脑系统上，安装Kotlin命令行编译器；
3、VScode中安装插件Kotlin Language；
4、VScode中安装插件Code Runner
```

- 第二点

```tex
从  https://github.com/JetBrains/kotlin/releases  下载一个 Release，并配置好环境变量。
1、KOTLIN_HOME
2、path   %KOTLIN_HOME%\bin
```

- `kotlin`的运行实际命令

```bash
# 在 ubuntu 上的表现
cd "/home/lue/codes/kotlin/" && kotlinc hello.kt -include-runtime -d hello.jar && java -jar hello.jar
```

