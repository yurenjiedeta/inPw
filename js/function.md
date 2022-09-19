- 函数的bind方法

```js
function test(abc){
    console.log(arguments);
}
var factory = test.bind(null,"1234");
factory();// ["1234"]
factory(5678);// ["1234",5678]
```

