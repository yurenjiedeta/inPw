在 Vue.js 2.6.14 版本中，`createWatcher` 函数是用于创建组件内部的响应式侦听器（watcher）的一个辅助函数。理解 `createWatcher` 的实参传递过程，有助于深入掌握 Vue 的响应式系统和组件生命周期。以下将结合源码和示例详细解析 `createWatcher` 在被调用时实参的来龙去脉。

## `createWatcher` 函数解析

首先，我们来看一下 `createWatcher` 的定义：

```javascript
function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}
```

### 参数说明

- **vm**: Vue 实例。即当前组件实例。
- **expOrFn**: 表达式或函数。用于侦听的响应式属性或计算属性。
- **handler**: 处理函数，可以是函数、字符串（方法名），或对象（包含 `handler` 和其他选项）。
- **options**: 选项对象，如 `deep`、`immediate` 等，用于配置侦听器行为。

### 函数逻辑

1. **处理 `handler` 为对象的情况**:
   - 如果 `handler` 是一个纯对象（`isPlainObject(handler)` 为 `true`），则将 `options` 设置为 `handler` 对象本身，并将 `handler` 替换为 `handler.handler`，即处理函数。

2. **处理 `handler` 为字符串的情况**:
   - 如果 `handler` 是字符串，则将其视为 Vue 实例的方法名，获取对应的方法作为处理函数。

3. **调用 `$watch`**:
   - 最终，调用 `vm.$watch` 方法，传入解析后的 `expOrFn`、`handler` 和 `options`，创建侦听器。

## `createWatcher` 的调用场景

`createWatcher` 通常在 Vue 组件的初始化过程中被调用，用于处理组件选项中的 `watch` 属性。具体来说，当 Vue 实例化时，会解析 `watch` 配置，并通过 `createWatcher` 为每个侦听器创建相应的 watcher。

### 源码中的调用位置

在 Vue.js 2.6.14 的源码中，`createWatcher` 通常在组件实例化的初始化阶段被调用，具体位置位于 `src/core/instance/init.js` 中的 `initWatch` 函数。例如：

```javascript
function initWatch (vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    createWatcher(vm, key, handler)
  }
}
```

当 Vue 实例化时，会调用 `initWatch`，遍历 `watch` 对象的每一个键值对，并调用 `createWatcher` 来创建对应的 watcher。

## 示例解析

让我们通过一个具体的 Vue 组件示例，来详细解析 `createWatcher` 的实参传递过程。

### 示例组件

```javascript
new Vue({
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 3
      }
    }
  },
  methods: {
    handlerFunction(newVal, oldVal) {
      console.log(`a changed from ${oldVal} to ${newVal}`);
    }
  },
  watch: {
    a: 'handlerFunction', // 使用字符串引用方法
    b(newVal, oldVal) {    // 使用直接定义的函数
      console.log(`b changed from ${oldVal} to ${newVal}`);
    },
    'c.d': {
      handler(newVal, oldVal) { // 使用对象定义侦听器
        console.log(`c.d changed from ${oldVal} to ${newVal}`);
      },
      deep: true,               // 选项：深度侦听
      immediate: true           // 选项：立即执行
    }
  }
})
```

### `watch` 配置解析

在上面的组件中，`watch` 配置包含三种不同的侦听器定义方式：

1. **使用字符串引用方法** (`a: 'handlerFunction'`)
2. **使用直接定义的函数** (`b(newVal, oldVal) { ... }`)
3. **使用对象定义侦听器** (`'c.d': { handler(newVal, oldVal) { ... }, deep: true, immediate: true }`)

### `createWatcher` 的调用过程

#### 1. 侦听器 `a: 'handlerFunction'`

- **调用 `createWatcher`**:
  ```javascript
  createWatcher(vm, 'a', 'handlerFunction')
  ```
  
- **参数解析**:
  - `vm`: 当前 Vue 实例。
  - `expOrFn`: `'a'`，表示要侦听的属性。
  - `handler`: `'handlerFunction'`，字符串引用的方法名。
  - `options`: `undefined`（未提供）。

- **执行逻辑**:
  - 由于 `handler` 是字符串，`handler = vm['handlerFunction']`，即获取 `vm.handlerFunction` 方法。
  - 调用 `vm.$watch('a', vm.handlerFunction, undefined)` 创建侦听器。

#### 2. 侦听器 `b(newVal, oldVal) { ... }`

