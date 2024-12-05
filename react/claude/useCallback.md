我会创建一个全面的 useCallback 示例集合，涵盖各种使用场景和最佳实践。

```javascript
import React, { useState, useCallback, useEffect, memo } from 'react';

// 1. 基础示例：缓存事件处理函数
function BasicExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 使用 useCallback 缓存回调函数
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // 空依赖数组，函数永远不会改变

  // 不使用 useCallback 的函数，每次渲染都会创建新的
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <input value={text} onChange={handleTextChange} />
      <ExpensiveChild onUpdate={handleClick} />
    </div>
  );
}

// 2. 带有依赖的回调示例
function DependentCallbackExample() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // 依赖于 step 的回调函数
  const handleIncrement = useCallback(() => {
    setCount(c => c + step);
  }, [step]); // 当 step 改变时，函数会重新创建

  return (
    <div>
      <p>Count: {count}</p>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        min="1"
      />
      <button onClick={handleIncrement}>Increment by {step}</button>
    </div>
  );
}

// 3. 优化子组件渲染的示例
const ExpensiveChild = memo(({ onUpdate }) => {
  console.log('ExpensiveChild rendered');
  
  // 模拟复杂计算
  const expensiveValue = React.useMemo(() => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  }, []);

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={onUpdate}>Update Parent</button>
    </div>
  );
});

// 4. 带有多个依赖的复杂示例
function ComplexExample() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // 复杂的过滤和排序回调
  const getSortedAndFilteredItems = useCallback(() => {
    return items
      .filter(item => item.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.localeCompare(b);
        }
        return b.localeCompare(a);
      });
  }, [items, filter, sortOrder]); // 依赖于多个状态

  const handleAddItem = useCallback(() => {
    const newItem = `Item ${items.length + 1}`;
    setItems(prev => [...prev, newItem]);
  }, [items.length]);

  return (
    <div>
      <button onClick={handleAddItem}>Add Item</button>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <ItemList items={getSortedAndFilteredItems()} />
    </div>
  );
}

// 5. 异步回调示例
function AsyncExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.example.com/data');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []); // 空依赖数组，因为函数不依赖于任何变量

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={fetchData}>Refresh</button>
        </div>
      )}
    </div>
  );
}

// 6. 事件监听器示例
function EventListenerExample() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  }, []); // 空依赖数组，因为函数逻辑不依赖于任何变量

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]); // 依赖于缓存的回调

  return (
    <div>
      <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
    </div>
  );
}

// 7. 防抖示例
function DebouncedSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term) return;
      const response = await fetch(`/api/search?q=${term}`);
      const data = await response.json();
      setResults(data);
    }, 500),
    [] // 空依赖数组，因为我们想要保持同一个防抖函数
  );

  // 每次输入变化时调用防抖搜索
  const handleSearch = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  }, [debouncedSearch]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// 辅助函数：防抖
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 8. 带有上下文的回调示例
function ContextCallbackExample() {
  const [user, setUser] = useState({ name: 'John', preferences: {} });

  const updateUserPreference = useCallback((key, value) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [key]: value
      }
    }));
  }, []); // 空依赖数组，因为我们使用函数式更新

  return (
    <div>
      <UserPreferences
        user={user}
        onUpdatePreference={updateUserPreference}
      />
    </div>
  );
}

const UserPreferences = memo(({ user, onUpdatePreference }) => {
  return (
    <div>
      <h3>User Preferences for {user.name}</h3>
      <label>
        Theme:
        <select
          value={user.preferences.theme || 'light'}
          onChange={(e) => onUpdatePreference('theme', e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  );
});

```

让我解释这些示例的重点：

1. 基础示例：
- 展示了最基本的 useCallback 使用
- 对比有无 useCallback 的情况
- 结合 memo 优化子组件渲染

2. 依赖回调：
- 展示如何使用依赖数组
- 演示何时需要重新创建回调
- 处理动态依赖

3. 优化子组件：
- 使用 memo 阻止不必要的重渲染
- 展示性能优化的实际效果
- 结合 useMemo 优化计算

4. 复杂示例：
- 处理多个依赖
- 复杂的状态更新逻辑
- 优化列表渲染

5. 异步回调：
- 处理 API 请求
- 结合 loading 状态
- 错误处理

6. 事件监听：
- 优化事件处理函数
- 清理订阅
- 避免内存泄漏

7. 防抖示例：
- 结合防抖优化
- 处理用户输入
- 优化性能

8. 上下文回调：
- 处理复杂状态更新
- 优化组件间通信
- 保持引用稳定性

使用 useCallback 的最佳实践：

1. 只在需要时使用：
- 传递给 memo 组件的函数
- 作为其他 hook 的依赖
- 需要稳定引用的场景

2. 正确设置依赖：
- 包含所有使用的变量
- 考虑函数式更新
- 避免过度依赖

3. 性能考虑：
- 权衡缓存成本
- 避免过度优化
- 测量实际性能影响

您想深入了解某个特定场景吗？或者有其他关于 useCallback 的问题？