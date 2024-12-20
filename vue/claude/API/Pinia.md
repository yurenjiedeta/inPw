在 Vue 3 中，Pinia 是推荐的状态管理库，它取代了 Vuex，提供了更简单、灵活的 API 和更好的类型推导支持。以下是一个简单的 Pinia 使用例子，演示了如何在 Vue 3 中使用 Pinia 管理状态。

### 1. 安装 Pinia

首先，你需要安装 Pinia。可以通过 npm 或 yarn 安装。

```bash
npm install pinia
# 或者使用 yarn
yarn add pinia
```

### 2. 创建 Pinia Store

Pinia 使用 "Store" 来管理状态，类似于 Vuex 中的模块。你可以创建一个 store 来存储和管理你的状态。这里创建一个简单的计数器 store。

#### 创建 store 文件

在 `src/stores` 目录下创建一个 `counterStore.js` 文件：

```javascript
// src/stores/counterStore.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
```

### 3. 在 Vue 组件中使用 Store

现在，我们可以在 Vue 组件中使用 `useCounterStore` 来访问和修改这个 store 的状态。

#### 修改 `App.vue` 文件

```vue
<template>
  <div>
    <h1>Count: {{ counter.count }}</h1>
    <h2>Double Count: {{ counter.doubleCount }}</h2>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounterStore } from './stores/counterStore'

// 获取 counter store
const counter = useCounterStore()
</script>
```

### 4. 配置 Pinia 在 Vue 中

在 `main.js` 文件中，你需要将 Pinia 注册到 Vue 应用中。

```javascript
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 导入 Pinia
import App from './App.vue'

const app = createApp(App)

// 创建 Pinia 实例并挂载到 Vue 应用中
app.use(createPinia())

app.mount('#app')
```

### 5. 运行项目

现在，你可以运行 Vue 项目，启动开发服务器。

```bash
npm run dev
```

### 6. 项目结构示例

你的项目结构应该类似于以下内容：

```
src/
├── assets/
├── components/
├── stores/
│   └── counterStore.js
├── App.vue
└── main.js
```

### 总结

- 使用 `defineStore` 创建 store，`state` 用来定义状态，`getters` 用来定义计算属性，`actions` 用来定义修改状态的方法。
- 在组件中通过 `useStore()` 来获取和操作 store 中的状态。
- 在 `main.js` 中通过 `createPinia()` 将 Pinia 安装到 Vue 应用中。

Pinia 提供了非常简洁和灵活的 API，并且能够很好地与 Vue 3 集成，推荐用于 Vue 3 项目的状态管理。