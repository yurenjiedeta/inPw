在 Vue 2.6.14 版本的源码中，`normalizeScopedSlots` 函数的主要作用是**对作用域插槽（scoped slots）和普通插槽进行标准化**。Vue 在处理插槽时，既有普通插槽（普通插槽不依赖父组件上下文的数据），也有作用域插槽（可以传递上下文数据）。这个函数的功能是将传递进来的插槽进行标准化，以便在后续渲染中更方便地处理和访问它们。

### 具体作用
1. **缓存优化**：通过检测插槽是否已经标准化（`slots._normalized`），避免重复标准化操作，提高性能。
2. **快速路径**：
   - 如果插槽已经被标准化，直接返回标准化结果（`slots._normalized`）。
   - 如果插槽是稳定的（`$stable`）并且前一次标准化的结果（`prevSlots`）可以复用，直接返回之前的标准化结果。
3. **标准化处理**：如果没有命中快速路径，则遍历作用域插槽和普通插槽，对其进行标准化。对于作用域插槽使用 `normalizeScopedSlot` 函数处理，对于普通插槽使用 `proxyNormalSlot` 进行代理。
4. **插槽稳定性**：通过在标准化结果中定义一些额外的属性，如 `$stable`（插槽是否稳定）、`$key`（插槽的唯一标识符）以及 `$hasNormal`（是否有普通插槽），为后续的渲染和更新提供优化信息。

### Mock 数据运行示例

假设我们有以下模拟数据，表示组件中的插槽：

```js
const scopedSlots = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  slotB: (props) => `Scoped Slot B: ${props.value}`,
  $stable: true,  // 表示插槽是稳定的
  $key: 'unique-key'
};

const normalSlots = {
  slotC: () => `Normal Slot C`
};

const prevSlots = {
  slotA: (props) => `Scoped Slot A: ${props.value}`,
  $stable: true,
  $key: 'unique-key'
};
```

使用 `normalizeScopedSlots` 函数进行标准化：

```js
const result = normalizeScopedSlots(scopedSlots, normalSlots, prevSlots);
console.log(result);
```

### 执行流程
1. **缓存路径**：因为 `scopedSlots.$stable` 为 `true`，而且 `prevSlots.$key` 与当前插槽的 `$key` 相同，因此函数会命中快速路径2，直接返回 `prevSlots`，不用重新标准化。
   
   **输出**：
   ```js
   {
     slotA: (props) => `Scoped Slot A: ${props.value}`,
     $stable: true,
     $key: 'unique-key'
   }
   ```

2. **插槽标准化**：
   如果 `scopedSlots` 没有 `$stable` 或者 `prevSlots` 不存在，则会进入标准化流程，遍历 `scopedSlots` 和 `normalSlots`，将它们标准化为一个对象，并将一些额外的属性（如 `$stable`）添加到标准化结果中。

### 结论：
`normalizeScopedSlots` 的作用是对作用域插槽和普通插槽进行标准化，以便在后续的渲染和更新过程中优化处理。它通过缓存机制和快速路径来避免不必要的标准化，提高了渲染性能。