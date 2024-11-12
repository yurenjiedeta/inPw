在 **Vue.js 2.6.14** 版本的源码中，`normalizeEvent` 函数是一个用于处理事件名称的工具函数。它通过识别特定的前缀来解析事件名称，从而处理事件修饰符，如 `.once`、`.capture` 和 `.passive`。这些修饰符通常在 HTML 模板中使用，以修改事件监听器的行为。

### `normalizeEvent` 函数的工作原理

`normalizeEvent` 函数解析一个事件名称字符串，并识别任何对应于事件修饰符的前缀：

- **`&`（Passive 被动）**：表示事件监听器是被动的。
- **`~`（Once 一次性）**：表示事件监听器最多只会被调用一次。
- **`!`（Capture 捕获）**：表示事件监听器应在捕获阶段调用。

例如，一个内部事件名称如 `&~!click` 会被解析为：
- `passive: true`
- `once: true`
- `capture: true`
- `name: "click"`

### 对应的 HTML 模板语法

在 Vue 模板中，这些修饰符通过事件绑定指令 (`v-on` 或其简写 `@`) 中的点 (`.`) 语法来应用。以下是不同修饰符组合在模板中的使用方式，以及它们如何对应到 `normalizeEvent` 处理的内部事件名称：

1. **被动修饰符 (`.passive`)**
   ```html
   <div @scroll.passive="onScroll"></div>
   ```
   - **内部事件名称:** `&scroll`
   - **解析后的对象:**
     ```javascript
     {
       name: 'scroll',
       once: false,
       capture: false,
       passive: true
     }
     ```

2. **一次性修饰符 (`.once`)**
   ```html
   <button @click.once="handleClick">点击我</button>
   ```
   - **内部事件名称:** `~click`
   - **解析后的对象:**
     ```javascript
     {
       name: 'click',
       once: true,
       capture: false,
       passive: false
     }
     ```

3. **捕获修饰符 (`.capture`)**
   ```html
   <form @submit.capture="onSubmit"></form>
   ```
   - **内部事件名称:** `!submit`
   - **解析后的对象:**
     ```javascript
     {
       name: 'submit',
       once: false,
       capture: true,
       passive: false
     }
     ```

4. **组合修饰符 (`.passive.once.capture`)**
   ```html
   <button @click.passive.once.capture="handleClick">点击我</button>
   ```
   - **内部事件名称:** `&~!click`
   - **解析后的对象:**
     ```javascript
     {
       name: 'click',
       once: true,
       capture: true,
       passive: true
     }
     ```

### 示例解析

以组合修饰符为例：

```html
<button @click.passive.once.capture="handleClick">点击我</button>
```

- **使用的修饰符:**
  - `.passive` → 表示被动事件监听器 (`&`)
  - `.once` → 表示监听器应仅调用一次 (`~`)
  - `.capture` → 表示监听器应在捕获阶段调用 (`!`)

- **内部表示:**
  - 事件名称字符串变为 `&~!click`。
  - `normalizeEvent` 解析该字符串并返回：
    ```javascript
    {
      name: 'click',
      once: true,
      capture: true,
      passive: true
    }
    ```

### 总结

在 Vue 2.6.14 中，当你在 HTML 模板中使用事件修饰符时，Vue 会在内部通过特定字符前缀来表示这些修饰符。`normalizeEvent` 函数负责解析这些带有前缀的事件名称，并返回一个包含事件名称及其修饰符状态的对象。以下是一个快速参考表：

| 修饰符     | 前缀  | 示例模板                                | 内部事件名称 |
| ---------- | ----- | --------------------------------------- | ------------ |
| `.passive` | `&`   | `@event.passive="handler"`              | `&event`     |
| `.once`    | `~`   | `@event.once="handler"`                 | `~event`     |
| `.capture` | `!`   | `@event.capture="handler"`              | `!event`     |
| 组合修饰符 | `&~!` | `@event.passive.once.capture="handler"` | `&~!event`   |

通过在 Vue 模板中使用这些修饰符，你可以更精确地控制事件监听器的行为，而 Vue 会在内部进行规范化处理，确保它们按预期工作。

在 **Vue.js 2.6.14** 的源码中，事件名称在传递给 `normalizeEvent` 函数之前，会根据事件修饰符（如 `.passive`、`.once`、`.capture`）被添加特定的符号前缀（`&`、`~`、`!`）。这些前缀用于内部标识事件的修饰符状态。以下是详细的解释以及相关的源码片段说明。

### 1. 事件修饰符的处理流程

