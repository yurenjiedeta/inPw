我来展示 Vue3 中 app.provide 的使用方法。provide/inject 是一个非常有用的依赖注入系统，特别适合跨多级组件传递数据。

先看一个基础的全局 provide 示例：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 提供一个简单的值
app.provide('message', 'Hello from root!')

// 提供一个响应式的值
const count = ref(0)
app.provide('count', count)

// 提供一个对象，包含值和方法
app.provide('userService', {
  user: ref({
    name: 'Alice',
    role: 'admin'
  }),
  updateUser(newName) {
    this.user.value.name = newName
  }
})

app.mount('#app')
```

然后在任意深度的子组件中都可以注入这些值：

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <!-- 使用注入的值 -->
    <p>消息: {{ message }}</p>
    <p>当前计数: {{ count }}</p>
    <p>用户名: {{ userService.user.name }}</p>
    
    <!-- 使用注入的方法 -->
    <button @click="userService.updateUser('Bob')">
      更新用户名
    </button>
    
    <!-- 展示计数的响应性 -->
    <button @click="count++">增加计数</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入值，可以提供默认值
const message = inject('message', 'default message')
const count = inject('count')
const userService = inject('userService')
</script>
```

这里有一个更复杂的例子，展示如何使用 provide 来实现主题切换功能：

```javascript
// theme.js
import { ref, readonly } from 'vue'

export const themeSymbol = Symbol('theme')

export const createTheme = () => {
  const theme = ref('light')
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  const colors = computed(() => ({
    background: theme.value === 'light' ? '#ffffff' : '#333333',
    text: theme.value === 'light' ? '#333333' : '#ffffff'
  }))
  
  return {
    theme: readonly(theme),
    toggleTheme,
    colors
  }
}
```

```javascript
// main.js
import { createTheme, themeSymbol } from './theme'

const app = createApp(App)
app.provide(themeSymbol, createTheme())
```

```vue
<!-- ThemeConsumer.vue -->
<template>
  <div :style="{ 
    backgroundColor: colors.background,
    color: colors.text 
  }">
    <p>当前主题: {{ theme }}</p>
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { themeSymbol } from './theme'

const { theme, toggleTheme, colors } = inject(themeSymbol)
</script>
```

一些重要的使用建议：

1. 使用 Symbol 作为 injection key，可以避免命名冲突：
```javascript
const mySymbol = Symbol('myKey')
app.provide(mySymbol, value)
```

2. 如果提供响应式数据，考虑使用 readonly 包装来防止意外修改：
```javascript
app.provide('state', readonly(state))
```

3. 可以提供一个包含值和修改方法的对象，实现受控的状态修改：
```javascript
app.provide('store', {
  state: readonly(state),
  updateState: (newValue) => { state.value = newValue }
})
```

4. 在组件中也可以使用 provide，这样可以限制作用范围：
```vue
<script setup>
import { provide } from 'vue'

provide('key', value) // 只对当前组件的后代有效
</script>
```

使用 provide/inject 的主要优点是可以避免 prop 逐级传递（prop drilling），特别适合需要在多个层级组件间共享数据的场景，比如主题配置、用户认证状态等。