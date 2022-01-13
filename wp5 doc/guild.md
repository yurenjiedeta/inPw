- ### 起步--指南

```tex
1、目的：理解和掌握webpack提供的各种工具和特性；
2、tip提示：各个版本的输出内容不尽相同，bundle功能接近便好。
```

- ### 起步

```tex
1、diff块：含有修改记录的片段。（如面代码块）
```

```diff
+ this is a new line you shall copy into your code
- and this is a line to be removed from your code
  and this is a line not to touch.
```

- ### package.json文件说明

```tex
1、把private字段修改为true，并且移除main入口，可以防止意外发布代码；
2、测试库的使用 npm install --save-dev 命令
```

- 模块

```tex
1、模块，就是被模块化的；
2、模块支持很多种模块的写法，import、export；require、module.exports等等，详见API，打包后的转化兼容是webpack的独创精巧设计;
3、webpack不会更改import和export语句意外的部分。代码的转换需要使用到其他库。
```

