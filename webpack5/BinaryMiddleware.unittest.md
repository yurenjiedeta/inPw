- `BinaryMiddleware.unittest`

```js
// 用来把对象编码解码的一个方法类，基于 version:5.73.0
const BinaryMiddleware = require("../lib/serialization/BinaryMiddleware");
const mw = new BinaryMiddleware();
const realData = [true, true];
const serialized = mw.serialize(realData, {});
const newData = mw.deserialize(serialized, {});
// newData 的值为 [true, true]
```

