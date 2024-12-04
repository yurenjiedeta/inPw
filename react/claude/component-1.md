我将创建一个详细的对照表来展示 JSX 和其编译后的 JavaScript 代码的对应关系。

```javascript
// 1. 基础元素
// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// 编译后
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// 2. 嵌套元素
// JSX
const nested = (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// 编译后
const nested = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Paragraph')
);

// 3. 组件渲染
// JSX
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element = <Welcome name="Sara" />;

// 编译后
function Welcome(props) {
  return React.createElement('h1', null, 'Hello, ', props.name);
}
const element = React.createElement(Welcome, { name: 'Sara' });

// 4. 条件渲染
// JSX
const element = <div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;

// 编译后
const element = React.createElement(
  'div',
  null,
  isLoggedIn 
    ? React.createElement(UserGreeting, null)
    : React.createElement(GuestGreeting, null)
);

// 5. 列表渲染
// JSX
const list = (
  <ul>
    {items.map(item => <li key={item.id}>{item.text}</li>)}
  </ul>
);

// 编译后
const list = React.createElement(
  'ul',
  null,
  items.map(item =>
    React.createElement('li', { key: item.id }, item.text)
  )
);

// 6. 属性展开
// JSX
const button = <button {...props} className="btn">Click me</button>;

// 编译后
const button = React.createElement(
  'button',
  Object.assign({}, props, { className: 'btn' }),
  'Click me'
);

// 7. 子组件数组
// JSX
const parent = (
  <div>
    {children}
  </div>
);

// 编译后
const parent = React.createElement(
  'div',
  null,
  ...React.Children.toArray(children)
);

// 8. Fragments
// JSX
const fragment = (
  <>
    <li>First</li>
    <li>Second</li>
  </>
);

// 编译后
const fragment = React.createElement(
  React.Fragment,
  null,
  React.createElement('li', null, 'First'),
  React.createElement('li', null, 'Second')
);

// 9. 带命名空间的组件
// JSX
const modal = (
  <Namespace.Modal>
    <Namespace.Modal.Header>Title</Namespace.Modal.Header>
    <Namespace.Modal.Body>Content</Namespace.Modal.Body>
  </Namespace.Modal>
);

// 编译后
const modal = React.createElement(
  Namespace.Modal,
  null,
  React.createElement(Namespace.Modal.Header, null, 'Title'),
  React.createElement(Namespace.Modal.Body, null, 'Content')
);

// 10. 自定义属性
// JSX
const custom = <div data-custom="value" aria-label="label">Content</div>;

// 编译后
const custom = React.createElement(
  'div',
  {
    'data-custom': 'value',
    'aria-label': 'label'
  },
  'Content'
);

```

主要转换规则：

1. 所有 JSX 元素都转换为 `React.createElement()` 调用
2. 第一个参数是标签名或组件
3. 第二个参数是属性对象（null 表示无属性）
4. 后续参数是子元素
5. 表达式用 `{}` 包裹的部分会被直接作为 JavaScript 执行
6. Fragment 会转换为 `React.Fragment`
7. 组件属性会通过 props 传递