在HTML的DOM API中，`addEventListener` 方法用于为指定的事件类型注册事件处理程序。该方法通常接受 **三个参数**，而不是四个。下面是对这三个参数的详细解释：

1. **`type`（事件类型）**  
   字符串，表示要监听的事件类型，例如 `'click'`、`'mouseover'`、`'keydown'` 等。

2. **`listener`（事件处理函数）**  
   一个函数，当指定类型的事件被触发时调用。例如：
   ```javascript
   function handleClick(event) {
     console.log('元素被点击了');
   }
   element.addEventListener('click', handleClick);
   ```

3. **`options` 或 `useCapture`（选项对象或布尔值）**  
   这是一个可选参数，用于指定事件监听器的行为。它可以是一个布尔值或一个包含多个选项的对象。

   - **布尔值（`useCapture`）**  
     如果传递一个布尔值，`true` 表示事件监听器在捕获阶段执行，`false`（默认值）表示在冒泡阶段执行。
     ```javascript
     element.addEventListener('click', handleClick, true); // 捕获阶段
     element.addEventListener('click', handleClick, false); // 冒泡阶段
     ```

   - **选项对象（`options`）**  
     作为对象传递，可以更精细地控制事件监听器的行为，包括以下属性：
     - **`capture`**（布尔值）：同 `useCapture`，决定事件是在捕获阶段还是冒泡阶段触发。
     - **`once`**（布尔值）：如果设为 `true`，事件处理函数在被调用一次后会自动移除。
     - **`passive`**（布尔值）：如果设为 `true`，表示事件处理函数不会调用 `preventDefault()`，这对于提升滚动性能有帮助。
     - **`signal`**（AbortSignal）：允许通过 `AbortController` 来中断事件监听器。
     
     示例：
     ```javascript
     element.addEventListener('click', handleClick, {
       capture: false,
       once: true,
       passive: true
     });
     ```

**关于第四个参数：**

标准的 `addEventListener` 方法 **只接受三个参数**。如果你在代码中看到第四个参数，可能是因为以下几种情况：

1. **自定义封装或库**：某些框架或库可能对 `addEventListener` 进行了封装，增加了额外的参数以提供更多功能。
2. **错误使用**：传递超过三个参数不会引发错误，但额外的参数会被忽略。
3. **混淆与其他方法**：有可能混淆了 `addEventListener` 与其他类似的方法，如 jQuery 的 `.on()` 方法，该方法接受的参数可能更多。

**总结：**

- **标准 `addEventListener` 方法**：接受 **三个参数** —— `type`、`listener`、`options`（或 `useCapture`）。
- **第四个参数**：在标准实现中 **不存在**，多余的参数将被忽略。

如果你在某个特定的环境或库中遇到了 `addEventListener` 的第四个参数，建议查阅该环境或库的文档，以了解其具体用途和实现方式。