我来展示 Vue3 中 useModel 的使用示例。useModel 是 Vue 3.4 新增的组合式 API，用于简化组件的双向绑定。

```vue
<!-- CustomInput.vue -->
<script setup>
import { useModel } from 'vue'

// 基本用法：直接绑定 modelValue
const model = useModel('modelValue')

// 等价于:
// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])
// const model = computed({
//   get: () => props.modelValue,
//   set: (value) => emit('update:modelValue', value)
// })
</script>

<template>
  <input 
    type="text"
    :value="model"
    @input="model = $event.target.value"
  />
</template>
```

使用这个组件：

```vue
<!-- App.vue -->
<template>
  <CustomInput v-model="text" />
  <p>当前输入: {{ text }}</p>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
```

一个更复杂的例子，使用自定义 v-model 名称和修饰符：

```vue
<!-- CustomCheckbox.vue -->
<script setup>
import { useModel } from 'vue'

// 使用自定义的 v-model 名称
const checked = useModel('checked')

// 使用修饰符
const delayed = useModel('delayed', {
  // 设置默认值
  default: false,
  
  // 处理修饰符
  modifiers: {
    // 处理 v-model.debounce 修饰符
    debounce: (value) => {
      let timer
      return (newValue) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value(newValue)
        }, 500)
      }
    }
  }
})

// 本地计算属性
const displayValue = computed(() => 
  checked.value ? '选中' : '未选中'
)
</script>

<template>
  <div>
    <input 
      type="checkbox"
      :checked="checked"
      @change="checked = $event.target.checked"
    />
    <span>{{ displayValue }}</span>
    
    <input 
      type="text"
      :value="delayed"
      @input="delayed = $event.target.value"
    />
  </div>
</template>
```

使用带修饰符的组件：

```vue
<!-- App.vue -->
<template>
  <div>
    <CustomCheckbox 
      v-model:checked="isChecked"
      v-model:delayed.debounce="delayedText"
    />
    
    <p>复选框状态: {{ isChecked }}</p>
    <p>延迟输入: {{ delayedText }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isChecked = ref(false)
const delayedText = ref('')
</script>
```

一个表单组件的示例，同时使用多个 v-model：

```vue
<!-- UserForm.vue -->
<script setup>
import { useModel } from 'vue'

const username = useModel('username')
const email = useModel('email')
const age = useModel('age', {
  // 转换为数字类型
  transform: {
    in: Number,
    out: String
  }
})
</script>

<template>
  <form @submit.prevent>
    <div>
      <label>用户名:</label>
      <input 
        type="text"
        :value="username"
        @input="username = $event.target.value"
      />
    </div>
    
    <div>
      <label>邮箱:</label>
      <input 
        type="email"
        :value="email"
        @input="email = $event.target.value"
      />
    </div>
    
    <div>
      <label>年龄:</label>
      <input 
        type="number"
        :value="age"
        @input="age = $event.target.value"
      />
    </div>
  </form>
</template>
```

使用表单组件：

```vue
<template>
  <UserForm
    v-model:username="formData.username"
    v-model:email="formData.email"
    v-model:age="formData.age"
  />
  
  <pre>{{ formData }}</pre>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  email: '',
  age: 0
})
</script>
```

这些例子展示了 useModel 的多种用法：
1. 基本的双向绑定
2. 自定义 v-model 名称
3. 使用修饰符
4. 值的转换
5. 多个 v-model 的组合使用

useModel 极大地简化了双向绑定的实现，让代码更加简洁和易于维护。相比传统的 props + emit 方式，它提供了更优雅的 API。