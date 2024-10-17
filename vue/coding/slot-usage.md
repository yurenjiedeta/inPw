在 Vue 2.6 中，插槽（Slot）和作用域插槽（Scoped Slot）是用于在组件之间传递内容的重要机制。它们的使用在 Vue 3 中有所变化，但 Vue 2.6 的方式仍然广泛应用于许多项目中。让我们深入了解它们的具体用法。

### 1. 普通插槽（Slot）
普通插槽允许我们在子组件中定义一个占位符，父组件可以将内容传递到这个插槽中。

#### 使用步骤：
1. **在子组件中定义插槽：**
   使用 `<slot>` 标签定义一个插槽。

   ```vue
   <!-- 子组件 (ChildComponent.vue) -->
   <template>
     <div>
       <slot>默认内容</slot>
     </div>
   </template>
   ```

2. **在父组件中传递内容：**
   在父组件使用子组件时，向子组件的插槽中插入内容。

   ```vue
   <!-- 父组件 -->
   <template>
     <child-component>
       <p>这是传递给子组件的内容</p>
     </child-component>
   </template>
   ```

   这样，子组件中的 `<slot>` 标签会被父组件传递的 `<p>` 替换，如果父组件不传递内容，插槽则会显示“默认内容”。

#### 多个插槽（具名插槽）：
如果子组件需要多个插槽，可以通过具名插槽的方式实现。

1. **在子组件中定义具名插槽：**
   
   ```vue
   <template>
     <div>
       <slot name="header">默认头部内容</slot>
       <slot>默认主体内容</slot>
       <slot name="footer">默认底部内容</slot>
     </div>
   </template>
   ```

2. **在父组件中为具名插槽传递内容：**
   
   ```vue
   <template>
     <child-component>
       <template v-slot:header>
         <h1>这是头部内容</h1>
       </template>

       <p>这是主体内容</p>

       <template v-slot:footer>
         <footer>这是底部内容</footer>
       </template>
     </child-component>
   </template>
   ```

在 Vue 2.6 中，`v-slot` 是用于绑定具名插槽的缩写。它取代了旧的 `slot-scope` 和 `slot` 特性，使语法更加简洁。

---

### 2. 作用域插槽（Scoped Slot）

作用域插槽允许子组件将其内部的数据传递给父组件，父组件可以利用这些数据来动态渲染插槽的内容。它适用于需要父组件自定义展示方式的场景。

#### 使用步骤：

1. **在子组件中定义作用域插槽：**
   在 `<slot>` 标签中提供要传递的数据，通过 `slot-scope` 或 `v-slot` 接收作用域数据。

   ```vue
   <!-- 子组件 -->
   <template>
     <div>
       <slot :user="userData"></slot>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         userData: { name: 'Alice', age: 25 }
       }
     }
   }
   </script>
   ```

   这里子组件将 `userData` 传递给父组件，作为作用域插槽的内容。

2. **在父组件中接收和使用插槽数据：**

   使用 `v-slot` 来接收子组件传递的作用域数据，并根据需要渲染内容。

   ```vue
   <!-- 父组件 -->
   <template>
     <child-component>
       <!-- v-slot 可以接收作用域插槽传递的数据 -->
       <template v-slot:default="slotProps">
         <p>用户名: {{ slotProps.user.name }}</p>
         <p>年龄: {{ slotProps.user.age }}</p>
       </template>
     </child-component>
   </template>
   ```

在这个例子中，父组件通过 `slotProps` 访问子组件传递过来的 `userData`，然后根据这些数据自定义渲染。

#### 简化语法：
对于默认插槽，可以简写为：

```vue
<template #default="slotProps">
  <p>用户名: {{ slotProps.user.name }}</p>
  <p>年龄: {{ slotProps.user.age }}</p>
</template>
```

### 总结：

- **普通插槽**：用于传递静态内容，父组件可以将内容传递给子组件显示。
- **具名插槽**：当需要多个插槽时，可以通过名字来区分。
- **作用域插槽**：用于传递动态数据，子组件将数据传递给父组件，父组件可以根据数据来动态渲染内容。

插槽和作用域插槽为 Vue 组件提供了很大的灵活性，特别是在组件复用和自定义渲染场景下非常有用。