我会创建一个全面的 useReducer 示例集合，涵盖不同的使用场景和最佳实践。

```javascript
import React, { useReducer, useEffect } from 'react';

// 1. 基础计数器示例
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

function CounterExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}

// 2. 复杂表单处理
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'SUBMIT':
      return {
        ...state,
        isSubmitting: true
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};

const initialFormState = {
  username: '',
  email: '',
  password: '',
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
  submitError: null
};

function FormExample() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const validateField = (field, value) => {
    let error = null;
    switch (field) {
      case 'email':
        if (!value.includes('@')) error = 'Invalid email';
        break;
      case 'password':
        if (value.length < 6) error = 'Password too short';
        break;
    }
    return error;
  };

  const handleChange = (field, value) => {
    const error = validateField(field, value);
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value,
      error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={state.username}
          onChange={e => handleChange('username', e.target.value)}
          placeholder="Username"
        />
        {state.errors.username && <span>{state.errors.username}</span>}
      </div>
      <div>
        <input
          value={state.email}
          onChange={e => handleChange('email', e.target.value)}
          placeholder="Email"
        />
        {state.errors.email && <span>{state.errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={state.password}
          onChange={e => handleChange('password', e.target.value)}
          placeholder="Password"
        />
        {state.errors.password && <span>{state.errors.password}</span>}
      </div>
      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {state.submitError && <div>Error: {state.submitError}</div>}
      {state.isSubmitted && <div>Form submitted successfully!</div>}
    </form>
  );
}

// 3. 购物车示例
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

function CartExample() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      {state.items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
            min="1"
          />
          <span>${item.price * item.quantity}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ${total}</div>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
    </div>
  );
}

// 4. 异步数据获取示例
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        data: action.data,
        isLoading: false,
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case 'RESET':
      return initialDataState;
    default:
      return state;
  }
};

const initialDataState = {
  data: null,
  isLoading: false,
  error: null
};

function DataFetchingExample() {
  const [state, dispatch] = useReducer(dataReducer, initialDataState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', error: error.message });
      }
    };

    fetchData();
  }, []);

  if (state.isLoading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  if (!state.data) return null;

  return (
    <div>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}

```

这些示例展示了 useReducer 的多种用法，让我为您解释每个示例的重点：

1. 基础计数器示例：
- 展示了最基本的 useReducer 使用方式
- 实现简单的状态更新逻辑
- 展示 action 的基本结构

2. 复杂表单处理：
- 处理多个相关的状态字段
- 包含表单验证逻辑
- 处理提交状态和错误状态
- 展示了更复杂的状态更新模式

3. 购物车示例：
- 展示了数组操作
- 处理复杂的状态计算
- 实现了添加、删除、更新数量等操作
- 展示了派生状态（总价计算）

4. 异步数据获取：
- 结合 useEffect 处理异步操作
- 管理加载状态和错误状态
- 展示了重置功能

主要特点：

1. 状态管理：
- 使用 immutable 更新模式
- 集中管理相关状态
- 处理复杂的状态依赖关系

2. Action 处理：
- 使用 type 字段区分不同操作
- 传递必要的 payload 数据
- 保持 action 结构清晰

3. 错误处理：
- 验证错误
- 异步操作错误
- 用户输入错误

4. 性能优化：
- 状态分割
- 避免不必要的渲染
- 清晰的更新逻辑

使用 useReducer 的最佳实践：

1. 当状态逻辑复杂时使用 useReducer
2. 当状态更新依赖于其他状态时使用
3. 需要集中管理状态时使用
4. 状态更新逻辑需要在多处重用时使用

您想深入了解某个特定示例吗？或者有其他关于 useReducer 的问题？