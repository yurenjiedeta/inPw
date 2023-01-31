- hello world

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
const el = <h1>Hello, world!</h1>;
root.render(el);
```

```javascript
"use strict";
const root = ReactDOM.createRoot(document.getElementById("root"));
const el = /*#__PURE__*/ React.createElement("h1", null, "Hello, world!");
root.render(el);
```

- 套嵌表达式

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

```javascript
"use strict";

function formatName(user) {
  return user.firstName + " " + user.lastName;
}
const user = {
  firstName: "Harper",
  lastName: "Perez"
};
const element = /*#__PURE__*/ React.createElement(
  "h1",
  null,
  "Hello, ",
  formatName(user),
  "!"
);

```

- 含有条件的

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

```javascript
"use strict";

function getGreeting(user) {
  if (user) {
    return /*#__PURE__*/ React.createElement(
      "h1",
      null,
      "Hello, ",
      formatName(user),
      "!"
    );
  }
  return /*#__PURE__*/ React.createElement("h1", null, "Hello, Stranger.");
}

```

- 含有属性的

```jsx
const element = <a href="https://www.reactjs.org"> link </a>;
```

```javascript
"use strict";

const element = /*#__PURE__*/ React.createElement(
  "a",
  {
    href: "https://www.reactjs.org"
  },
  " link "
);

```

- 属性是表达式的

```jsx
const element = <img src={user.avatarUrl}></img>;
```

```javascript
"use strict";

const element = /*#__PURE__*/ React.createElement("img", {
  src: user.avatarUrl
});

```

- 含有多个子元素的

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

```javascript
"use strict";

const element = /*#__PURE__*/ React.createElement(
  "div",
  null,
  /*#__PURE__*/ React.createElement("h1", null, "Hello!"),
  /*#__PURE__*/ React.createElement("h2", null, "Good to see you here.")
);

```

- 子元素有表达式的

```jsx
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}
```

```javascript
"use strict";

const root = ReactDOM.createRoot(document.getElementById("root"));
function tick() {
  const element = /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement("h1", null, "Hello, world!"),
    /*#__PURE__*/ React.createElement(
      "h2",
      null,
      "It is ",
      new Date().toLocaleTimeString(),
      "."
    )
  );
  root.render(element);
}

```

- 函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```javascript
"use strict";

function Welcome(props) {
  return /*#__PURE__*/ React.createElement("h1", null, "Hello, ", props.name);
}

```

- class 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

```javascript
"use strict";

class Welcome extends React.Component {
  render() {
    return /*#__PURE__*/ React.createElement(
      "h1",
      null,
      "Hello, ",
      this.props.name
    );
  }
}

```

- 组合组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

```javascript
"use strict";

function Welcome(props) {
  return /*#__PURE__*/ React.createElement("h1", null, "Hello, ", props.name);
}
function App() {
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(Welcome, {
      name: "Sara"
    }),
    /*#__PURE__*/ React.createElement(Welcome, {
      name: "Cahal"
    }),
    /*#__PURE__*/ React.createElement(Welcome, {
      name: "Edite"
    })
  );
}

```

- 事件处理

```jsx
function activateLasers(){}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

```javascript
"use strict";

function activateLasers() {}
/*#__PURE__*/ React.createElement(
  "button",
  {
    onClick: activateLasers
  },
  "Activate Lasers"
);

```

- 渲染多个组件

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
 <ul>{listItems}</ul>
```

```javascript
"use strict";

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  /*#__PURE__*/ React.createElement("li", null, number)
);
/*#__PURE__*/ React.createElement("ul", null, listItems);

```

- key的正确使用

```jsx
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

```javascript
"use strict";

function ListItem(props) {
  // 正确！这里不需要指定 key：
  return /*#__PURE__*/ React.createElement("li", null, props.value);
}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    /*#__PURE__*/
    // 正确！key 应该在数组的上下文中被指定
    React.createElement(ListItem, {
      key: number.toString(),
      value: number
    })
  );
  return /*#__PURE__*/ React.createElement("ul", null, listItems);
}

```

- 受控组件

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

```javascript
"use strict";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleSubmit(event) {
    alert("提交的名字: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return /*#__PURE__*/ React.createElement(
      "form",
      {
        onSubmit: this.handleSubmit
      },
      /*#__PURE__*/ React.createElement(
        "label",
        null,
        "\u540D\u5B57:",
        /*#__PURE__*/ React.createElement("input", {
          type: "text",
          value: this.state.value,
          onChange: this.handleChange
        })
      ),
      /*#__PURE__*/ React.createElement("input", {
        type: "submit",
        value: "\u63D0\u4EA4"
      })
    );
  }
}

```

