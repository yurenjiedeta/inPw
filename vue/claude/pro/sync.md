```vue
// ParentComponent.vue
<template>
  <div>
    <h2>Current Title: {{ pageTitle }}</h2>
    <child-component :title.sync="pageTitle"></child-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: 'Initial Title'
    }
  }
}
</script>

// ChildComponent.vue
<template>
  <div>
    <input :value="title" @input="updateTitle($event.target.value)">
    <button @click="updateTitle('New Title')">Update Title</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    updateTitle(newValue) {
      this.$emit('update:title', newValue)
    }
  }
}
</script>

```

关键点:
1. 父组件使用`:title.sync="pageTitle"`
2. 子组件通过`update:title`事件更新
3. 子组件不能直接修改prop，必须触发事件