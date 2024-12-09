我来创建一个全面的 Mobx 在 React 中的使用示例，包含常见的状态管理场景。

```javascript
// store/TodoStore.js
import { makeAutoObservable } from 'mobx';

class TodoStore {
  todos = [];
  filter = 'all'; // all, active, completed
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  addTodo(title) {
    this.todos.push({
      id: Date.now(),
      title,
      completed: false
    });
  }

  toggleTodo(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  setFilter(filter) {
    this.filter = filter;
  }

  // Async action example
  async fetchTodos() {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch('https://api.example.com/todos');
      const data = await response.json();
      this.todos = data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  // Computed values
  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  get remainingTodos() {
    return this.todos.filter(todo => !todo.completed).length;
  }
}

export const todoStore = new TodoStore();

// store/RootStore.js
class RootStore {
  constructor() {
    this.todoStore = todoStore;
    // 可以添加其他 store
    // this.userStore = new UserStore(this);
  }
}

export const rootStore = new RootStore();

// context/StoreContext.js
import React from 'react';

export const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={rootStore}>
    {children}
  </StoreContext.Provider>
);

// hooks/useStore.js
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

// components/TodoList.jsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../hooks/useStore';

const TodoList = observer(() => {
  const { todoStore } = useStore();
  
  if (todoStore.loading) return <div>Loading...</div>;
  if (todoStore.error) return <div>Error: {todoStore.error}</div>;

  return (
    <div>
      <div>
        Remaining todos: {todoStore.remainingTodos}
      </div>
      
      <div>
        <button onClick={() => todoStore.setFilter('all')}>All</button>
        <button onClick={() => todoStore.setFilter('active')}>Active</button>
        <button onClick={() => todoStore.setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {todoStore.filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoStore.toggleTodo(todo.id)}
            />
            {todo.title}
            <button onClick={() => todoStore.removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

// components/AddTodo.jsx
const AddTodo = observer(() => {
  const { todoStore } = useStore();
  const [title, setTitle] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      todoStore.addTodo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
});

// App.jsx
const App = () => {
  return (
    <StoreProvider>
      <div>
        <h1>Todo App with MobX</h1>
        <AddTodo />
        <TodoList />
      </div>
    </StoreProvider>
  );
};

export default App;

```

这个示例展示了 Mobx 在 React 中的主要使用方式和最佳实践。让我为你解释主要的特性：

1. 状态管理结构：
   - 使用 `makeAutoObservable` 创建响应式状态
   - 实现了 actions 来修改状态
   - 使用 computed values 来派生状态

2. Store 的组织：
   - 创建了独立的 TodoStore
   - 实现了 RootStore 模式，方便扩展多个 store
   - 使用 React Context 提供 store

3. React 集成：
   - 使用 `observer` HOC 使组件响应状态变化
   - 实现了自定义 hook `useStore` 来访问 store
   - 展示了组件如何消费和修改状态

4. 功能特性：
   - 异步操作处理（fetchTodos）
   - 加载状态和错误处理
   - 过滤功能
   - CRUD 操作

5. 最佳实践：
   - 状态封装
   - 计算属性的使用
   - 组件职责分离
   - 错误边界处理

要使用这个示例，你需要安装以下依赖：

```bash
npm install mobx mobx-react-lite
```

你可能想了解的其他高级特性：

1. 如何实现持久化
2. 如何处理表单状态
3. 如何实现更复杂的异步操作
4. 如何优化性能

需要我详细解释其中的任何部分吗？