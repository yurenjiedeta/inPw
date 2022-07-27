- 函数的bind方法

```js
function test(abc){
    console.log(abc);
}
var factory = test.bind(null,"1234");
factory();// 1234
```

