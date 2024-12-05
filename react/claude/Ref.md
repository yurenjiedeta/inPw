让我详细解释这三个 React hooks 和方法的工作原理。

1. useRef 的原理:
```javascript
// useRef 的基本用法
const inputRef = useRef(null);
```
useRef 本质上是一个能在组件整个生命周期内保持不变的可变容器。它的特点是：
- 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数
- ref 对象在整个组件生命周期内保持不变
- 修改 `.current` 属性不会触发组件重新渲染
- 常用于存储 DOM 元素引用或任何可变值

2. forwardRef 的原理:
```javascript
// forwardRef 的基本用法
const ChildComponent = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```
forwardRef 允许组件将收到的 ref 转发给子组件：
- 接收一个渲染函数作为参数，该函数接收 props 和 ref 参数
- 使子组件能够接收父组件传递的 ref，并将其转发给内部的 DOM 元素或其他组件
- 主要用于高阶组件(HOC)和复杂组件的 ref 传递

3. useImperativeHandle 的原理:
```javascript
// useImperativeHandle 的基本用法
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} />;
});
```
useImperativeHandle 用于自定义暴露给父组件的实例值：
- 需要和 forwardRef 一起使用
- 可以限制父组件对子组件 ref 的访问，只暴露特定的方法或属性
- 接收三个参数：ref 对象、创建函数、依赖数组（可选）

这三个方法经常一起使用，下面是一个完整的示例来说明它们如何协同工作：

```javascript
// 子组件
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    // 只暴露特定的方法给父组件
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// 父组件
const ParentComponent = () => {
  const customInputRef = useRef();

  const handleClick = () => {
    // 调用子组件暴露的方法
    customInputRef.current.focus();
    const value = customInputRef.current.getValue();
    console.log(value);
  };

  return (
    <div>
      <CustomInput ref={customInputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};
```

这个例子展示了：
1. useRef 创建了一个引用容器
2. forwardRef 使子组件能够接收父组件的 ref
3. useImperativeHandle 定制了子组件向父组件暴露的实例方法

这三个方法的组合使用可以实现更精确的组件通信和控制，同时保持良好的封装性。它们在处理复杂组件交互、表单控制、动画等场景下特别有用。