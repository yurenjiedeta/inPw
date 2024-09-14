在 Vue 2.6.14 中，`initEvents` 方法的目的是初始化组件实例的事件系统，为事件绑定和监听做准备。具体而言，它的主要作用包括以下几点：

1. **初始化事件对象**：
   ```javascript
   vm._events = Object.create(null);
   ```
   这行代码创建了一个空的事件对象 `vm._events`，用来存储该组件的所有事件监听器。`Object.create(null)` 创建了一个没有原型的对象，避免了与 `Object` 的原型方法（如 `hasOwnProperty`）产生冲突。

2. **初始化钩子事件标识**：
   ```javascript
   vm._hasHookEvent = false;
   ```
   `vm._hasHookEvent` 是一个标识，表示当前组件是否监听了生命周期钩子事件，默认为 `false`。这个标志用于提高性能，避免不必要的事件检查。

3. **处理父组件传入的事件监听器**：
   ```javascript
   var listeners = vm.$options._parentListeners;
   if (listeners) {
     updateComponentListeners(vm, listeners);
   }
   ```
   如果父组件在当前组件的选项中定义了事件监听器（通过 `v-on` 或其他方式绑定），这些监听器将存储在 `vm.$options._parentListeners` 中。这里检查 `listeners` 是否存在，如果存在，则调用 `updateComponentListeners` 方法，为当前组件绑定来自父组件的事件监听器。

总结：
`initEvents` 方法主要用于初始化组件的事件系统，包括设置一个空的事件对象、处理生命周期钩子事件标识，以及绑定父组件传入的事件监听器。

例子：
假设在父组件中这样使用子组件：
```html
<child-component @custom-event="handleEvent"></child-component>
```
在子组件初始化时，`initEvents` 方法会检查父组件是否为它注册了监听器，如果有，它会调用 `updateComponentListeners` 方法将 `custom-event` 绑定到子组件上。