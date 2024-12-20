app.runWithContext 是 Vue 3.3 版本引入的一个新 API，用于在应用上下文中执行代码。我来展示一些具体的使用场景。

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 提供一些全局值
app.provide('currentUser', {
  name: 'Alice',
  role: 'admin'
})

app.provide('theme', 'dark')

// 设置全局属性
app.config.globalProperties.$http = {
  get: (url) => fetch(url).then(r => r.json())
}

// 使用 runWithContext 在应用上下文中执行代码
const result = app.runWithContext(() => {
  // 在这个函数内部可以访问应用的依赖注入和全局配置
  const user = inject('currentUser')
  const theme = inject('theme')
  
  console.log('Current user:', user.name)  // 输出: Current user: Alice
  console.log('Current theme:', theme)     // 输出: Current theme: dark
  
  return {
    user,
    theme
  }
})

app.mount('#app')
```

一个更实际的例子，比如在应用外部使用注入的服务：

```javascript
// userService.js
import { ref } from 'vue'

export function createUserService() {
  const currentUser = ref(null)
  
  return {
    currentUser,
    login(userData) {
      currentUser.value = userData
    },
    logout() {
      currentUser.value = null
    }
  }
}
```

```javascript
// main.js
import { createApp } from 'vue'
import { createUserService } from './userService'
import App from './App.vue'

const app = createApp(App)
const userService = createUserService()

// 提供用户服务
app.provide('userService', userService)

// 创建一个在应用外部使用的辅助函数
export function useAppContext(fn) {
  return app.runWithContext(fn)
}

app.mount('#app')
```

```javascript
// externalScript.js
import { inject } from 'vue'
import { useAppContext } from './main'

// 在应用外部使用注入的服务
function handleExternalLogin(userData) {
  useAppContext(() => {
    const userService = inject('userService')
    userService.login(userData)
  })
}

// 使用示例
handleExternalLogin({
  id: 1,
  name: 'Bob',
  email: 'bob@example.com'
})
```

在测试场景中的使用：

```javascript
// userService.test.js
import { createApp } from 'vue'
import { createUserService } from './userService'
import { describe, test, expect } from 'vitest'

describe('UserService', () => {
  test('login should update currentUser', () => {
    const app = createApp({})
    const userService = createUserService()
    app.provide('userService', userService)
    
    app.runWithContext(() => {
      const injectedService = inject('userService')
      
      // 执行登录
      injectedService.login({ name: 'Test User' })
      
      // 验证状态更新
      expect(injectedService.currentUser.value.name).toBe('Test User')
    })
  })
})
```

在路由守卫中使用：

```javascript
// router.js
import { createRouter } from 'vue-router'
import { useAppContext } from './main'

const router = createRouter({
  // 路由配置...
})

router.beforeEach((to, from, next) => {
  useAppContext(() => {
    const userService = inject('userService')
    
    if (to.meta.requiresAuth && !userService.currentUser.value) {
      next('/login')
    } else {
      next()
    }
  })
})
```

一些使用注意事项：

1. runWithContext 主要用于在应用上下文之外需要访问依赖注入系统的场景

2. 这个方法返回传入函数的返回值，所以可以用来获取注入的值

3. 它在服务端渲染(SSR)场景特别有用，可以确保在正确的应用上下文中执行代码

4. 应该谨慎使用，不要过度依赖这个API，大多数情况下应该优先使用组件内的 provide/inject

这个 API 特别适合以下场景：
- 在应用外部使用注入的服务
- 测试需要依赖注入的代码
- 在路由守卫等特殊场景中访问应用级别的依赖
- 在插件系统中需要访问应用上下文