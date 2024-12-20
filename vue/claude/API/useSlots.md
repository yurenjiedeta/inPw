我来展示一个使用 useSlots 的具体示例。它可以让我们在组件的 setup 函数中访问插槽内容。

```vue
<!-- BaseCard.vue -->
<script setup>
import { useSlots } from 'vue'

// 获取插槽对象
const slots = useSlots()

// 检查特定插槽是否存在
const hasHeader = computed(() => !!slots.header)
const hasFooter = computed(() => !!slots.footer)
</script>

<template>
  <div class="card">
    <!-- 渲染header插槽(如果存在) -->
    <header v-if="hasHeader" class="card-header">
      <slot name="header"></slot>
    </header>

    <!-- 默认插槽内容 -->
    <div class="card-body">
      <slot></slot>
    </div>

    <!-- 渲染footer插槽(如果存在) -->
    <footer v-if="hasFooter" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

使用这个组件的示例:

```vue
<!-- App.vue -->
<template>
  <BaseCard>
    <!-- 使用具名插槽 header -->
    <template #header>
      <h2>卡片标题</h2>
    </template>

    <!-- 默认插槽内容 -->
    <p>这是卡片的主要内容区域</p>

    <!-- 使用具名插槽 footer -->
    <template #footer>
      <button>确认</button>
    </template>
  </BaseCard>
</template>
```

通过 useSlots() 我们可以:

1. 在 setup 中访问所有可用的插槽
2. 动态检查特定插槽是否被父组件提供
3. 根据插槽是否存在来条件渲染相应的容器元素
4. 也可以用来实现更复杂的插槽逻辑，比如默认内容或者动态插槽

另一个更高级的使用示例:

```vue
<script setup>
import { useSlots, h } from 'vue'

const slots = useSlots()

// 动态渲染插槽内容
const renderDynamicSlot = (name) => {
  if (slots[name]) {
    return h('div', { class: `slot-${name}` }, slots[name]())
  }
  return null
}
</script>

<template>
  <div class="dynamic-container">
    {{ renderDynamicSlot('custom') }}
  </div>
</template>
```

这些例子展示了 useSlots 在 Vue3 组件中的灵活应用，它让我们能够以编程方式处理插槽内容，实现更复杂的组件逻辑。