我来展示 Vue3 中 defineComponent 的几种常见使用方式。

1. 基础用法 - 选项式 API：

```javascript
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfile',
  props: {
    userId: {
      type: Number,
      required: true
    },
    username: String
  },
  data() {
    return {
      userDetails: null,
      loading: false
    }
  },
  methods: {
    async fetchUserDetails() {
      this.loading = true
      try {
        // 模拟API调用
        this.userDetails = await fetchUser(this.userId)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchUserDetails()
  }
})
```

2. 使用 setup 函数的组合式 API：

```javascript
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'TodoList',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const todos = ref([])
    const newTodo = ref('')

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value,
          completed: false
        })
        newTodo.value = ''
      }
    }

    const toggleTodo = (id) => {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    onMounted(() => {
      // 可以在这里加载初始数据
      console.log('Todo list mounted with ID:', props.listId)
    })

    return {
      todos,
      newTodo,
      addTodo,
      toggleTodo
    }
  }
})
```

3. 带类型定义的 TypeScript 用法：

```typescript
import { defineComponent, PropType } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export default defineComponent({
  name: 'UserList',
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true
    },
    filterRole: {
      type: String as PropType<'admin' | 'user' | 'all'>,
      default: 'all'
    }
  },
  computed: {
    filteredUsers(): User[] {
      if (this.filterRole === 'all') {
        return this.users
      }
      return this.users.filter(user => user.role === this.filterRole)
    }
  },
  methods: {
    handleUserClick(user: User): void {
      this.$emit('user-selected', user)
    }
  }
})
```

4. 使用 setup 语法糖：

```typescript
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },
  emits: ['response'],
  setup(props, { emit }) {
    const router = useRouter()
    
    const handleClick = () => {
      emit('response', 'Button clicked!')
      router.push('/next-page')
    }
    
    return { handleClick }
  }
})
```

5. 混合使用生命周期钩子和计算属性：

```javascript
import { defineComponent, ref, computed, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const quantity = ref(1)
    const isInStock = computed(() => props.product.stock > 0)
    const totalPrice = computed(() => props.product.price * quantity.value)

    watch(quantity, (newVal, oldVal) => {
      console.log(`数量从 ${oldVal} 改变为 ${newVal}`)
    })

    onMounted(() => {
      console.log('组件已挂载')
    })

    return {
      quantity,
      isInStock,
      totalPrice
    }
  }
})
```

6. 与自定义组合函数（composables）一起使用：

```javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return {
    count,
    increment,
    decrement
  }
}

// CounterComponent.vue
import { defineComponent } from 'vue'
import { useCounter } from './useCounter'

export default defineComponent({
  name: 'CounterComponent',
  setup() {
    const { count, increment, decrement } = useCounter(0)
    
    return {
      count,
      increment,
      decrement
    }
  }
})
```

使用 defineComponent 的主要优点：

1. 提供更好的 TypeScript 类型推导
2. IDE 能提供更好的代码补全
3. 让组件选项更加明确和可预测
4. 在构建时可以进行更好的代码优化
5. 提供更好的运行时错误提示

记住，虽然 defineComponent 不是必需的，但使用它可以获得更好的 TypeScript 支持和 IDE 提示。