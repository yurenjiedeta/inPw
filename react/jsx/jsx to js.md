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

