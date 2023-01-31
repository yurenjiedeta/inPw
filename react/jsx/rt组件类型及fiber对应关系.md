- 根据 type 来进行区分

```javascript
//在程序启动运行的时候，会创建 fiberRootNode ，随着也会创建 fiberNode ，作为 current 的属性，这两个是必然存在的，current 的 tag 为 3（HostRoot）,mode 为 0。
//格式如下
```

```json
// 注意一点，HostRoot 直接下面的 React.Fragment 组件，会根据某些判断不会被渲染
{
    "tag": 3,//特别关注 HostRoot
    "mode": 0,//特别关注啊
    "key": null,
    "elementType": null,
    "type": null,
    "stateNode": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "pendingProps": null,
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "lanes": 0,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```



- string类型

```jsx
const element = <h1>Hello, world!</h1>;
"use strict";

const element = /*#__PURE__*/ React.createElement("h1", null, "Hello, world!");

```

```json
{
    "tag": 5,// HostComponent
    "type": "h1",// React.createElement 时候对应的 type
    "elementType": "h1",// React.createElement 时候对应的 type,lazy 的则为 null
    "pendingProps": {// 整块 pendingProps 都来在 React.createElement 的第二个参数
        "children": "Hello, world!"// children 则来自于第三个以后的参数
    },
    "mode": 0,// mode 继承自 returnFiber
    "lanes": 1,// lanes 继承自 returnFiber
    "key": null,
    "stateNode": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```

- 函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
var element =<Welcome name="lue"/>;

"use strict";
function Welcome(props) {
  return /*#__PURE__*/ React.createElement("h1", null, "Hello, ", props.name);
}
var element = /*#__PURE__*/ React.createElement(Welcome, {
  name: "lue"
});
```

```json
{
    "tag": 2,// 函数组件，IndeterminateComponent
    "mode": 0,// 继承自 returnFiber
    "lanes": 1,// 继承自 returnFiber
    "type": null,// 为一个函数表达式，此处无法转成 json
    "elementType":null,// 为一个函数表达式，此处无法转成 json，和上面的 type 是 (全等的)=== 
    "pendingProps": {// 与 React.createElement 的第二个参数相关
        "name": "lue"
    },
    "key": null,
    "elementType": null,
    "stateNode": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```

- 字符串组件

```json
// 特别说明：{props.name} 也被转为了 tag 为 6 的fiber
{
    "tag": 6,// HostText
    "lanes": 1,// 继承自 returnFiber
    "pendingProps": "Hello, ",// 上述的字符串
    "key": null,
    "elementType": null,
    "type": null,
    "stateNode": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "mode": 0,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```

- React.Fregment

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
var el =  <React.Fragment>
    <Welcome name="abc"/>
    <Welcome name="lue"/>
    <Welcome name="def"/>
    </React.Fragment>;// el不能直接放在 HostRoot 下
var element = <div>abcd{el}</div>
    
"use strict";

function Welcome(props) {
  return /*#__PURE__*/ React.createElement("h1", null, "Hello, ", props.name);
}
var el = /*#__PURE__*/ React.createElement(
  React.Fragment,
  null,
  /*#__PURE__*/ React.createElement(Welcome, {
    name: "abc"
  }),
  /*#__PURE__*/ React.createElement(Welcome, {
    name: "lue"
  }),
  /*#__PURE__*/ React.createElement(Welcome, {
    name: "def"
  })
);
var element = /*#__PURE__*/ React.createElement("div", null, "abcd", el);
```

```json
{
    "tag": 7,// Fragment
    "lanes": 1,// 继承自 returnFiber
    "mode": 0,// 继承自 returnFiber
    "pendingProps": [// pendingProps.children
        {
            "key": null,
            "ref": null,
            "props": {
                "name": "abc"
            },
            "_owner": null
        },
        {
            "key": null,
            "ref": null,
            "props": {
                "name": "lue"
            },
            "_owner": null
        },
        {
            "key": null,
            "ref": null,
            "props": {
                "name": "def"
            },
            "_owner": null
        }
    ],
    "key": null,
    "elementType": null,
    "type": null,
    "stateNode": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```

- React.Profiler

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
var el =  <React.Profiler>
    <Welcome name="abc"/>
    </React.Profiler>;

var element = <div>abcd{el}</div>

"use strict";
function Welcome(props) {
  return /*#__PURE__*/ React.createElement("h1", null, "Hello, ", props.name);
}
var el = /*#__PURE__*/ React.createElement(
  React.Profiler,
  null,
  /*#__PURE__*/ React.createElement(Welcome, {
    name: "abc"
  })
);
var element = /*#__PURE__*/ React.createElement("div", null, "abcd", el);

```

```json
{
    "tag": 12,// Profiler
    "type":Symbol(react.profiler),// 创建 fiber 后再重新赋值生成的
    "elementType":Symbol(react.profiler),// 创建 fiber 后再重新赋值生成的
    "mode": 8,// 合并了 ProfileMode(8)
    "stateNode": {// 创建 fiber 后再重新赋值生成的
        "effectDuration": 0,
        "passiveEffectDuration": 0
    },
    "key": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "pendingProps": {
        "children": {
            "key": null,
            "ref": null,
            "props": {
                "name": "abc"
            },
            "_owner": null
        }
    },
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "lanes": 1,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```

- class组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
var element = <Welcome name="luey"/>
    
    
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
var element = /*#__PURE__*/ React.createElement(Welcome, {
  name: "luey"
});

```

```json
{
    "tag": 1,// ClassComponent
    "lanes": 1,// 继承自 returnFiber
    "mode": 0,// 继承自 returnFiber
    "type":type,// React.createElement 时候的 type ，也就是 class 对象，还没被初始化的（也就是没有被 new）
    "elementType":type,// React.createElement 时候的 type ，也就是 class 对象，还没被初始化的
    "key": null,
    "stateNode": null,
    "return": null,
    "child": null,
    "sibling": null,
    "index": 0,
    "ref": null,
    "pendingProps": {
        "name": "luey"
    },
    "memoizedProps": null,
    "updateQueue": null,
    "memoizedState": null,
    "dependencies": null,
    "flags": 0,
    "nextEffect": null,
    "firstEffect": null,
    "lastEffect": null,
    "childLanes": 0,
    "alternate": null,
    "actualDuration": 0,
    "actualStartTime": -1,
    "selfBaseDuration": 0,
    "treeBaseDuration": 0
}
```

