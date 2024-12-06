好的，我来创建一个使用传统 Redux（不使用 Redux Toolkit）的示例。

```javascript
// actions/counterActions.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT';

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export const incrementByAmount = (amount) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount
});

// reducers/counterReducer.js
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT } from '../actions/counterActions';

const initialState = {
  value: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1
      };
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,
        value: state.value + action.payload
      };
    default:
      return state;
  }
};

export default counterReducer;

// store/index.js
import { createStore, combineReducers } from 'redux';
import counterReducer from '../reducers/counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;

// Counter.js
import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, incrementByAmount } from './actions/counterActions';

function Counter({ count, increment, decrement, incrementByAmount }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">计数器: {count}</h2>
      <div className="space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={increment}
        >
          增加
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={decrement}
        >
          减少
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => incrementByAmount(5)}
        >
          增加5
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  count: state.counter.value
});

const mapDispatchToProps = {
  increment,
  decrement,
  incrementByAmount
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

这个示例展示了传统 Redux 的核心概念和实现方式：

1. **Action Creators**：
   - 定义了 action 类型常量
   - 创建返回包含 type 和可选 payload 的纯对象

2. **Reducer**：
   - 使用 switch 语句处理不同的 action 类型
   - 返回新的状态对象，保持不可变性

3. **Store**：
   - 使用 `createStore` 创建 Redux store
   - 通过 `combineReducers` 组合多个 reducer
   - 添加了 Redux DevTools 支持

4. **React 集成**：
   - 使用 `connect` 高阶组件而不是 hooks
   - 通过 `mapStateToProps` 和 `mapDispatchToProps` 连接组件

要使用这个示例，你需要安装以下依赖：

```bash
npm install redux react-redux
```

这种传统的 Redux 实现方式相比 Redux Toolkit：
- 需要手动创建 action 类型和 action creators
- 需要手动处理 state 的不可变更新
- 使用 `connect` HOC 替代 hooks API
- 配置更加显式和完整

需要我解释任何部分或添加其他功能吗？