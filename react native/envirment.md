- Node.js

```bash
# nvm 版本 1.1.7
npm config set prefix "D:\Program Files\nodejs\node_global"
npm config set cache "D:\Program Files\nodejs\node_cache"
```

- JAVA搭建

```bash
#变量名：JAVA_HOME
#变量值：C:\Program Files (x86)\Java\jdk1.8.0_91 // 要根据自己的实际路径配置
#变量名：CLASSPATH
#变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar; //记得前面有个"."
#变量名：Path（这是在Path中编辑去新增的）
#变量值：%JAVA_HOME%\bin;
#变量值：%JAVA_HOME%\jre\bin;
```

- Android配置

```bash
#变量名：Path（这是在Path中编辑去新增的）
#变量值：%ANDROID_HOME%\platform-tools
#变量值：%ANDROID_HOME%\emulator
#变量值：%ANDROID_HOME%\tools
#变量值：%ANDROID_HOME%\tools\bin
```
- npm 切换源

```bash
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```

- 创建项目命令

```bash
# 路径需要没有空格、没有特殊单词等等
npx react-native init AwesomeProject
# 当出现 npx 文件名、目录名或卷标准语法不正确的时候，把全局的缓存给删了

#最给力的nodejs版本 16.10.0
```
