我将创建一个全面的 Vue 2.6.14 slot（插槽）使用示例指南。



```vue
<!-- 1. 基础插槽 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>基础插槽示例</h2>
    <child-component>
      <p>这是插入到默认插槽的内容</p>
    </child-component>
  </div>
</template>

<!-- ChildComponent.vue -->
<template>
  <div class="child-component">
    <slot></slot>
  </div>
</template>

<!-- 2. 具名插槽 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>具名插槽示例</h2>
    <named-slot-component>
      <template v-slot:header>
        <h1>页面标题</h1>
      </template>

      <template v-slot:default>
        <p>主要内容区域</p>
      </template>

      <template v-slot:footer>
        <p>页面底部</p>
      </template>
    </named-slot-component>
  </div>
</template>

<!-- NamedSlotComponent.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    
    <main>
      <slot></slot>
    </main>
    
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- 3. 作用域插槽 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>作用域插槽示例</h2>
    <scoped-slot-component>
      <template v-slot:default="slotProps">
        <p>{{ slotProps.item.text }}</p>
      </template>
    </scoped-slot-component>

    <!-- 解构写法 -->
    <scoped-slot-component>
      <template v-slot:default="{ item }">
        <p>{{ item.text }}</p>
      </template>
    </scoped-slot-component>
  </div>
</template>

<!-- ScopedSlotComponent.vue -->
<template>
  <div>
    <slot v-for="item in items" :item="item"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: '项目1' },
        { id: 2, text: '项目2' }
      ]
    }
  }
}
</script>

<!-- 4. 动态插槽名 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>动态插槽名示例</h2>
    <dynamic-slot-component>
      <template v-slot:[dynamicSlotName]>
        <p>动态插槽内容</p>
      </template>
    </dynamic-slot-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicSlotName: 'header'
    }
  }
}
</script>

<!-- 5. 具名插槽缩写语法 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>具名插槽缩写示例</h2>
    <shorthand-slot-component>
      <!-- v-slot:header 缩写为 #header -->
      <template #header>
        <h1>标题</h1>
      </template>

      <template #default>
        <p>默认内容</p>
      </template>

      <template #footer>
        <p>底部</p>
      </template>
    </shorthand-slot-component>
  </div>
</template>

<!-- 6. 默认内容插槽 -->
<!-- DefaultSlotComponent.vue -->
<template>
  <div>
    <slot>
      <p>这是默认内容，当没有提供插槽内容时显示</p>
    </slot>
  </div>
</template>

<!-- 7. 多个作用域插槽参数 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>多参数作用域插槽示例</h2>
    <multi-scoped-slot-component>
      <template v-slot:default="{ item, index, isActive }">
        <p :class="{ active: isActive }">
          {{ index }}. {{ item.text }}
        </p>
      </template>
    </multi-scoped-slot-component>
  </div>
</template>

<!-- MultiScopedSlotComponent.vue -->
<template>
  <div>
    <slot
      v-for="(item, index) in items"
      :item="item"
      :index="index + 1"
      :is-active="activeIndex === index"
    ></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: '项目1' },
        { id: 2, text: '项目2' }
      ],
      activeIndex: 0
    }
  }
}
</script>

```

这些示例涵盖了 Vue 2.6.14 中所有主要的插槽使用场景，让我为您解释每个示例的关键点：

1. 基础插槽
- 最简单的插槽使用方式
- 使用 `<slot></slot>` 作为内容占位符
- 父组件可以传入任何内容

2. 具名插槽
- 使用 `name` 属性来标识不同的插槽
- 父组件使用 `v-slot:插槽名` 来指定内容
- 可以同时使用多个具名插槽

3. 作用域插槽
- 子组件可以向插槽传递数据
- 父组件通过插槽作用域获取数据
- 支持解构语法

4. 动态插槽名
- 使用方括号语法 `v-slot:[动态名称]`
- 插槽名可以是动态的变量

5. 具名插槽缩写
- 使用 `#` 替代 `v-slot:`
- 更简洁的语法
- 常用于模板中

6. 默认内容插槽
- 可以为插槽设置默认内容
- 当父组件未提供内容时显示

7. 多参数作用域插槽
- 可以传递多个参数
- 支持复杂的数据交互
- 可以结合计算属性和方法

需要我详细解释某个特定的使用场景吗？或者您想了解更多关于某个特定类型插槽的高级用法？


```html
<!-- 1. 基础插槽 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>基础插槽示例</h2>
    <child-component>
      <p>这是插入到默认插槽的内容</p>
    </child-component>
  </div>
</template>

<!-- ChildComponent.vue -->
<template>
  <div class="child-component">
    <slot></slot>
  </div>
</template>

<!-- 2. 具名插槽 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>具名插槽示例</h2>
    <named-slot-component>
      <template v-slot:header>
        <h1>页面标题</h1>
      </template>

      <template v-slot:default>
        <p>主要内容区域</p>
      </template>

      <template v-slot:footer>
        <p>页面底部</p>
      </template>
    </named-slot-component>
  </div>
</template>

<!-- NamedSlotComponent.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    
    <main>
      <slot></slot>
    </main>
    
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<!-- 3. 作用域插槽 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>作用域插槽示例</h2>
    <scoped-slot-component>
      <template v-slot:default="slotProps">
        <p>{{ slotProps.item.text }}</p>
      </template>
    </scoped-slot-component>

    <!-- 解构写法 -->
    <scoped-slot-component>
      <template v-slot:default="{ item }">
        <p>{{ item.text }}</p>
      </template>
    </scoped-slot-component>
  </div>
</template>

<!-- ScopedSlotComponent.vue -->
<template>
  <div>
    <slot v-for="item in items" :item="item"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: '项目1' },
        { id: 2, text: '项目2' }
      ]
    }
  }
}
</script>

<!-- 4. 动态插槽名 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>动态插槽名示例</h2>
    <dynamic-slot-component>
      <template v-slot:[dynamicSlotName]>
        <p>动态插槽内容</p>
      </template>
    </dynamic-slot-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicSlotName: 'header'
    }
  }
}
</script>

<!-- 5. 具名插槽缩写语法 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>具名插槽缩写示例</h2>
    <shorthand-slot-component>
      <!-- v-slot:header 缩写为 #header -->
      <template #header>
        <h1>标题</h1>
      </template>

      <template #default>
        <p>默认内容</p>
      </template>

      <template #footer>
        <p>底部</p>
      </template>
    </shorthand-slot-component>
  </div>
</template>

<!-- 6. 默认内容插槽 -->
<!-- DefaultSlotComponent.vue -->
<template>
  <div>
    <slot>
      <p>这是默认内容，当没有提供插槽内容时显示</p>
    </slot>
  </div>
</template>

<!-- 7. 多个作用域插槽参数 -->
<!-- ParentComponent.vue -->
<template>
  <div>
    <h2>多参数作用域插槽示例</h2>
    <multi-scoped-slot-component>
      <template v-slot:default="{ item, index, isActive }">
        <p :class="{ active: isActive }">
          {{ index }}. {{ item.text }}
        </p>
      </template>
    </multi-scoped-slot-component>
  </div>
</template>

<!-- MultiScopedSlotComponent.vue -->
<template>
  <div>
    <slot
      v-for="(item, index) in items"
      :item="item"
      :index="index + 1"
      :is-active="activeIndex === index"
    ></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: '项目1' },
        { id: 2, text: '项目2' }
      ],
      activeIndex: 0
    }
  }
}
</script>
```

