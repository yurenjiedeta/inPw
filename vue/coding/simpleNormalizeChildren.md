在 Vue 2.6.14 的源码中，`simpleNormalizeChildren` 函数的主要作用是对子节点（children）进行简单的规范化处理。具体来说，这个函数会检查子节点数组中是否存在嵌套的数组。如果存在嵌套数组，它会将这些嵌套的数组进行扁平化处理（只扁平一层），从而确保子节点数组是一个单层的数组。这在处理模板编译生成的虚拟 DOM 时非常有用，因为 Vue 需要一个扁平化的子节点数组来正确地渲染组件。

### 函数解析

```javascript
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
```

1. **遍历子节点数组**：函数首先遍历传入的 `children` 数组。
2. **检查嵌套数组**：对于每一个子节点，检查它是否是一个数组。
3. **扁平化处理**：如果发现有子节点是数组，使用 `Array.prototype.concat.apply([], children)` 将所有嵌套的数组扁平化为一个单层数组，并立即返回结果。
4. **返回原数组**：如果遍历完所有子节点后，没有发现任何嵌套数组，则直接返回原始的 `children` 数组。

### 示例演示

下面通过一个示例来演示 `simpleNormalizeChildren` 函数的具体作用。

#### 示例 1：没有嵌套数组

```javascript
const children1 = ['div', 'span', 'p']
const normalizedChildren1 = simpleNormalizeChildren(children1)
console.log(normalizedChildren1) // 输出: ['div', 'span', 'p']
```

**解释**：`children1` 数组中没有嵌套的数组，因此函数直接返回原数组。

#### 示例 2：存在嵌套数组

```javascript
const children2 = ['div', ['span', 'p'], 'a']
const normalizedChildren2 = simpleNormalizeChildren(children2)
console.log(normalizedChildren2) // 输出: ['div', 'span', 'p', 'a']
```

**解释**：`children2` 数组中第二个元素是一个数组 `['span', 'p']`，函数检测到有嵌套数组后，会将整个 `children2` 数组扁平化为 `['div', 'span', 'p', 'a']` 并返回。

#### 示例 3：多层嵌套数组

```javascript
const children3 = ['div', ['span', ['p', 'a']], 'section']
const normalizedChildren3 = simpleNormalizeChildren(children3)
console.log(normalizedChildren3) // 输出: ['div', 'span', ['p', 'a'], 'section']
```

**解释**：`children3` 数组中存在多层嵌套数组。`simpleNormalizeChildren` 只会扁平化一层，因此结果是 `['div', 'span', ['p', 'a'], 'section']`。注意，内部的 `['p', 'a']` 仍然保持嵌套状态，因为函数只进行了单层扁平化。

### 总结

`simpleNormalizeChildren` 函数在 Vue 2.6.14 中用于确保子节点数组的结构简单且扁平化，这有助于虚拟 DOM 的高效渲染和比较。通过上述示例可以清楚地看到，当子节点数组中存在嵌套数组时，函数会对其进行扁平化处理，从而简化后续的处理流程。