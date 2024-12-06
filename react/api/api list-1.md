我将列出 ReactDOM 主要的 API 及其用途：

1. **render** (已废弃于 React 18，推荐使用 createRoot)
```javascript
// 旧版用法
ReactDOM.render(element, container, callback)

// React 18+ 推荐用法
const root = ReactDOM.createRoot(container);
root.render(element);
```

2. **createRoot** (React 18+)
```javascript
const root = ReactDOM.createRoot(container);
root.render(element);
```

3. **hydrate** (已废弃于 React 18，推荐使用 hydrateRoot)
```javascript
// 旧版用法
ReactDOM.hydrate(element, container, callback)

// React 18+ 推荐用法
const root = ReactDOM.hydrateRoot(container, element);
```

4. **hydrateRoot** (React 18+)
```javascript
ReactDOM.hydrateRoot(container, element);
```

5. **findDOMNode** (不推荐使用)
```javascript
ReactDOM.findDOMNode(component)
```

6. **unmountComponentAtNode** (已废弃于 React 18)
```javascript
ReactDOM.unmountComponentAtNode(container)
```

7. **createPortal**
```javascript
ReactDOM.createPortal(child, container)
```

8. **flushSync**
```javascript
ReactDOM.flushSync(callback)
```

主要使用场景：

1. **createRoot**：
- 创建 React 应用的根节点
- 用于客户端渲染
```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

2. **hydrateRoot**：
- 用于服务器端渲染(SSR)
- 激活服务端渲染的 HTML
```javascript
const root = ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <App />
);
```

3. **createPortal**：
- 将子节点渲染到父组件 DOM 层次结构之外
```javascript
ReactDOM.createPortal(
  <div>This is a portal</div>,
  document.getElementById('portal-root')
);
```

4. **flushSync**：
- 强制同步更新 DOM
```javascript
ReactDOM.flushSync(() => {
  setCount(count + 1);
});
```

注意事项：

1. React 18 中的重要变化：
   - render 替换为 createRoot
   - hydrate 替换为 hydrateRoot
   - 移除了 unmountComponentAtNode

2. 不推荐使用的 API：
   - findDOMNode (使用 refs 替代)
   - render (使用 createRoot 替代)

3. 新版本中的最佳实践：
   - 使用 createRoot 进行客户端渲染
   - 使用 hydrateRoot 进行服务端渲染
   - 使用 createPortal 进行门户渲染

这些是 ReactDOM 中最主要的 API。在现代 React 开发中，主要使用 createRoot、hydrateRoot 和 createPortal 这几个 API。其他的要么已经废弃，要么有了更好的替代方案。