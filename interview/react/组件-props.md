我来详细介绍每种组件接收和使用 props 的方式。

1. 函数组件（Function Components）的 props 接收
```jsx
// 基础接收方式
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 解构接收
function Welcome({ name, age, children }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
      <div>{children}</div>
    </div>
  );
}

// 使用默认值
function Welcome({ name = 'Guest', age = 18 }) {
  return <h1>Hello, {name}, age: {age}</h1>;
}

// 调用示例
<Welcome name="John" age={25}>
  <p>Child content</p>
</Welcome>
```

2. 类组件（Class Components）的 props 接收
```jsx
class Welcome extends React.Component {
  // 可以定义默认 props
  static defaultProps = {
    name: 'Guest'
  };

  constructor(props) {
    super(props);
    // 在构造函数中可以访问 props
    console.log(this.props.name);
  }

  render() {
    // 在类方法中通过 this.props 访问
    const { name, age, children } = this.props;
    return (
      <div>
        <h1>Hello, {name}</h1>
        <p>Age: {age}</p>
        {children}
      </div>
    );
  }
}

// 使用方式
<Welcome name="John" age={25}>
  <p>Child content</p>
</Welcome>
```

3. 高阶组件（HOC）的 props 接收
```jsx
function withSubscription(WrappedComponent) {
  return class extends React.Component {
    // HOC 组件接收自己的 props
    constructor(props) {
      super(props);
      this.state = { data: null };
    }

    render() {
      // 传递自己的 props 和新的 props 给被包装组件
      return (
        <WrappedComponent 
          data={this.state.data} 
          {...this.props} 
        />
      );
    }
  };
}

// 使用方式
const EnhancedComponent = withSubscription(MyComponent);
<EnhancedComponent extraProp="value" />
```

4. Render Props 模式的 props 接收
```jsx
class DataProvider extends React.Component {
  state = { data: null };

  render() {
    // 通过 render prop 传递数据
    return this.props.render(this.state.data);
  }
}

// 使用方式
<DataProvider
  render={data => (
    <h1>Hello {data.name}</h1>
  )}
/>
```

5. React.memo 的 props 接收
```jsx
const MyComponent = React.memo(function MyComponent({ name, onClick }) {
  console.log("Rendering:", name);
  return (
    <div onClick={onClick}>
      Hello {name}
    </div>
  );
});

// 使用方式
<MyComponent 
  name="John"
  onClick={() => console.log('clicked')} 
/>
```

6. forwardRef 的 props 接收
```jsx
const FancyButton = React.forwardRef((props, ref) => {
  const { children, style, ...restProps } = props;
  return (
    <button 
      ref={ref}
      style={{ ...style, fontWeight: 'bold' }}
      {...restProps}
    >
      {children}
    </button>
  );
});

// 使用方式
const ref = React.createRef();
<FancyButton ref={ref} style={{ color: 'red' }}>
  Click me
</FancyButton>
```

7. React.lazy 组件的 props 接收
```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

// 在被加载的组件中接收 props
// OtherComponent.js
export default function OtherComponent({ message }) {
  return <div>{message}</div>;
}

// 使用方式
<Suspense fallback={<div>Loading...</div>}>
  <OtherComponent message="Hello" />
</Suspense>
```

8. 错误边界组件的 props 接收
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// 使用方式
<ErrorBoundary fallback={<h1>Error occurred!</h1>}>
  <MyComponent />
</ErrorBoundary>
```

9. Context Provider 组件的 props 接收
```jsx
const ThemeContext = React.createContext('light');

class ThemeProvider extends React.Component {
  render() {
    // 接收 value 和 children props
    const { value, children } = this.props;
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

// 使用方式
<ThemeProvider value="dark">
  <MyComponent />
</ThemeProvider>

// 在消费组件中使用 Context
function ThemedButton() {
  // 使用 useContext 钩子接收数据
  const theme = React.useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

10. 自定义 Hooks 组件的 props 接收
```jsx
// 自定义 Hook
function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);
  // Hook 逻辑
  return [value, setValue];
}

// 在组件中使用自定义 Hook
function CustomComponent({ initialValue, step }) {
  const [value, setValue] = useCustomHook(initialValue);
  
  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + step)}>
        Increment by {step}
      </button>
    </div>
  );
}

// 使用方式
<CustomComponent initialValue={0} step={2} />
```

一些关于 props 的最佳实践：

1. 始终声明 PropTypes 进行类型检查（如果不使用 TypeScript）
2. 为可选的 props 提供默认值
3. 使用解构赋值使代码更清晰
4. 避免过度传递 props（prop drilling）
5. 使用展开运算符 {...props} 传递剩余属性

这些示例涵盖了 React 中主要的组件类型及其 props 的接收和使用方式。在实际开发中，你可以根据具体需求选择合适的方式。