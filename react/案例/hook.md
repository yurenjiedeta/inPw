- Hook

```jsx
function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

```javascript
"use strict";

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = React.useState(0);
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      "p",
      null,
      "You clicked ",
      count,
      " times"
    ),
    /*#__PURE__*/ React.createElement(
      "button",
      {
        onClick: () => setCount(count + 1)
      },
      "Click me"
    )
  );
}

```

