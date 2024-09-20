我们可以通过将 `ParentComponent` 挂载到一个 `id` 为 `demo` 的 DOM 元素上来演示整个流程。以下是完整的例子：

### HTML
```html
<div id="demo"></div>
```

### JavaScript
```javascript
// 定义父组件
Vue.component('ParentComponent', {
  template: '<div><ChildComponent/></div>',
  components: {
    ChildComponent: {
      template: '<span>Child</span>'
    }
  }
});

// 创建 Vue 实例并挂载到 id 为 demo 的元素上
new Vue({
  el: '#demo',
  render: function (h) {
    return h('ParentComponent');
  }
});
```

### 解释
1. **父组件 `ParentComponent`** 中包含了一个子组件 `ChildComponent`。父组件的模板简单地在 `div` 中插入了 `ChildComponent`。
2. **`ChildComponent`** 的模板是一个简单的 `span` 元素，包含 "Child" 文本。
3. 当 Vue 实例被挂载到 `#demo` 时，`ParentComponent` 会首先初始化，接着会触发 `ChildComponent` 的创建流程。在这个过程中，Vue 内部会创建 `ChildComponent` 的 vnode，调用 `createComponentInstanceForVnode` 函数，给 `options` 赋值 `_isComponent: true`，并进入优化路径，调用 `initInternalComponent` 进行组件初始化。
4. 这个例子展示了 Vue 在处理内部组件时如何通过设置 `options._isComponent` 来避免重复的选项合并，提升渲染性能。

运行这个代码后，`ChildComponent` 将被正确渲染在页面上的 `#demo` 元素中。