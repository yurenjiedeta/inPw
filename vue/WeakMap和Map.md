WeakMap 和 Map 是 JavaScript 中两种不同的集合类型，它们有几个关键区别：

1. 键的类型限制
- Map: 可以使用任何类型作为键（对象、原始值等）
- WeakMap: 只能使用对象作为键，不接受原始值
```javascript
// Map示例 - 各种类型的键都可以
const map = new Map();
map.set('string', 1);     // 字符串作为键
map.set(123, 2);         // 数字作为键
map.set({}, 3);         // 对象作为键

// WeakMap示例 - 只能用对象作为键
const weakMap = new WeakMap();
weakMap.set({}, 1);     // 正确
weakMap.set('string', 2); // 错误: TypeError: Invalid value used as weak map key
```

2. 垃圾回收机制
- Map: 保持对键的强引用，即使没有其他引用，键也不会被垃圾回收
- WeakMap: 保持对键的弱引用，如果没有其他引用，键可以被垃圾回收
```javascript
let obj = { data: 'some data' };

// Map示例
const map = new Map();
map.set(obj, 'metadata');
obj = null; // obj仍然在map中存在，不会被垃圾回收

// WeakMap示例
const weakMap = new WeakMap();
weakMap.set(obj, 'metadata');
obj = null; // obj可以被垃圾回收，weakMap中的键值对也会被自动移除
```

3. 可枚举性
- Map: 可以获取所有键值对，支持遍历
- WeakMap: 不可枚举，无法获取所有键值对
```javascript
// Map可以遍历
const map = new Map();
map.set('a', 1);
map.set('b', 2);

for (let [key, value] of map) {
    console.log(key, value);
}
console.log(map.keys());    // MapIterator {'a', 'b'}
console.log(map.size);      // 2

// WeakMap不能遍历
const weakMap = new WeakMap();
weakMap.set({}, 1);
weakMap.set({}, 2);

// 以下操作都不支持
// for (let [key, value] of weakMap) {} // 错误
// console.log(weakMap.keys());         // 错误
// console.log(weakMap.size);           // undefined
```

4. 可用方法
- Map: 有更多的实用方法和属性（size, clear(), keys(), values(), entries()等）
- WeakMap: 只有基本方法（get(), set(), has(), delete()）
```javascript
const map = new Map();
map.set('key', 'value');
map.size;          // 1
map.clear();       // 清空map
map.keys();        // 获取所有键
map.values();      // 获取所有值
map.entries();     // 获取所有键值对

const weakMap = new WeakMap();
const key = {};
weakMap.set(key, 'value');  // 设置键值对
weakMap.get(key);          // 获取值
weakMap.has(key);         // 检查键是否存在
weakMap.delete(key);      // 删除键值对
```

5. 主要使用场景
- Map: 
  - 需要频繁添加/删除键值对
  - 需要遍历键值对
  - 需要保持键值对的顺序
  - 需要获取键值对数量

- WeakMap:
  - 需要存储对象相关的元数据
  - 需要防止内存泄漏
  - 私有数据存储
```javascript
// Map用例：缓存计算结果
const calculationCache = new Map();
function expensiveCalculation(input) {
    if (calculationCache.has(input)) {
        return calculationCache.get(input);
    }
    const result = /* 复杂计算 */;
    calculationCache.set(input, result);
    return result;
}

// WeakMap用例：存储DOM节点相关数据
const nodeData = new WeakMap();
function setNodeData(node, data) {
    nodeData.set(node, data);
}
// 当DOM节点被移除时，相关数据会自动被垃圾回收
```

选择使用哪个取决于具体需求：
- 如果需要用原始值作为键，或需要遍历/统计键值对，使用Map
- 如果只用对象作为键，且希望避免内存泄漏，使用WeakMap
- 如果需要存储对象的私有数据或元数据，WeakMap是更好的选择