- **调用 `createWatcher`**:
  ```javascript
  createWatcher(vm, 'b', function(newVal, oldVal) {
    console.log(`b changed from ${oldVal} to ${newVal}`);
  })
  ```
  
- **参数解析**:
  - `vm`: 当前 Vue 实例。
  - `expOrFn`: `'b'`，表示要侦听的属性。
  - `handler`: 直接定义的函数。
  - `options`: `undefined`（未提供）。

- **执行逻辑**:
  - 由于 `handler` 是函数，直接使用。
  - 调用 `vm.$watch('b', handlerFunction, undefined)` 创建侦听器。

#### 3. 侦听器 `'c.d': { handler(newVal, oldVal) { ... }, deep: true, immediate: true }`

- **调用 `createWatcher`**:
  ```javascript
  createWatcher(vm, 'c.d', {
    handler(newVal, oldVal) {
      console.log(`c.d changed from ${oldVal} to ${newVal}`);
    },
    deep: true,
    immediate: true
  })
  ```
  
- **参数解析**:
  - `vm`: 当前 Vue 实例。
  - `expOrFn`: `'c.d'`，表示要侦听的深层属性。
  - `handler`: 对象 `{ handler: function, deep: true, immediate: true }`。
  - `options`: `undefined`（初始未提供）。

- **执行逻辑**:
  - 由于 `handler` 是对象，执行以下代码：
    ```javascript
    options = handler
    handler = handler.handler
    ```
    - `options` 变为 `{ handler: function, deep: true, immediate: true }`。
    - `handler` 变为 `function(newVal, oldVal) { ... }`。
  - 调用 `vm.$watch('c.d', handlerFunction, { deep: true, immediate: true })` 创建侦听器。

### 最终调用 `$watch`

上述每个 `createWatcher` 调用最终都会调用 `vm.$watch`，并传入解析后的参数。例如，第一个侦听器的最终调用是：

```javascript
vm.$watch('a', vm.handlerFunction, undefined)
```

## `vm.$watch` 的作用

`vm.$watch` 是 Vue 实例的方法，用于创建一个观察者（watcher），监听特定的响应式数据变化，并在变化时执行指定的回调函数。它的定义如下：

```javascript
Vue.prototype.$watch = function (
  expOrFn,
  cb,
  options
) {
  const vm = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  // 其他逻辑
}
```

在 `createWatcher` 内部，`$watch` 实际上会创建一个 `Watcher` 实例，绑定到 Vue 的响应式系统上，以便在数据变化时触发回调。

## 具体执行流程

总结上述内容，`createWatcher` 的执行流程如下：

1. **组件实例化时**，Vue 会解析 `watch` 选项，遍历每个侦听器配置。
2. **对于每个侦听器**，调用 `createWatcher(vm, expOrFn, handler, options)`：
   - 解析 `handler`，可能是函数、字符串或对象。
   - 根据 `handler` 的类型，调整 `handler` 和 `options` 的值。
3. **调用 `vm.$watch`**，创建具体的 watcher，注册到 Vue 的响应式系统中。
4. **当侦听的属性变化时**，相应的回调函数被触发，执行用户定义的逻辑。

## 完整示例回顾

以之前的示例组件为例，最终 Vue 实例会创建三个 watcher：

1. **监听 `a` 属性**：
   - 侦听表达式：`'a'`
   - 回调函数：`vm.handlerFunction`
   - 选项：`undefined`

2. **监听 `b` 属性**：
   - 侦听表达式：`'b'`
   - 回调函数：直接定义的匿名函数
   - 选项：`undefined`

3. **监听 `c.d` 属性**：
   - 侦听表达式：`'c.d'`
   - 回调函数：定义的匿名函数
   - 选项：`{ deep: true, immediate: true }`

每个 watcher 都会在对应的数据变化时，执行相应的回调函数，更新组件或执行其他逻辑。

## 总结

`createWatcher` 在 Vue 2.6.14 中是一个关键的辅助函数，用于根据组件的 `watch` 配置创建响应式侦听器。通过理解 `createWatcher` 的参数处理和调用流程，可以更好地掌握 Vue 的响应式机制以及组件的生命周期管理。结合具体的示例，清晰地展示了 `createWatcher` 如何处理不同类型的 `handler`，并最终调用 `$watch` 方法创建 watcher，从而实现数据变化的响应式处理。