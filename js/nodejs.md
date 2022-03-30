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

