在 Vue.js 2.6.14 版本的源码中，`getAndRemoveAttr` 函数的主要作用是从一个元素对象中获取指定的属性值，并根据需要将该属性从属性列表 (`attrsList`) 和属性映射 (`attrsMap`) 中移除。这个函数在模板编译过程中用于处理特定的指令或属性，确保这些属性不会被重复处理或应用到最终的渲染结果中。

### 函数目的和作用

`getAndRemoveAttr` 函数的主要功能包括：

1. **获取属性值**：从元素的属性映射 (`attrsMap`) 中获取指定属性的值。
2. **移除属性**：如果找到该属性，则从属性列表 (`attrsList`) 中移除它。此外，根据 `removeFromMap` 参数的值，决定是否从属性映射中删除该属性。
3. **返回属性值**：返回获取到的属性值，便于后续处理。

### 代码段说明

```javascript
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  // 从属性映射中获取属性值，如果存在则赋值给 val
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    // 遍历属性列表，找到对应的属性并移除
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1); // 移除属性
        break
      }
    }
  }
  // 如果需要，从属性映射中删除该属性
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  // 返回属性值
  return val
}
```

**详细解释：**

1. **变量声明**：
   - `val` 用于存储属性的值。

2. **获取属性值**：
   - `if ((val = el.attrsMap[name]) != null)`：检查 `el.attrsMap` 中是否存在名为 `name` 的属性。如果存在，将其值赋给 `val`。

3. **移除属性列表中的属性**：
   - `var list = el.attrsList;`：获取元素的属性列表。
   - 使用 `for` 循环遍历 `attrsList`，查找属性名与 `name` 匹配的属性。
   - 一旦找到匹配的属性，使用 `splice` 方法将其从列表中移除，并使用 `break` 终止循环。

4. **根据 `removeFromMap` 参数决定是否移除属性映射中的属性**：
   - `if (removeFromMap)`：如果 `removeFromMap` 为 `true`，则使用 `delete` 操作符从 `attrsMap` 中删除该属性。

5. **返回属性值**：
   - `return val`：返回获取到的属性值，供后续处理使用。

### 示例说明

假设我们有一个元素对象 `el`，其结构如下：

```javascript
let el = {
  attrsMap: {
    id: "app",
    class: "container",
    "data-role": "main"
  },
  attrsList: [
    { name: "id", value: "app" },
    { name: "class", value: "container" },
    { name: "data-role", value: "main" }
  ]
};
```

**示例 1：移除 `id` 属性并从映射中删除**

```javascript
let idValue = getAndRemoveAttr(el, 'id', true);
console.log(idValue); // 输出: "app"
console.log(el.attrsMap); // 输出: { class: "container", "data-role": "main" }
console.log(el.attrsList); 
// 输出: [
//   { name: "class", value: "container" },
//   { name: "data-role", value: "main" }
// ]
```

**解释**：
- 函数获取了 `id` 属性的值 `"app"` 并返回。
- 从 `attrsList` 中移除了 `id` 属性的对象。
- 由于 `removeFromMap` 为 `true`，`attrsMap` 中的 `id` 属性也被删除。

**示例 2：获取但不移除 `class` 属性**

```javascript
let classValue = getAndRemoveAttr(el, 'class', false);
console.log(classValue); // 输出: "container"
console.log(el.attrsMap); 
// 输出: { class: "container", "data-role": "main" } // 未删除
console.log(el.attrsList); 
// 输出: [
//   { name: "class", value: "container" },
//   { name: "data-role", value: "main" }
// ]
```

**解释**：
- 函数获取了 `class` 属性的值 `"container"` 并返回。
- 尽管从 `attrsList` 中移除了 `class` 属性，但由于 `removeFromMap` 为 `false`，`attrsMap` 中的 `class` 属性未被删除。

### 应用场景

在 Vue 的模板编译过程中，`getAndRemoveAttr` 函数通常用于以下场景：

- **处理特定指令**：例如，处理 `v-bind`、`v-on` 等指令时，需要获取并移除相关属性，以防止这些属性被误处理或重复应用。
- **解析组件属性**：在解析自定义组件的属性时，可能需要提取某些特定属性并将其转换为组件的 props，同时从原始属性列表中移除。
- **优化编译过程**：通过移除不必要的属性，可以简化后续的编译和渲染过程，提高性能。

通过使用 `getAndRemoveAttr`，Vue 能够有效地管理和处理元素的属性，确保编译过程的准确性和高效性。