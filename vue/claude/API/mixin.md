我来介绍 Vue3 中 app.mixin 的使用方法和示例。这是一个用于复用组件逻辑的重要特性。

```javascript
// 首先定义一个全局 mixin
const myGlobalMixin = {
  // 可以包含生命周期钩子
  mounted() {
    console.log('组件已挂载 - 来自全局 mixin')
  },
  
  // 可以包含方法
  methods: {
    sayHello() {
      console.log('Hello from mixin!')
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  },
  
  // 可以包含数据
  data() {
    return {
      mixinMessage: '这是来自 mixin 的数据'
    }
  },
  
  // 可以包含计算属性
  computed: {
    reversedMixinMessage() {
      return this.mixinMessage.split('').reverse().join('')
    }
  }
}

// 在创建 Vue 应用时使用 mixin
const app = createApp(App)
app.mixin(myGlobalMixin)
app.mount('#app')
```

然后在组件中就可以直接使用 mixin 中定义的内容:

```vue
<template>
  <div>
    <h1>{{ mixinMessage }}</h1>
    <p>{{ reversedMixinMessage }}</p>
    <button @click="sayHello">点击我</button>
    <p>当前日期: {{ formatDate(new Date()) }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  mounted() {
    // 组件自己的 mounted 钩子会在 mixin 的 mounted 之后执行
    console.log('组件已挂载 - 来自组件本身')
  }
}
</script>
```

需要注意以下几点：

1. 全局 mixin 会影响每个组件实例，所以要谨慎使用

2. 当组件和 mixin 对象有同名选项时的合并策略：
   - 数据对象会进行递归合并，组件数据优先
   - 同名钩子函数会合并为一个数组，mixin 的钩子先执行
   - methods、components 等选项会合并为同一个对象，组件的选项优先

3. 从 Vue3 开始，更推荐使用组合式 API (Composition API) 来实现逻辑复用，而不是 mixin

如果你想要实现局部混入，也可以在单个组件中使用：

```vue
<script>
import myMixin from './myMixin'

export default {
  name: 'MyComponent',
  mixins: [myMixin],  // 局部混入
  // ... 组件其他选项
}
</script>
```

这样 mixin 只会影响这个特定的组件，而不是全局所有组件。