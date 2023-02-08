- `compileBooleanMatcher`

```js
const { itemsToRegexp } = require("../lib/util/compileBooleanMatcher");
const regexp = itemsToRegexp(items);// items 为数组
const r = new RegExp(`^${regexp}$`);
// 最后生成的 r 能够匹配 items 的每一个 元素
```

