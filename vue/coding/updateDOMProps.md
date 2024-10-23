在Vue 2.6.14版本的源码中，`updateDOMProps` 函数的主要作用是**更新虚拟DOM（VNode）中的DOM属性（domProps）到真实的DOM节点**。它负责比较新旧VNode的数据，并对真实DOM节点上的属性进行相应的修改或清空，确保虚拟DOM和真实DOM的状态保持一致。

### **目的：**
1. **同步真实DOM节点的属性与VNode中的domProps状态。**
2. **避免不必要的DOM操作**，例如：如果`value`没有改变，则避免重置输入框的光标位置。
3. **处理某些浏览器的特殊情况**：
   - 修复旧版Chrome（≤55）在`textContent`或`innerHTML`更新时的bug。
   - 为IE中不支持`SVG`元素的`innerHTML`更新做兼容处理。

---

### **mock数据与代码运行：**
以下是一个基于该函数的简化示例，展示如何在VNode更新时更新真实DOM属性。

#### **HTML：**
```html
<div id="app"></div>
```

#### **JavaScript 代码：**
```javascript
// 模拟虚拟DOM节点（VNode）
let oldVnode = {
  data: { domProps: { value: '旧值', textContent: '旧文本' } },
  elm: document.getElementById('app') // 绑定到实际DOM节点
};

let newVnode = {
  data: { domProps: { value: '新值', textContent: '新文本' } },
  elm: document.getElementById('app') // 绑定到同一个DOM节点
};

// 判断函数（mock）
function isUndef(v) { return v === undefined || v === null; }
function isDef(v) { return v !== undefined && v !== null; }
function shouldUpdateValue(elm, value) {
  return elm.value !== value;
}

// 执行属性更新函数
updateDOMProps(oldVnode, newVnode);

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  let key, cur;
  let elm = vnode.elm;
  let oldProps = oldVnode.data.domProps || {};
  let props = vnode.data.domProps || {};

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue; }
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      elm._value = cur;
      let strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}
```

#### **解释：**
1. **初始状态**：`oldVnode` 的 `domProps` 中，`value` 为`'旧值'`，`textContent` 为`'旧文本'`。
2. **更新状态**：`newVnode` 的 `domProps` 中，`value` 更新为`'新值'`，`textContent` 更新为`'新文本'`。
3. **效果**：
   - `#app`节点的`value`更新为`新值`，`textContent`变为`新文本`。
   - 如果某个属性在新VNode中不存在，则将对应DOM节点上的该属性清空。

---

### **总结：**
`updateDOMProps` 是Vue中用于在虚拟DOM更新时同步DOM属性的关键函数。它有效避免了不必要的更新和重绘，并处理了某些浏览器的兼容性问题。