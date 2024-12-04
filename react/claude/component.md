React组件主要有以下几种创建方式：

1. 函数组件：
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

2. 类组件：
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

3. 箭头函数组件：
```jsx
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
}
```

4. React.memo高阶组件（用于性能优化）：
```jsx
const MemoizedWelcome = React.memo(function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
});
```

5. 自定义Hooks组件（用于逻辑复用）：
```jsx
function useCustomComponent() {
  const [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>{count}</div>
  );
}
```

每种方式都有其适用场景：函数组件适合简单UI渲染，类组件适合复杂状态管理，memo适合优化性能，hooks适合逻辑复用。