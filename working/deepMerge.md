- 深合并

```javascript
function deepMerge(target, source) {
    // 如果target或source不是对象，直接返回target
    if (typeof target !== 'object' || target === null) {
        return target;
    }

    // 遍历source的所有key
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null) {
                // 如果target中对应的key是undefined，递归深合并
                if (typeof target[key] === 'undefined') {
                    target[key] = Array.isArray(source[key]) ? [] : {};
                    target[key] = deepMerge(target[key], source[key]);
                }else{
                    target[key] = deepMerge(target[key], source[key]);
                }
            } else {
                // 如果target[key]是undefined，则使用source[key]的值
                target[key] = source[key];
            }
        }
    }

    return target;
}

// 使用示例
const obj1 = {
    a: 1,
    b: {
        d: 4
    },
};

const obj2 = {
    b: {
        c: 3,
        d: 886,
        f: 6
    },
    e: 5,
    g: 7
};

const result = deepMerge(obj1, obj2);
console.log(result);

```

