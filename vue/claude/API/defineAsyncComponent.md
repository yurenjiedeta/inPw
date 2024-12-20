我来展示几个 Vue3 中 defineAsyncComponent 的实用示例。defineAsyncComponent 主要用于异步组件的加载，这对于代码分割和优化应用性能很有帮助。

```javascript
// 1. 基础用法 - 使用 import 函数
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

// 2. 带配置选项的完整用法
const AsyncComponentWithOptions = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/ComplexComponent.vue'),
  
  // 加载异步组件时使用的组件
  loadingComponent: LoadingSpinner,
  
  // 加载失败时使用的组件
  errorComponent: ErrorDisplay,
  
  // 展示加载组件前的延迟时间。默认：200ms
  delay: 200,
  
  // 如果提供了 timeout，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity
  timeout: 3000,
  
  // 定义组件是否可挂起 (支持 Suspense)。默认：true
  suspensible: true,
  
  /**
   * 错误处理函数
   * @param {Error} err - 错误对象
   * @param {Function} retry - 重试函数
   * @param {Function} fail - 失败函数
   */
  onError(err, retry, fail) {
    if (err.message.match(/fetch/)) {
      // 如果是网络错误，尝试重试
      retry()
    } else {
      // 其他错误则直接失败
      fail()
    }
  },
})

// 3. 在组件中使用的完整示例
export default {
  name: 'App',
  components: {
    // 注册异步组件
    AsyncComponent,
    AsyncComponentWithOptions
  },
  setup() {
    // 也可以在 setup 中定义异步组件
    const DynamicComponent = defineAsyncComponent(() =>
      import(`./components/${props.componentName}.vue`)
    )
    
    return {
      DynamicComponent
    }
  },
  template: `
    <div>
      <!-- 基础用法 -->
      <AsyncComponent />
      
      <!-- 带配置的用法 -->
      <AsyncComponentWithOptions />
      
      <!-- 配合 Suspense 使用 -->
      <Suspense>
        <template #default>
          <DynamicComponent />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  `
}

// 4. 错误处理和重试示例
const RetryableComponent = defineAsyncComponent({
  loader: async () => {
    try {
      const component = await import('./components/DataComponent.vue')
      return component
    } catch (error) {
      console.error('组件加载失败:', error)
      throw error
    }
  },
  onError(error, retry, fail) {
    if (error.message.includes('network')) {
      // 网络错误，等待 2s 后重试
      setTimeout(() => {
        retry()
      }, 2000)
    } else {
      // 其他错误直接失败
      fail()
    }
  },
  // 自定义加载组件
  loadingComponent: {
    template: '<div class="loading">加载中...</div>'
  },
  // 自定义错误组件
  errorComponent: {
    template: '<div class="error">加载失败，请稍后重试</div>'
  },
  // 显示加载组件前的延迟时间
  delay: 200,
  // 超时时间
  timeout: 10000
})

```

这些示例展示了 defineAsyncComponent 的几种常见使用场景：

1. 最简单的用法就是传入一个返回 Promise 的函数，通常是使用 import() 语法
2. 完整配置选项的使用，包括加载状态、错误处理等
3. 在组件中的实际应用，包括与 Suspense 组件的配合使用
4. 带有重试机制的错误处理示例

使用 defineAsyncComponent 的主要优势是：
- 可以实现代码分割，提高应用性能
- 提供完善的加载状态和错误处理机制
- 与 Suspense 组件配合使用，优化用户体验

需要注意的是，异步组件最好用于较大的组件，对于小组件来说，异步加载的开销可能会超过带来的收益。你想了解这些示例中的哪部分的更多细节吗？