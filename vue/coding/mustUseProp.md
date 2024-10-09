在 Vue.js 2.6.14 的源码中，`mustUseProp` 函数的主要作用是 **确定特定的属性是否需要作为 DOM 属性（Property）来绑定，而不是作为普通的 HTML 属性（Attribute）**。这种区分对于确保某些属性在渲染时能够正确地反映在 DOM 元素上是至关重要的。

### 详细解释

1. **`acceptValue` 函数**：
   ```javascript
   var acceptValue = makeMap('input,textarea,option,select,progress');
   ```
   这个函数使用 `makeMap` 创建了一个包含特定标签名称的映射。`acceptValue` 用于判断一个标签是否属于 `'input'`, `'textarea'`, `'option'`, `'select'`, 或 `'progress'` 这些标签之一。

2. **`mustUseProp` 函数**：
   ```javascript
   var mustUseProp = function (tag, type, attr) {
     return (
       (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
       (attr === 'selected' && tag === 'option') ||
       (attr === 'checked' && tag === 'input') ||
       (attr === 'muted' && tag === 'video')
     )
   };
   ```
   该函数接收三个参数：
   - `tag`：HTML 标签名称（如 `'input'`, `'textarea'` 等）。
   - `type`：输入元素的类型（如 `'text'`, `'checkbox'`, `'button'` 等）。
   - `attr`：属性名称（如 `'value'`, `'checked'` 等）。

   函数的逻辑如下：
   - **`(attr === 'value' && acceptValue(tag)) && type !== 'button'`**：
     - 对于 `'value'` 属性，如果标签是 `acceptValue` 中的标签（即 `'input'`, `'textarea'`, `'option'`, `'select'`, `'progress'`），且输入类型不是 `'button'`，则需要作为属性绑定。
   - **`(attr === 'selected' && tag === 'option')`**：
     - 对于 `'selected'` 属性，如果标签是 `'option'`，则需要作为属性绑定。
   - **`(attr === 'checked' && tag === 'input')`**：
     - 对于 `'checked'` 属性，如果标签是 `'input'`，则需要作为属性绑定。
   - **`(attr === 'muted' && tag === 'video')`**：
     - 对于 `'muted'` 属性，如果标签是 `'video'`，则需要作为属性绑定。

### 为什么需要区分属性和属性绑定

在 DOM 操作中，**属性（Property）** 和 **属性（Attribute）** 是两个不同的概念：

- **属性（Property）**：是 DOM 元素的实际属性，通常用于反映元素的当前状态。例如，`input` 元素的 `value` 属性表示当前输入的值，而 `checked` 属性表示复选框是否被选中。
- **属性（Attribute）**：是 HTML 标签上的属性，通常用于定义元素的初始状态。例如，`<input value="初始值">` 设置了输入框的初始值。

某些情况下，如果仅仅设置属性而不设置属性，可能无法正确反映元素的当前状态。因此，Vue 需要根据具体情况决定是否将某个属性绑定为 DOM 属性，以确保组件的行为与预期一致。

### 具体应用场景

- **`value` 属性**：
  - 对于输入元素（如 `input`, `textarea`），`value` 应该作为 DOM 属性来绑定，以确保用户输入时，`value` 属性能够实时更新。
  - 但对于 `button` 类型的 `input`，`value` 更多用于按钮的显示文本，因此不需要作为属性绑定。

- **`checked` 属性**：
  - 对于 `input` 类型为复选框或单选按钮时，`checked` 需要作为 DOM 属性来绑定，以反映选中状态。

- **`selected` 属性**：
  - 对于 `option` 元素，`selected` 需要作为 DOM 属性来绑定，以表示选中状态。

- **`muted` 属性**：
  - 对于 `video` 元素，`muted` 需要作为 DOM 属性来绑定，以控制视频是否静音。

### 总结

`mustUseProp` 函数在 Vue 2.6.14 中用于 **判断某个属性在特定标签和类型下是否需要作为 DOM 属性进行绑定**。这种机制确保了 Vue 在渲染和更新 DOM 时，能够正确处理那些依赖于 DOM 属性而非单纯 HTML 属性的情况，从而保证组件的行为和状态与预期一致。

---

希望以上解释能够帮助你更好地理解 `mustUseProp` 函数在 Vue 2.6.14 源码中的作用和意义！