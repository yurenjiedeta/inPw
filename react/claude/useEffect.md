我来详细解释 useEffect 的各种使用场景和示例。考虑到这是一个需要完整示例代码的重要主题，我会创建一个包含多个用例的代码集合。

```javascript
import React, { useState, useEffect } from 'react';

// 1. 基础用法：组件挂载时执行
function BasicExample() {
  useEffect(() => {
    console.log('Component mounted');
    
    // 清理函数
    return () => {
      console.log('Component will unmount');
    };
  }, []); // 空依赖数组，只在挂载和卸载时执行

  return <div>Basic Example</div>;
}

// 2. 依赖项更新时执行
function DependencyExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // 只在 count 更新时执行

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

// 3. 数据获取示例
function DataFetchingExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // 清理函数：取消请求或清理订阅
    };
  }, []); // 仅在组件挂载时获取数据

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
}

// 4. 订阅和清理示例
function SubscriptionExample() {
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    const socket = new WebSocket('wss://example.com');

    socket.addEventListener('open', () => {
      setStatus('connected');
    });

    socket.addEventListener('message', (event) => {
      console.log('Message received:', event.data);
    });

    socket.addEventListener('close', () => {
      setStatus('disconnected');
    });

    // 清理函数：关闭 WebSocket 连接
    return () => {
      socket.close();
    };
  }, []); // 仅在组件挂载时建立连接

  return <div>Connection status: {status}</div>;
}

// 5. DOM 操作和事件监听
function EventListenerExample() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 仅在组件挂载时添加监听器

  return <div>Window width: {windowWidth}px</div>;
}

// 6. 多个 Effect 组合使用
function MultipleEffectsExample() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // Effect 1: 处理计数器
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Effect 2: 加载用户数据
  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetch('https://api.example.com/user');
      setUser(await userData.json());
    };
    loadUser();
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {user && <div>User: {user.name}</div>}
    </div>
  );
}

// 7. 条件执行 Effect
function ConditionalEffectExample() {
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isOnline) return; // 只在在线时执行

    const socket = new WebSocket('wss://chat.example.com');
    socket.addEventListener('message', (event) => {
      setMessages(prev => [...prev, event.data]);
    });

    return () => socket.close();
  }, [isOnline]); // 依赖于在线状态

  return (
    <div>
      <button onClick={() => setIsOnline(!isOnline)}>
        {isOnline ? 'Go Offline' : 'Go Online'}
      </button>
      <div>Messages: {messages.length}</div>
    </div>
  );
}

// 8. 防抖效果
function DebouncedSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm) {
        const response = await fetch(`/api/search?q=${searchTerm}`);
        const data = await response.json();
        setResults(data);
      }
    }, 500); // 500ms 延迟

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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

```

这些示例涵盖了 useEffect 的主要使用场景，让我为您解释每个示例的要点：

1. 基础用法：
- 展示了最简单的 useEffect 使用方式
- 包含挂载和卸载时的处理
- 使用空依赖数组 `[]` 确保只执行一次

2. 依赖项更新：
- 演示如何监听特定状态的变化
- 只在依赖项更新时执行

3. 数据获取：
- 展示了异步数据获取的完整流程
- 包含加载状态和错误处理
- 使用清理函数处理未完成的请求

4. 订阅示例：
- 展示了 WebSocket 连接的建立和清理
- 适用于任何需要订阅/取消订阅的场景

5. DOM 事件处理：
- 展示了如何正确添加和移除事件监听器
- 处理浏览器 API 的典型用例

6. 多个 Effect：
- 展示了如何组织多个独立的副作用
- 每个 Effect 负责单一职责

7. 条件执行：
- 展示了如何基于条件执行 Effect
- 包含提前返回的模式

8. 防抖处理：
- 展示了如何实现搜索防抖
- 处理清理定时器的最佳实践

这些示例中有一些重要的最佳实践：

1. 始终提供清理函数（return 函数）处理副作用
2. 合理使用依赖数组
3. 正确处理异步操作
4. 注意内存泄漏的防范
5. 遵循单一职责原则

需要特别注意的是，Effect 的依赖数组要包含 Effect 中使用的所有响应式值（props、state 等），否则可能导致闭包陷阱。

您想深入了解某个特定场景的使用方式吗？或者有其他 useEffect 相关的问题？