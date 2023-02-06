- nodejs运行目录添加别名

```js
//以全局变量的形式来添加前缀
global.__base = __dirname + '/';

或者重写require方法：
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

//下面的写法可以运行
var oldRequire = require;
require = function (name) {
  return oldRequire(__dirname + '/' + name);
}
```

- 阅读的技巧

```tex
1、选择require最少的；
2、选择没有调用其他函数的优先阅读；
3、除了exports 的以外，其他的都是外部不用考虑的。
```

- __dirname

```js
//当前模块的目录名。 这与 __filename 的 path.dirname() 相同。
//示例：从 /Users/mjr 运行 node example.js

console.log(__dirname);
// 打印: /Users/mjr
console.log(path.dirname(__filename));
// 打印: /Users/mjr
console.log(path.resolve(__dirname))
// 打印: /Users/mjr
```

