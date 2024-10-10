在 Vue.js 2.6.14 版本的源代码中，渲染函数（`render` 函数）使用了多个内部辅助函数来创建和操作虚拟 DOM（VNode）。这些函数主要用于生成 VNode、处理文本节点、绑定属性、处理插槽等。以下是渲染函数中常用的源代码函数及其功能：

### 1. `createElement` (`_c`)
**功能**：用于创建一个元素类型的 VNode。

**参数**：
- `tag`：字符串或组件，表示要创建的元素或组件类型。
- `data`：对象，包含属性、事件、指令等。
- `children`：数组，包含子 VNode。

**示例**：
```javascript
_c('div', { attrs: { id: 'app' } }, [_v('Hello Vue')])
```

### 2. `createTextVNode` (`_v`)
**功能**：用于创建一个文本类型的 VNode。

**参数**：
- `text`：字符串，表示文本内容。

**示例**：
```javascript
_v('Hello Vue')
```

### 3. `toString` (`_s`)
**功能**：将值转换为字符串，通常用于插值表达式中。

**参数**：
- `value`：任意类型，表示需要转换的值。

**示例**：
```javascript
_s(message)
```

### 4. `renderList` (`_l`)
**功能**：用于渲染 `v-for` 指令，遍历列表并生成对应的 VNode。

**参数**：
- `list`：数组或对象，表示要遍历的数据源。
- `render`：函数，对每个项执行的渲染逻辑。

**示例**：
```javascript
_l(items, function(item) { return _c('li', [_v(_s(item))]) })
```

### 5. `renderSlot` (`_t`)
**功能**：用于渲染插槽内容。

**参数**：
- `name`：字符串，插槽的名称。
- `fallback`：VNodes，插槽内容为空时的默认内容。
- `props`：对象，传递给插槽的属性。

**示例**：
```javascript
_t('default', [_v('Default Slot Content')])
```

### 6. `resolveScopedSlots`
**功能**：解析作用域插槽，确保插槽能够接收父组件传递的数据。

**参数**：
- `slots`：对象，包含插槽内容。
- `normalSlots`：对象，包含常规插槽内容。

**示例**：
```javascript
resolveScopedSlots(scopedSlots, normalSlots)
```

### 7. `normalizeChildren`
**功能**：标准化子 VNode，确保子节点的格式一致，便于后续的渲染和更新。

**参数**：
- `children`：任意类型，表示子节点。

**示例**：
```javascript
normalizeChildren(children)
```

### 8. `cloneVNode`
**功能**：克隆一个已有的 VNode，通常用于复用或修改现有的节点。

**参数**：
- `vnode`：VNode，表示要克隆的节点。

**示例**：
```javascript
cloneVNode(existingVNode)
```

### 9. `applyDirectives`
**功能**：应用指令到 VNode 上，处理如 `v-if`、`v-for`、`v-model` 等指令逻辑。

**参数**：
- `vnode`：VNode，表示要应用指令的节点。
- `directives`：数组，包含指令的定义和参数。

**示例**：
```javascript
applyDirectives(vnode, directives)
```

### 10. `bindObjectProps`
**功能**：将一个对象的属性绑定到 VNode 的数据属性中，通常用于 `v-bind` 绑定。

**参数**：
- `data`：对象，Vnode 的数据属性。
- `tag`：字符串，当前元素的标签名。
- `value`：对象，包含要绑定的属性。
- `asProp`：布尔值，指示是否作为 DOM 属性绑定。
- `isSync`：布尔值，指示是否启用同步更新。

**示例**：
```javascript
bindObjectProps(data, 'div', { id: 'app', class: 'container' }, false, false)
```

### 11. `resolveFilter`
**功能**：解析并应用过滤器，处理模板中的过滤器表达式。

**参数**：
- `value`：任意类型，表示要过滤的值。
- `filters`：数组，包含要应用的过滤器函数。

**示例**：
```javascript
resolveFilter(value, [filter1, filter2])
```

### 12. `markOnce`
**功能**：标记 VNode 为 `v-once`，使其只渲染一次，后续更新不再重新渲染。

**参数**：
- `vnode`：VNode，表示要标记的节点。

**示例**：
```javascript
markOnce(vnode)
```

### 13. `installRenderHelpers`
**功能**：在渲染上下文中安装上述辅助函数，使它们在模板编译后的渲染函数中可用。

**示例**：
```javascript
installRenderHelpers(Vue.prototype)
```

### 14. `createEmptyVNode` (`_e`)
**功能**：创建一个空的 VNode，通常用于占位或条件渲染中。

**示例**：
```javascript
_e()
```

### 15. `toNumber` (`_n`)
**功能**：将值转换为数字，通常用于属性绑定中。

**参数**：
- `value`：任意类型，表示要转换的值。

**示例**：
```javascript
_n('123')
```

### 总结
Vue 2.6.14 的渲染函数通过一系列内部辅助函数来生成和操作虚拟 DOM。这些函数包括创建元素和文本节点、处理插槽和列表、应用指令、绑定属性以及处理过滤器等。理解这些函数的功能有助于深入理解 Vue 的渲染机制和虚拟 DOM 的工作原理。