- #### 关于replace方法，第二个参数为函数的情况
```js
var args = ["777", "888", "999", "555"];
var argIndex = 0;
var format = "invariant %srequires an %serror %smessage %sargument"
format.replace(/%s/g, function () {
    return args[argIndex++];
})
//替换后的format值：invariant 777requires an 888error 999message 555argument
```
