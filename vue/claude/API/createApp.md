以下是一个简单的 `Vue3` 中 `createApp` 方法的使用示例：

### 示例：创建一个基本的 Vue 应用

#### 1. **HTML 文件**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 3 App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="main.js"></script>
</body>
</html>
```

#### 2. **JavaScript 文件 (main.js)**

```javascript
// 引入 Vue
import { createApp } from 'vue';

// 定义一个根组件
const App = {
  // Vue组件的模板
  template: `
    <div>
      <h1>Hello, Vue 3!</h1>
      <p>Welcome to Vue 3 with createApp.</p>
      <button @click="increment">Click me</button>
      <p>Count: {{ count }}</p>
    </div>
  `,
  // Vue组件的数据和方法
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};

// 创建 Vue 应用并挂载到页面上的 #app
createApp(App).mount('#app');
```

#### 3. **运行效果**

- 页面显示：

  ```
  Hello, Vue 3!
  Welcome to Vue 3 with createApp.
  [Click me] 按钮
  Count: 0
  ```

- 点击按钮后，`Count` 会递增。

### 解释

1. `createApp(App)` 用于创建一个 Vue 应用实例。
2. `.mount('#app')` 将应用挂载到 HTML 中具有对应 ID 的 DOM 元素上。
3. `App` 是一个组件对象，包含 `template`、`data` 和 `methods` 等选项。

### 扩展

- 如果需要将应用与多个组件一起使用，可以使用 `component` 方法注册组件：

```javascript
import { createApp } from 'vue';

const ChildComponent = {
  template: `<p>This is a child component!</p>`
};

const App = {
  template: `
    <div>
      <h1>Main App</h1>
      <child-component></child-component>
    </div>
  `
};

const app = createApp(App);

// 注册全局组件
app.component('child-component', ChildComponent);

// 挂载应用
app.mount('#app');
```

这种方式让应用更加模块化，适合大型项目。