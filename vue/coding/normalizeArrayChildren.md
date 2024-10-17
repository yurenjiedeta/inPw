在 Vue 2.6.14 的源码中，`normalizeArrayChildren` 函数的主要作用是对子节点（children）进行深度规范化处理。相比于 `simpleNormalizeChildren` 只进行单层扁平化，`normalizeArrayChildren` 处理更复杂的情况，包括多层嵌套数组、合并相邻的文本节点、处理原始类型（如字符串、数字）以及为由 `v-for` 生成的列表项分配默认的 `key`。这一规范化过程确保了虚拟 DOM 的一致性和渲染的高效性。

### 函数作用详解

```javascript
function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    // 处理嵌套数组
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // 合并相邻的文本节点
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) { // 处理原始类型（字符串、数字等）
      if (isTextNode(last)) {
        // 合并相邻的文本节点
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // 将原始类型转换为文本节点
        res.push(createTextVNode(c));
      }
    } else { // 处理 VNode 对象
      if (isTextNode(c) && isTextNode(last)) {
        // 合并相邻的文本节点
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // 为由 v-for 生成的列表项分配默认的 key
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}
```

### 主要功能

1. **递归处理嵌套数组**：如果子节点中存在嵌套的数组，函数会递归调用自身，将嵌套数组进行深度规范化处理。
2. **合并相邻的文本节点**：为了优化渲染性能和确保虚拟 DOM 的一致性，函数会合并相邻的文本节点。例如，`'Hello'` 和 `'World'` 会被合并为 `'HelloWorld'`。
3. **处理原始类型**：将字符串、数字等原始类型转换为文本节点（VNode）。
4. **为列表项分配默认的 key**：在使用 `v-for` 渲染列表时，如果列表项没有显式指定 `key`，函数会为其分配一个默认的 `key`，以优化渲染性能和避免潜在的渲染问题。

### 示例演示

#### 示例 1：简单嵌套数组

```javascript
// 假设以下辅助函数的简单实现
function isUndef(val) {
  return val === undefined || val === null;
}

function isTextNode(node) {
  return typeof node === 'object' && node.text !== undefined;
}

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number';
}

function createTextVNode(text) {
  return { text };
}

function isTrue(val) {
  return val === true;
}

function isDef(val) {
  return val !== undefined && val !== null;
}

// Mock 数据
const children = [
  'Hello',
  [' ', 'World'],
  true,
  ['!']
];

// 调用 normalizeArrayChildren
const normalizedChildren = normalizeArrayChildren(children, '0');
console.log(normalizedChildren);
// 输出: [{ text: 'Hello World!' }]
```

**解释**：
- `'Hello'` 和 `[' ', 'World']` 被递归处理并合并为 `'Hello World'`。
- `true` 被忽略。
- `['!']` 被递归处理并合并为 `'!'`，最终与之前的文本合并为 `'Hello World!'`。

#### 示例 2：多层嵌套和 VNode 对象

```javascript
// Mock VNode 对象
const vnode1 = { tag: 'div', text: 'Hello' };
const vnode2 = { tag: 'span', text: 'World' };
const children = [
  vnode1,
  [vnode2, ['!', { tag: 'strong', text: 'Vue' }]],
  ' is awesome'
];

// 调用 normalizeArrayChildren
const normalizedChildren = normalizeArrayChildren(children, '0');
console.log(normalizedChildren);
/*
输出:
[
  { tag: 'div', text: 'Hello' },
  { tag: 'span', text: 'World!' },
  { tag: 'strong', text: 'Vue' },
  { text: ' is awesome' }
]
*/
```

**解释**：
- `vnode1` 保持不变。
- `vnode2` 与 `'!'` 合并为 `{ tag: 'span', text: 'World!' }`。
- `{ tag: 'strong', text: 'Vue' }` 保持不变。
- `' is awesome'` 被转换为文本节点。

#### 示例 3：处理 `v-for` 生成的列表项

```javascript
const children = [
  { tag: 'li', text: 'Item 1' },
  { tag: 'li', text: 'Item 2' },
  { tag: 'li', text: 'Item 3' }
];
children._isVList = true;

// 调用 normalizeArrayChildren
const normalizedChildren = normalizeArrayChildren(children, '1');
console.log(normalizedChildren);
/*
输出:
[
  { tag: 'li', text: 'Item 1', key: '__vlist1_0__' },
  { tag: 'li', text: 'Item 2', key: '__vlist1_1__' },
  { tag: 'li', text: 'Item 3', key: '__vlist1_2__' }
]
*/
```

**解释**：
- 由于 `children._isVList` 为 `true`，且每个 `li` 节点没有显式的 `key`，函数会为每个 `li` 分配一个默认的 `key`，例如 `__vlist1_0__`、`__vlist1_1__` 等。

### 总结

`normalizeArrayChildren` 函数在 Vue 2.6.14 中扮演着关键角色，确保子节点数组在渲染前经过深度规范化处理。通过递归处理嵌套数组、合并文本节点、转换原始类型以及分配默认的 `key`，该函数保证了虚拟 DOM 的结构一致性和渲染效率。这对于复杂的模板结构和动态列表渲染尤为重要，能够有效提升 Vue 应用的性能和稳定性。