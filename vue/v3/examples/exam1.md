好的，以下是将 Vue 3 的常用方法在通过全局引入（例如通过 `vue.global.js`）的情况下使用的具体示例。假设你通过 `<script>` 标签引入了 Vue 3 的全局构建版本，Vue 的所有方法都可以通过全局 `Vue` 对象访问。

### 1. 引入 Vue 全局构建

首先，确保在你的 HTML 文件中通过 `<script>` 标签引入了 Vue 3 的全局构建版本：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Vue 3 Global Example</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app"></div>

  <!-- 你的组件和应用脚本将在这里编写 -->
  <script src="app.js"></script>
</body>
</html>
```

### 2. 使用 `createApp` 创建 Vue 应用

**示例：**

```javascript
// app.js
const App = {
  template: `<div>{{ message }}</div>`,
  data() {
    return {
      message: 'Hello Vue 3 Global!'
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 3. 使用 `reactive` 创建响应式对象

**示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>Count: {{ state.count }}</p>
      <button @click="increment">Increment</button>
    </div>
  `,
  setup() {
    const state = Vue.reactive({
      count: 0
    });

    function increment() {
      state.count++;
    }

    return {
      state,
      increment
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 4. 使用 `ref` 创建响应式引用

**示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>Message: {{ message }}</p>
      <button @click="updateMessage">Update Message</button>
    </div>
  `,
  setup() {
    const message = Vue.ref('Hello Vue 3');

    function updateMessage() {
      message.value = 'Hello Composition API with Global Vue';
    }

    return {
      message,
      updateMessage
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 5. 使用 `computed` 创建计算属性

**示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>First Name: <input v-model="firstName" /></p>
      <p>Last Name: <input v-model="lastName" /></p>
      <p>Full Name: {{ fullName }}</p>
    </div>
  `,
  setup() {
    const firstName = Vue.ref('John');
    const lastName = Vue.ref('Doe');

    const fullName = Vue.computed(() => `${firstName.value} ${lastName.value}`);

    return {
      firstName,
      lastName,
      fullName
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 6. 使用 `watch` 侦听响应式数据变化

**示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
    </div>
  `,
  setup() {
    const count = Vue.ref(0);

    Vue.watch(count, (newVal, oldVal) => {
      console.log(`count changed from ${oldVal} to ${newVal}`);
    });

    function increment() {
      count.value++;
    }

    return {
      count,
      increment
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 7. 使用生命周期钩子 (`onMounted`, `onUnmounted` 等)

**示例：**

```javascript
// app.js
const App = {
  template: `<div>Check the console for lifecycle hooks.</div>`,
  setup() {
    Vue.onMounted(() => {
      console.log('Component mounted');
      // 示例：启动一个定时器
      timer.value = setInterval(() => {
        console.log('Interval running...');
      }, 1000);
    });

    Vue.onUnmounted(() => {
      console.log('Component unmounted');
      // 清除定时器
      clearInterval(timer.value);
    });

    const timer = Vue.ref(null);

    return {};
  }
};

Vue.createApp(App).mount('#app');
```

### 8. 使用 `defineComponent` 定义组件

虽然 `defineComponent` 主要用于类型推导，但在全局构建中你仍然可以使用它。以下示例展示了如何定义和使用组件：

**示例：**

```javascript
// 定义一个子组件
const MyComponent = Vue.defineComponent({
  name: 'MyComponent',
  template: `<div>{{ message }}</div>`,
  setup() {
    const message = Vue.ref('Hello from defineComponent');

    return {
      message
    };
  }
});

// 使用子组件的主应用
const App = {
  components: {
    MyComponent
  },
  template: `<MyComponent />`
};

Vue.createApp(App).mount('#app');
```

### 9. 使用 `provide` 和 `inject` 进行组件间通信

**示例：**

**父组件：**

```javascript
// app.js
const ParentComponent = {
  template: `
    <div>
      <p>Parent Component</p>
      <ChildComponent />
    </div>
  `,
  setup() {
    const sharedState = Vue.ref('Shared Data');
    Vue.provide('sharedState', sharedState);

    return {};
  },
  components: {
    ChildComponent: Vue.defineComponent({
      template: `<div>Child Component: {{ sharedState }}</div>`,
      setup() {
        const sharedState = Vue.inject('sharedState');

        return {
          sharedState
        };
      }
    })
  }
};

Vue.createApp(ParentComponent).mount('#app');
```

### 10. 使用 `use` 安装插件

**示例：**

假设你有一个自定义插件 `MyPlugin`，它向全局属性添加了一个方法。

**插件定义 (`my-plugin.js`):**

```javascript
// my-plugin.js
const MyPlugin = {
  install(app, options) {
    app.config.globalProperties.$myGlobalMethod = () => {
      console.log('Global method called from MyPlugin');
    };
  }
};
```

**在 HTML 中引入插件脚本和应用脚本：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Vue 3 Plugin Example</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="my-plugin.js"></script>
</head>
<body>
  <div id="app">
    <button @click="callGlobalMethod">Call Global Method</button>
  </div>

  <script>
    const App = {
      template: `<button @click="callGlobalMethod">Call Global Method</button>`,
      methods: {
        callGlobalMethod() {
          this.$myGlobalMethod();
        }
      }
    };

    Vue.createApp(App).use(MyPlugin).mount('#app');
  </script>
</body>
</html>
```

### 11. 使用 `nextTick` 在 DOM 更新后执行操作

**示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p v-if="visible">Now you see me!</p>
      <button @click="show">Show</button>
    </div>
  `,
  setup() {
    const visible = Vue.ref(false);

    function show() {
      visible.value = true;
      Vue.nextTick(() => {
        console.log('DOM 已更新，visible 为', visible.value);
      });
    }

    return {
      visible,
      show
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 12. 使用 `defineAsyncComponent` 定义异步加载的组件

**示例：**

假设你有一个异步组件 `AsyncComponent.vue`，你可以这样定义和使用它：

```javascript
// app.js
const AsyncComponent = Vue.defineAsyncComponent(() =>
  // 模拟异步加载，可以替换为实际的动态导入
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        template: `<div>Async Component Loaded!</div>`
      });
    }, 1000);
  })
);

const App = {
  template: `
    <div>
      <Suspense>
        <template #default>
          <AsyncComponent />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  `,
  components: {
    AsyncComponent
  }
};

Vue.createApp(App).mount('#app');
```

### 13. 使用 `Teleport` 和 `Suspense` 控制高级渲染

**Teleport 示例：**

假设你想将一个模态框渲染到页面的特定位置。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Teleport Example</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <style>
    #modals {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border: 1px solid #ccc;
      pointer-events: all;
    }
  </style>
</head>
<body>
  <div id="app">
    <button @click="showModal = true">Show Modal</button>
    <Teleport to="#modals">
      <div v-if="showModal" class="modal">
        This is a modal
        <button @click="showModal = false">Close</button>
      </div>
    </Teleport>
  </div>

  <div id="modals"></div>

  <script>
    const App = {
      data() {
        return {
          showModal: false
        };
      }
    };

    Vue.createApp(App).mount('#app');
  </script>
</body>
</html>
```

**Suspense 示例：**

如前面的异步组件示例所示，`Suspense` 用于在异步组件加载时显示一个回退内容。

### 14. 使用 `h` (createVNode) 在渲染函数中创建虚拟节点

**示例：**

```javascript
// app.js
const App = {
  setup() {
    return () => Vue.h('div', { class: 'container' }, 'Hello with render function');
  }
};

Vue.createApp(App).mount('#app');
```

### 15. 使用 `toRefs` 和 `toRaw` 处理响应式对象

**`toRefs` 示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <p>Name: {{ name }}</p>
      <button @click="increment">Increment</button>
    </div>
  `,
  setup() {
    const state = Vue.reactive({
      count: 0,
      name: 'Vue 3'
    });

    const { count, name } = Vue.toRefs(state);

    function increment() {
      state.count++;
    }

    return {
      count,
      name,
      increment
    };
  }
};

Vue.createApp(App).mount('#app');
```

**`toRaw` 示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>Count: {{ state.count }}</p>
      <p>Raw Count: {{ rawState.count }}</p>
      <button @click="increment">Increment</button>
    </div>
  `,
  setup() {
    const state = Vue.reactive({
      count: 0
    });

    const rawState = Vue.toRaw(state);

    function increment() {
      state.count++;
    }

    return {
      state,
      rawState,
      increment
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 16. 使用 `markRaw` 和 `shallowReactive` 优化性能

**`markRaw` 示例：**

```javascript
// app.js
// 假设 SomeHeavyLibrary 是一个大型的不可响应的库
const SomeHeavyLibrary = {
  doSomething() {
    console.log('Doing something heavy...');
  }
};

const App = {
  template: `<div>{{ libraryInfo }}</div>`,
  setup() {
    const state = Vue.reactive({
      library: Vue.markRaw(SomeHeavyLibrary),
      libraryInfo: 'Library is marked as raw.'
    });

    // 使用库的方法
    state.library.doSomething();

    return {
      state
    };
  }
};

Vue.createApp(App).mount('#app');
```

**`shallowReactive` 示例：**

```javascript
// app.js
const App = {
  template: `
    <div>
      <p>Nested Count: {{ state.nested.count }}</p>
      <button @click="increment">Increment</button>
    </div>
  `,
  setup() {
    const state = Vue.shallowReactive({
      nested: { count: 0 }
    });

    function increment() {
      // 只有顶层属性是响应式的，nested.count 不会触发视图更新
      state.nested.count++;
      // 为了使视图更新，你需要手动触发
      state.nested = { ...state.nested };
    }

    return {
      state,
      increment
    };
  }
};

Vue.createApp(App).mount('#app');
```

### 总结

通过全局引入 `vue.global.js`，你可以直接使用 `Vue` 对象提供的所有方法，而无需使用模块系统。上述示例展示了如何在这种环境下使用 Vue 3 的各种功能，包括创建应用、响应式数据处理、生命周期钩子、组件定义与通信、插件使用等。根据你的项目需求，你可以灵活组合这些方法来构建功能丰富的 Vue 应用。

建议参考 [Vue 3 官方文档](https://v3.vuejs.org/) 以获取更详细的信息和更多示例。