### 1. **关于 `RANGE_TOKEN` 和 `CHECKBOX_RADIO_TOKEN`**
- `RANGE_TOKEN` 代表的是 `input[type=range]` 元素，它在一些浏览器（如 IE）中仅支持 `change` 事件，而不是 `input` 事件。`normalizeEvents` 函数会根据浏览器判断是否需要转换为 `input` 或 `change` 事件。
- `CHECKBOX_RADIO_TOKEN` 代表的是 `input[type=checkbox]` 和 `input[type=radio]` 元素。Vue 在这些元素上使用 `change` 事件处理它们的状态变化，但也要确保事件的监听器规范化。

### 2. **具体处理逻辑**
- 对于 `input[type=range]` 元素，如果浏览器是 IE，则将事件类型设置为 `change`，否则设置为 `input`。
- 对于 `input[type=checkbox]` 或 `input[type=radio]` 元素，将 `on.change` 事件监听器与 `on[CHECKBOX_RADIO_TOKEN]` 合并。

### 3. **HTML 模板例子**

假设 Vue 模板中有如下的表单元素：

```html
<template>
  <div>
    <!-- 1. Range input -->
    <input type="range" v-on="rangeEvents" />

    <!-- 2. Checkbox input -->
    <input type="checkbox" v-on="checkboxEvents" />

    <!-- 3. Radio input -->
    <input type="radio" v-on="radioEvents" />
  </div>
</template>
```

### 4. **事件绑定示例**

在组件的 `data` 或 `methods` 中，可能会定义与这些元素相关的事件对象。

```javascript
data() {
  return {
    rangeEvents: {
      [RANGE_TOKEN]: this.handleRangeStart,  // `RANGE_TOKEN` 用于 `input[type=range]`
      input: this.handleRangeInput
    },
    checkboxEvents: {
      [CHECKBOX_RADIO_TOKEN]: this.handleCheckboxChange  // `CHECKBOX_RADIO_TOKEN` 用于 checkbox/radio
    },
    radioEvents: {
      [CHECKBOX_RADIO_TOKEN]: this.handleRadioChange  // `CHECKBOX_RADIO_TOKEN` 用于 checkbox/radio
    }
  };
},
methods: {
  handleRangeStart() {
    console.log('Range event started');
  },
  handleRangeInput() {
    console.log('Range input value changed');
  },
  handleCheckboxChange() {
    console.log('Checkbox changed');
  },
  handleRadioChange() {
    console.log('Radio button selected');
  }
}
```

### 5. **`normalizeEvents` 函数的调用**

当 `v-on` 被用来绑定事件时，Vue 会在内部调用 `normalizeEvents` 函数。它会确保事件处理程序正确地添加到事件监听器中，特别是针对 `input[type=range]` 和 `input[type=checkbox]` 或 `input[type=radio]` 的特殊情况。

假设 `normalizeEvents` 函数在 `rangeEvents` 和 `checkboxEvents` 的绑定过程中被调用：

#### 对于 `rangeEvents`：

- 如果浏览器是 IE，`normalizeEvents` 会将 `on[RANGE_TOKEN]` 中的事件合并到 `on.change` 中，并删除 `RANGE_TOKEN`。
- 如果不是 IE，则将 `on[RANGE_TOKEN]` 中的事件合并到 `on.input` 中。

这确保了 `input[type=range]` 元素的事件能够被正确处理。

#### 对于 `checkboxEvents` 和 `radioEvents`：

- `normalizeEvents` 会将 `on[CHECKBOX_RADIO_TOKEN]` 中的事件合并到 `on.change` 中，这样 `change` 事件就能触发并处理状态的变化。

### 6. **最终生成的事件监听器**

假设 `isIE` 为 `false` 且 `RANGE_TOKEN` 和 `CHECKBOX_RADIO_TOKEN` 被正确处理，最终生成的事件监听器对象将如下所示：

```javascript
{
  rangeEvents: {
    input: [this.handleRangeStart, this.handleRangeInput] // 合并的事件
  },
  checkboxEvents: {
    change: [this.handleCheckboxChange] // 合并的事件
  },
  radioEvents: {
    change: [this.handleRadioChange] // 合并的事件
  }
}
```

这样，通过 `v-on="rangeEvents"`，`v-on="checkboxEvents"` 和 `v-on="radioEvents"` 的事件监听器就会正确绑定。

### 总结

- **`normalizeEvents` 函数** 主要是为了兼容不同浏览器对 `input[type=range]` 和 `input[type=checkbox]` / `input[type=radio]` 元素的事件处理方式。
- 它确保事件监听器的正确绑定，并且确保 Vue 在不同浏览器中都能处理这些常见表单元素的事件。