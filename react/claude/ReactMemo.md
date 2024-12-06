我会创建一个全面的 React.memo 示例，涵盖不同使用场景和最佳实践。

```javascript
import React, { useState, useCallback, useMemo } from 'react';

// 1. 基础的 React.memo 使用
const SimpleComponent = React.memo(function SimpleComponent({ text, count }) {
  console.log('SimpleComponent rendered');
  return (
    <div className="p-4 border rounded">
      <h3>Simple Memoized Component</h3>
      <p>Text: {text}</p>
      <p>Count: {count}</p>
    </div>
  );
});

// 2. 使用自定义比较函数的 React.memo
const CustomCompareComponent = React.memo(
  function CustomCompareComponent({ user, onUserUpdate }) {
    console.log('CustomCompareComponent rendered');
    return (
      <div className="p-4 border rounded mt-4">
        <h3>Custom Compare Component</h3>
        <p>User name: {user.name}</p>
        <p>Age: {user.age}</p>
        <button onClick={() => onUserUpdate(user.id)}>
          Update User
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 只比较关心的属性
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.age === nextProps.user.age
    );
  }
);

// 3. 带有子组件的 React.memo
const ChildComponent = React.memo(function ChildComponent({ value }) {
  console.log('ChildComponent rendered');
  return <p>Child value: {value}</p>;
});

const ParentComponent = React.memo(function ParentComponent({ children, title }) {
  console.log('ParentComponent rendered');
  return (
    <div className="p-4 border rounded mt-4">
      <h3>{title}</h3>
      {children}
    </div>
  );
});

// 4. 使用 useCallback 和 useMemo 配合 React.memo
const CallbackComponent = React.memo(function CallbackComponent({ onItemClick, items }) {
  console.log('CallbackComponent rendered');
  return (
    <div className="p-4 border rounded mt-4">
      <h3>Callback Component</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <button onClick={() => onItemClick(item.id)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

// 5. 主应用组件
function App() {
  // 状态管理
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello');
  const [user, setUser] = useState({ id: 1, name: 'John', age: 25 });
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);

  // 使用 useCallback 记忆函数
  const handleUserUpdate = useCallback((userId) => {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  }, []);

  const handleItemClick = useCallback((itemId) => {
    console.log('Item clicked:', itemId);
  }, []);

  // 使用 useMemo 记忆计算结果
  const memoizedItems = useMemo(() => items.map(item => ({
    ...item,
    name: `${item.name} (${count})`
  })), [items, count]);

  return (
    <div className="p-6">
      <h2>React.memo Demo</h2>
      
      {/* 控制面板 */}
      <div className="mb-4">
        <button 
          onClick={() => setCount(c => c + 1)}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Increment Count ({count})
        </button>
        <button 
          onClick={() => setText(t => t + '!')}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add Exclamation ({text})
        </button>
      </div>

      {/* 1. 基础示例 */}
      <SimpleComponent text={text} count={count} />

      {/* 2. 自定义比较函数示例 */}
      <CustomCompareComponent 
        user={user}
        onUserUpdate={handleUserUpdate}
      />

      {/* 3. 父子组件示例 */}
      <ParentComponent title="Parent Title">
        <ChildComponent value={count} />
      </ParentComponent>

      {/* 4. useCallback 配合示例 */}
      <CallbackComponent 
        items={memoizedItems}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default App;

```

这个综合示例展示了 React.memo 的多种使用场景和最佳实践：

1. **基础使用**
- SimpleComponent 展示了最基本的 React.memo 用法
- 只有当 props 发生变化时才会重新渲染

2. **自定义比较函数**
- CustomCompareComponent 展示如何使用自定义比较函数
- 可以精确控制哪些 prop 变化才触发重新渲染

3. **父子组件优化**
- 展示了如何在有子组件的情况下使用 React.memo
- 演示了组件树的渲染优化

4. **配合 Hooks 使用**
- 使用 useCallback 记忆回调函数
- 使用 useMemo 记忆计算结果
- 避免不必要的子组件重渲染

5. **性能优化注意事项**：
- 合理使用 useCallback 和 useMemo
- 避免在渲染时创建新的对象或数组
- 正确处理子组件和回调函数

使用建议：

1. 不要过度使用 React.memo
   - 只在确实需要性能优化的组件上使用
   - 组件经常接收相同 props 时最有效

2. 注意依赖项
   - 使用 useCallback 和 useMemo 时要正确设置依赖数组
   - 避免不必要的依赖

3. 调试技巧
   - 使用 console.log 监控组件重渲染
   - 使用 React DevTools 分析组件更新

4. 常见陷阱
   - 避免在父组件渲染时创建新的对象或函数
   - 注意数组和对象的引用相等性
   - 使用扁平的 props 结构

这个示例可以帮助你理解 React.memo 的各种使用场景，以及如何与其他 React 特性配合使用来优化应用性能。如果你需要针对特定场景的更多细节，我很乐意详细解释。