在 Vue 3 中，`useTemplateRef` 是一个工具函数，可以用于获取模板中的元素或组件引用。虽然 Vue 本身并没有直接提供这个工具函数，但它可以通过组合 Vue 3 的 `ref` 和 `onMounted`/`onUpdated` 实现。

以下是一个可能的实现和使用例子：

------

### 自定义 `useTemplateRef` 实现

```javascript
import { ref, onMounted, onUpdated } from 'vue';

function useTemplateRef() {
  const templateRef = ref(null);

  const setRef = (el) => {
    templateRef.value = el;
  };

  return [templateRef, setRef];
}
```

------

### 使用 `useTemplateRef` 示例

下面展示如何用这个方法获取 DOM 元素或子组件的引用：

#### 示例：操作 DOM 元素

```vue
<template>
  <div>
    <h1 ref="titleRef">Hello Vue 3</h1>
    <button @click="changeTitle">Change Title</button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useTemplateRef } from './useTemplateRef'; // 引入自定义方法

export default {
  setup() {
    // 使用 useTemplateRef 获取 DOM 引用
    const [titleRef, setTitleRef] = useTemplateRef();

    const changeTitle = () => {
      if (titleRef.value) {
        titleRef.value.innerText = 'Title Changed!';
      }
    };

    onMounted(() => {
      console.log('Title element:', titleRef.value); // 获取 DOM 元素
    });

    return {
      setTitleRef, // 用于绑定 ref
      changeTitle,
    };
  },
};
</script>
```

在模板中，将 `setTitleRef` 绑定到 `ref` 属性即可。

------

#### 示例：获取子组件引用

```vue
<template>
  <div>
    <ChildComponent ref="childRef" />
    <button @click="callChildMethod">Call Child Method</button>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useTemplateRef } from './useTemplateRef'; // 引入自定义方法
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  setup() {
    // 使用 useTemplateRef 获取组件引用
    const [childRef, setChildRef] = useTemplateRef();

    const callChildMethod = () => {
      if (childRef.value) {
        childRef.value.someChildMethod(); // 调用子组件方法
      }
    };

    onMounted(() => {
      console.log('Child component instance:', childRef.value); // 获取子组件实例
    });

    return {
      setChildRef,
      callChildMethod,
    };
  },
};
</script>
```

------

#### 子组件定义（ChildComponent.vue）

```vue
<template>
  <div>Child Component</div>
</template>

<script>
export default {
  methods: {
    someChildMethod() {
      console.log('Child method called!');
    },
  },
};
</script>
```

------

### 总结

`useTemplateRef` 是一个自定义的便捷方法，基于 Vue 3 的 `ref` 和生命周期钩子，可以方便地获取 DOM 元素或子组件引用。通过这种方式，可以更灵活地管理模板中的引用绑定。