- getDOMNodeID.js

```js
/**
@param {Element} domNode :要返回 ID 的 html元素。
@returns {string} 返回 domNo 元素的 ID 字符串
---------------------------------------------------
判断是否有获取属性的方法，如果没有，则直接获取。
*/
function getDOMNodeID(domNode) {
  if (domNode.getAttributeNode) {
    var attributeNode = domNode.getAttributeNode('id');
    return attributeNode && attributeNode.value || '';
  } else {
    return domNode.id || '';
  }
}
```

- ReactStateSetters.js

```js
/**
@method createStateKeySetter
@param  {ReactCompositeComponent} component  一个对象
@param  key  一个缓存 key 值
----------------------
@returns {function} stateKeySetter 一个缓存了一个闭包对象的高阶函数
------------------------------------------
部分状态在函数闭包之外分配，因此可以在每次调用时重复使用，从而避免在调用此函数时分配内存。避免分配的某个 key 值
*/
function createStateKeySetter(component, key) {
  var partialState = {};
  return function stateKeySetter(value) {
    partialState[key] = value;
    component.setState(partialState);
  };
}

/**
@param {ReactCompositeComponent} component，一个react的组件
@param {funcReturningState} funcReturningState
-------------------------------
@returns {partialState} 返回一个高阶函数，用于执行react组件的 setState 方法
-------------------
利用一个高阶函数的返回值，以执行 component 的 setState方法
*/
function createStateSetter(component, funcReturningState) {
    return function(a, b, c, d, e, f) {
      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
      if (partialState) {
        component.setState(partialState);
      }
    };
  }


/**
@param {ReactCompositeComponent} component
@string {string} key
----------------------
@return {function} createStateKeySetter函数(顶部第一个说明)，调用结果的返回值
------------------------------------------------------------------
该函数帮 component__keySetters 对象  生成对应的 stateSetter
*/
function createStateKeySetter(component, key) {
    // Memoize the setters.
    var cache = component.__keySetters || (component.__keySetters = {});
    return cache[key] || (cache[key] = createStateKeySetter(component, key));
  }
```

