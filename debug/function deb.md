- debugger function

```js
// 备份原始的 Function.prototype.apply 和 Function.prototype.call
const originalApply = Function.prototype.apply;
const originalCall = Function.prototype.call;

// 辅助函数，用于获取函数名
function getFunctionName(func) {
  // 如果是匿名函数，返回 'anonymous'
  return func.name || 'anonymous';
}

// 重写 Function.prototype.apply
Function.prototype.apply = function(context, args) {
  console.log(`Calling function: ${getFunctionName(this)}`);
  return originalApply.call(this, context, args);
};

// 重写 Function.prototype.call
Function.prototype.call = function(context, ...args) {
  console.log(`Calling function: ${getFunctionName(this)}`);
  return originalCall.call(this, context, ...args);
};

// 测试函数
function exampleFunction() {
  console.log('This is an example function.');
}

const anonymousFunction = function() {
  console.log('This is an anonymous function.');
};

// 调用测试函数
exampleFunction();
anonymousFunction();
```

