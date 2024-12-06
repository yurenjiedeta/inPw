我来解释一下 PureComponent 和 Component 的区别，并通过代码示例来说明。

```javascript
import React from 'react';

// 普通 Component 示例
class RegularComponent extends React.Component {
  render() {
    console.log('RegularComponent render');
    return (
      <div>
        <h3>Regular Component</h3>
        <p>Count: {this.props.count}</p>
        <p>Text: {this.props.text}</p>
      </div>
    );
  }
}

// PureComponent 示例
class OptimizedComponent extends React.PureComponent {
  render() {
    console.log('PureComponent render');
    return (
      <div>
        <h3>Pure Component</h3>
        <p>Count: {this.props.count}</p>
        <p>Text: {this.props.text}</p>
      </div>
    );
  }
}

// 父组件
class ParentComponent extends React.Component {
  state = {
    count: 0,
    text: 'Hello',
    currentTime: new Date().toLocaleTimeString()
  };

  componentDidMount() {
    // 每秒更新时间，但不改变其他props
    setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleTimeString()
      });
    }, 1000);
  }

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <h2>当前时间: {this.state.currentTime}</h2>
        <button onClick={this.incrementCount}>增加计数</button>
        
        <RegularComponent 
          count={this.state.count}
          text={this.state.text}
        />
        
        <OptimizedComponent 
          count={this.state.count}
          text={this.state.text}
        />
      </div>
    );
  }
}

export default ParentComponent;

```

这个例子展示了 PureComponent 和普通 Component 的主要区别：

1. **浅比较（Shallow Comparison）**：
   - PureComponent 自动实现了 `shouldComponentUpdate` 生命周期方法
   - 它会对 props 和 state 进行浅比较，只有当值真正发生变化时才会重新渲染

2. **性能优化**：
   在示例中，当父组件的 `currentTime` 状态更新时：
   - RegularComponent 会在每次父组件更新时重新渲染
   - PureComponent 不会重新渲染，因为它的 props（count 和 text）没有变化

3. **使用场景**：
   - 当组件的 render 输出完全由 props 和 state 决定时，适合使用 PureComponent
   - 当组件接收简单的数据结构作为 props 时（数字、字符串、布尔值）最有效

需要注意的是：

1. PureComponent 只进行浅比较，对于复杂的对象或数组，可能无法正确判断是否需要更新
2. 如果你的组件需要在 props 没有变化的情况下也进行重新渲染，就不应该使用 PureComponent
3. 不要在 PureComponent 的 `render` 方法中创建新的对象或数组，这会导致浅比较失效

你可以运行这个示例，通过控制台日志观察到 RegularComponent 会在时间更新时重新渲染，而 PureComponent 只在点击按钮增加计数时才会重新渲染。

需要使用 PureComponent 时，建议先评估组件的渲染频率和数据结构复杂度，确保它真的能带来性能提升。