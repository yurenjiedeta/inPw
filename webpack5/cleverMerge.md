- cleverMerge

```js
const {
	cleverMerge,// 用来合并属性
	DELETE,// 属性值如果是 DELETE ，则 调用 removeOperations 会把该属性移除掉
	removeOperations,
	resolveByProperty,// 用来合并属性
	cachedCleverMerge// 用来合并属性
} = require("../lib/util/cleverMerge");
let merged = cleverMerge(testCase[0], testCase[1]);
let merged1 = cachedCleverMerge(testCase[0], testCase[1]);
let merged2 = cachedCleverMerge(testCase[0], testCase[1]);

removeOperations({
    a: 1,
    b: DELETE,
    c: ["..."],
    d: [1, "...", 2],
    e: [1, 2, 3],
    f: {
        a: 1,
        b: DELETE,
        c: ["..."],
        d: [1, "...", 2],
        e: [1, 2, 3],
        f: {
            a: 1,
            b: DELETE,
            c: ["..."],
            d: [1, "...", 2],
            e: [1, 2, 3]
        }
    }
})
).toEqual({
    a: 1,
    c: [],
    d: [1, 2],
    e: [1, 2, 3],
    f: {
        a: 1,
        c: [],
        d: [1, 2],
        e: [1, 2, 3],
        f: {
            a: 1,
            c: [],
            d: [1, 2],
            e: [1, 2, 3]
        }
    }
});
```

