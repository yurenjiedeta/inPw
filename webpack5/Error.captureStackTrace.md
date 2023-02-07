- `Error.captureStackTrace`

```js
// 在targetObject(下面的this)中添加一个.stack属性。对该属性进行访问时，将以字符串的形式返回Error.captureStackTrace()语句被调用时的代码位置信息(即：调用栈历史)。
Error.captureStackTrace(this);
```