当 Vue 编译模板时，会解析事件监听器（例如 `v-on` 或 `@` 指令）。在解析过程中，Vue 会识别事件修饰符，并将这些修饰符转换为特定的符号前缀，附加在事件名称的前面。这些带有前缀的事件名称随后会被传递给 `normalizeEvent` 函数进行规范化处理。

### 2. 源码解析

以下是 Vue 2.6.14 源码中相关部分的解析，展示了如何在内部为事件名称添加符号前缀。

#### a. 编译阶段：处理事件修饰符并添加前缀

在 Vue 的模板编译阶段，事件监听器会被解析并处理其修饰符。这一过程主要发生在 `src/compiler/parser/index.js` 文件中的 `addHandler` 函数中。以下是一个简化的代码示例：

```javascript
// src/compiler/parser/index.js

function addHandler (
  event,
  handler,
  modifiers,
  important
) {
  // 初始事件名称
  let eventName = event;

  // 处理修饰符并添加对应的前缀
  if (modifiers) {
    if (modifiers.capture) {
      eventName = '!' + eventName;
    }
    if (modifiers.once) {
      eventName = '~' + eventName;
    }
    if (modifiers.passive) {
      eventName = '&' + eventName;
    }
    // 其他修饰符处理...
  }

  // 将带前缀的事件名称和处理函数添加到事件对象
  const newHandler = { value: handler, modifiers: modifiers };
  // 例如，将事件名称 'click' 转换为 '&~!click'
  // 并将 newHandler 添加到对应的事件列表中
  // 具体实现省略
}
```

在上述代码中：

- **`.capture` 修饰符**：如果存在 `.capture`，则在事件名称前添加 `!`。
- **`.once` 修饰符**：如果存在 `.once`，则在事件名称前添加 `~`。
- **`.passive` 修饰符**：如果存在 `.passive`，则在事件名称前添加 `&`。

例如，对于模板中的事件绑定：

```html
<button @click.passive.once.capture="handleClick">点击我</button>
```

上述 `addHandler` 函数会将事件名称 `'click'` 转换为 `'&~!click'`，并将其与处理函数 `handleClick` 一起存储。

#### b. 规范化事件名称

带有前缀的事件名称随后会传递给 `normalizeEvent` 函数进行解析。`normalizeEvent` 函数会识别这些前缀并将其转换为对应的修饰符属性。

```javascript
// src/core/util/index.js

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // 优先级次之
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});
```

例如，对于内部事件名称 `'&~!click'`，`normalizeEvent` 函数会解析为：

```javascript
{
  name: 'click',
  once: true,
  capture: true,
  passive: true
}
```

### 3. 完整示例

综合上述步骤，以下是一个完整的示例，展示了如何从模板中的事件绑定到内部事件名称的转换过程。

#### a. 模板中的事件绑定

```html
<button @click.passive.once.capture="handleClick">点击我</button>
```

#### b. 编译阶段：添加前缀

在编译阶段，`addHandler` 函数会将事件名称 `'click'` 转换为 `'&~!click'`，并与处理函数 `handleClick` 一起存储。

#### c. 运行时：规范化事件名称

在事件触发时，Vue 会调用 `normalizeEvent` 函数来解析 `'&~!click'`：

```javascript
const normalized = normalizeEvent('&~!click');
// 结果：
{
  name: 'click',
  once: true,
  capture: true,
  passive: true
}
```

随后，Vue 会根据这些修饰符属性来正确地添加事件监听器，例如使用 `addEventListener` 时传递相应的选项：

```javascript
element.addEventListener('click', handleClick, {
  capture: true,
  once: true,
  passive: true
});
```

### 4. 总结

在 Vue.js 2.6.14 中，事件名称在传递给 `normalizeEvent` 函数之前，通过在编译阶段识别并处理事件修饰符，添加了特定的符号前缀（`&`、`~`、`!`）。这些前缀用于内部标识事件的修饰符状态，从而在运行时能够正确地应用事件监听器的选项。以下是关键步骤的快速概览：

1. **模板编译阶段**：
   - 解析事件绑定中的修饰符。
   - 根据修饰符添加对应的符号前缀到事件名称。

2. **运行时阶段**：
   - 调用 `normalizeEvent` 函数解析带前缀的事件名称。
   - 根据解析结果设置事件监听器的选项（如 `capture`、`once`、`passive`）。

通过这种内部机制，Vue 能够高效地处理复杂的事件修饰符组合，并确保事件监听器的行为符合开发者在模板中指定的修饰符配置。