```js
function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}
```

根据 Vue.js 2.6.14 版本中 `genFilterCode` 函数的实现,我可以给出以下几种不同的实参及对应的输出:

1. 当 `key` 参数是一个整数值时:
   - 实参: `42`
   - 输出: `"$event.keyCode!==42"`

2. 当 `key` 参数是一个字符串键名,对应于 `keyCodes` 对象中定义的键码:
   - 实参: `"esc"`
   - 输出: `"_k($event.keyCode,'esc',27,'$event.key','')"` 

3. 当 `key` 参数是一个字符串键名,对应于 `keyNames` 对象中定义的键名:
   - 实参: `"up"`
   - 输出: `"_k($event.keyCode,'up',['Up','ArrowUp'],'$event.key','')"`

4. 当 `key` 参数是一个不存在于 `keyCodes` 和 `keyNames` 中的值:
   - 实参: `"myCustomKey"`
   - 输出: `"_k($event.keyCode,'myCustomKey',undefined,'$event.key','')"`

总的来说, `genFilterCode` 函数根据传入的 `key` 参数生成适当的条件检查代码,用于过滤键盘事件。对于标准的键盘按键,它会检查 `$event.keyCode` 是否匹配定义的键码;对于自定义键,它会使用 `_k` 函数进行更加灵活的检查。