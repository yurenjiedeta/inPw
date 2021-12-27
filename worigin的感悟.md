- path.join方法

```tex
//该方法是用正在运行的平台特有的分割符号，连接组成新的路径字符串
//如果字符串是零长度，则返回 "."
//path.join(__dirname,"..");//返回的是 __dirname 的父级目录
```

- path.normalize

```javascript
//根据平台规范化给定的路径字符串（一般多出来的斜杠 或者 反斜杠 都会被规范化）
//如果给到零长度的字符串，则返回 "."，表示当前工作目录
```

- typeof

```javascript
//typeof 返回未被计算的变量的类型，object类型涉及的范围比较广
```

- Object.keys

```javascript
//Object.keys返回数据遍历时的键，是一个字符串数组
//如果给定的对象key是以数字作为key，则会有顺序重新排列问题，目前了解的是从小到大
```

- process.argv

```javascript
//该变量是一个数组，返回的是命令行的以空格分开的所有参数
```

- [].map 和 [].join("/")

```javascript
var res = [].map(function(){return ".."});//res的值为:[]，还是空数组
var res = [].join("/");// res的值为 ""
```

- process.execPath 和 path.dirname

```javascript
//process.execPath：返回的是nodejs的exe对应路径
//parth.dirname:返回当前文件所在的文件夹路径
var res = path.dirname(process.execPath);// D:\\Program Files\\nodejs
var test = process.execPath;// D:\\Program Files\\nodejs\\node.exe
```

