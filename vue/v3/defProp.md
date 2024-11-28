```js
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
```

1. 当 key 已存在于对象中时，使用 Object.defineProperty 可以精确控制属性描述符（enumerable、configurable、writable），确保属性特性正确设置。

2. 当 key 不存在时，直接赋值（obj[key] = value）更简单高效，因为新属性会自动获得默认的属性描述符，这些描述符与 defineProperty 中指定的值相同。

这种实现平衡了属性定义的正确性和性能开销。