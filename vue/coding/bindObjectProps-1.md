这里其实是有效果的，因为 `value` 实际上就是父组件传入的数据对象的引用。让我详细解释：

1. 当我们使用 `.sync` 时，比如：
```vue
<child-component :title.sync="doc.title"></child-component>
```

2. 在 `bindObjectProps` 函数中的 `value` 参数，实际上是 `doc` 对象的引用：
```js
// value 就是 doc 对象的引用
on[("update:" + key)] = function ($event) {
  value[key] = $event;  // 直接修改 doc.title
};
```

3. 由于 JavaScript 对象是引用类型，所以：
- `value[key] = $event` 
- 相当于 `doc.title = $event`
- 这个修改会直接反映到父组件的数据上

举个完整的例子来说明：

```vue
// 父组件
<template>
  <div>
    <child-component :title.sync="doc.title"></child-component>
    <p>标题是: {{doc.title}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doc: {
        title: '原始标题'
      }
    }
  }
}
</script>

// 子组件
<template>
  <button @click="changeTitle">改变标题</button>
</template>

<script>
export default {
  methods: {
    changeTitle() {
      this.$emit('update:title', '新标题')  // 触发更新
    }
  }
}
</script>
```

当点击按钮时：
1. 子组件触发 `update:title` 事件
2. 处理函数执行 `value['title'] = $event`
3. 由于 `value` 是 `doc` 对象的引用，所以 `doc.title` 被更新
4. Vue 检测到数据变化，自动更新视图

所以这个更新是有效的，因为是通过引用来修改数据的。这就是为什么我们能看到父组件的显示会跟着更新。