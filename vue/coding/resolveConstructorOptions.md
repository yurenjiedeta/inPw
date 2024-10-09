在 Vue.js 2.6.14 的源码中，`resolveConstructorOptions` 函数的条件判断 `if (superOptions !== cachedSuperOptions)` 用于检测组件的父构造函数（`Ctor.super`）的选项是否发生了变化。如果父构造函数的选项自上次缓存以来发生了变化，函数将重新解析和合并选项，以确保子组件的配置是最新的。

### 何种操作会导致 `superOptions !== cachedSuperOptions`

以下几种情况可能会导致 `superOptions` 与 `cachedSuperOptions` 不同，从而触发条件 `if (superOptions !== cachedSuperOptions)`：

1. **热模块替换（Hot Module Replacement, HMR）**：
   - **描述**：在开发环境中，HMR 允许在不重新加载整个页面的情况下，动态替换、添加或删除模块。当父组件的代码发生变化并通过 HMR 更新时，父构造函数的选项会被重新解析。
   - **影响**：子组件的 `cachedSuperOptions` 仍然是旧的父选项，而 `superOptions` 则是新的父选项，因此两者不相等，触发条件，进而重新合并子组件的选项。

2. **动态修改父组件的选项**：
   - **描述**：在应用运行期间，通过编程方式动态修改父组件的选项（例如，使用 `Vue.mixin`、修改全局配置或直接更改构造函数的 `options` 属性）。
   - **影响**：如果父构造函数的选项被修改，`superOptions` 将反映这些更改，而 `cachedSuperOptions` 仍然保持旧值，两者不相等，触发条件，重新解析子组件的选项。

3. **全局混入（Global Mixins）的变化**：
   - **描述**：使用 `Vue.mixin` 添加全局混入，改变了所有组件的选项解析。
   - **影响**：全局混入会影响到所有构造函数的选项，包括父构造函数。如果全局混入发生变化，父构造函数的选项会更新，从而导致 `superOptions` 与 `cachedSuperOptions` 不同。

4. **组件继承链中间的父组件选项变化**：
   - **描述**：在组件继承链中，如果中间某个父组件的选项被修改（例如，通过 `Vue.extend` 创建的父组件被重新定义或修改）。
   - **影响**：子组件的 `superOptions` 会检测到这些变化，与 `cachedSuperOptions` 不同，触发条件，重新合并选项。

### 具体示例

#### 示例 1：热模块替换（HMR）

假设在开发环境中，你有一个基类组件 `BaseComponent`，以及一个通过 `Vue.extend` 创建的子组件 `MyComponent`。当你修改 `BaseComponent` 的代码并保存，HMR 会重新加载 `BaseComponent`，导致其选项发生变化。

```javascript
// BaseComponent.js
export const BaseComponent = Vue.extend({
  name: 'BaseComponent',
  data() {
    return {
      baseMessage: 'Hello from Base'
    };
  },
  methods: {
    baseGreet() {
      console.log(this.baseMessage);
    }
  }
});

// MyComponent.js
import { BaseComponent } from './BaseComponent';
export const MyComponent = BaseComponent.extend({
  name: 'MyComponent',
  data() {
    return {
      message: 'Hello from MyComponent'
    };
  },
  methods: {
    greet() {
      console.log(this.message);
    }
  }
});
```

当 `BaseComponent` 通过 HMR 更新后，`MyComponent` 的 `resolveConstructorOptions` 会检测到 `BaseComponent` 的选项变化（`superOptions !== cachedSuperOptions`），并重新合并 `MyComponent` 的选项。

#### 示例 2：动态修改父组件选项

```javascript
// 动态修改父组件的选项
BaseComponent.options.data = function() {
  return {
    baseMessage: 'Updated Base Message'
  };
};

// 触发 resolveConstructorOptions
resolveConstructorOptions(MyComponent);
```

在这种情况下，`BaseComponent` 的 `options` 被动态修改，导致 `superOptions` 与 `cachedSuperOptions` 不同，`MyComponent` 的选项需要重新解析和合并。

### 代码流程解析

以下是触发条件的具体流程：

1. **初始解析**：
   - `MyComponent` 被定义，`resolveConstructorOptions(MyComponent)` 被调用。
   - `superOptions` 被缓存为 `BaseComponent.options`。

2. **父组件选项变化**：
   - `BaseComponent.options` 发生变化（例如，通过 HMR 或动态修改）。
   - 再次调用 `resolveConstructorOptions(MyComponent)`。

3. **条件判断**：
   - 比较新的 `superOptions`（当前 `BaseComponent.options`）与 `cachedSuperOptions`（之前缓存的 `BaseComponent.options`）。
   - 由于选项已变化，`superOptions !== cachedSuperOptions` 为 `true`。

4. **更新选项**：
   - 更新 `MyComponent.superOptions` 为新的 `superOptions`。
   - 解析并合并任何修改的选项（如 `extendOptions`）。
   - 生成新的 `MyComponent.options`，确保它包含最新的父组件选项。

### 总结

`if (superOptions !== cachedSuperOptions)` 条件的触发主要用于确保子组件始终基于最新的父组件选项进行配置。这在开发过程中尤为重要，尤其是在使用热模块替换（HMR）时，可以动态更新组件而无需刷新整个页面。通过这种机制，Vue 保证了组件继承体系中的一致性和灵活性，使开发者能够更高效地管理和维护复杂的组件结构。