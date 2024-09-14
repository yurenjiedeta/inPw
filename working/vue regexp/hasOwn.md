在 Vue 2.6.14 中，`hasOwn` 函数的目的是**检查一个对象是否具有指定的属性**，并确保该属性是该对象自身的属性，而不是从原型链继承来的属性。它封装了 JavaScript 的内置方法 `Object.prototype.hasOwnProperty`，并简化了对象属性检查的调用。

### 函数的具体逻辑：
1. **获取 `hasOwnProperty` 方法**：
   - 通过 `var hasOwnProperty = Object.prototype.hasOwnProperty;`，从 `Object.prototype` 中获取内置的 `hasOwnProperty` 方法。这个方法用于检查某个属性是否是对象的“自有属性”（即该属性不是通过原型链继承的）。

   ```js
   var hasOwnProperty = Object.prototype.hasOwnProperty;
   ```

2. **调用 `hasOwnProperty` 检查属性**：
   - 通过 `hasOwnProperty.call(obj, key)` 来检查 `obj` 是否拥有 `key` 作为它的自有属性。这里使用了 `call` 方法，因为 `hasOwnProperty` 是从 `Object.prototype` 继承下来的，而不是直接定义在 `obj` 上的，所以需要使用 `call` 来确保在 `obj` 上进行检查。

   ```js
   return hasOwnProperty.call(obj, key);
   ```

### 该函数的作用：
- `hasOwn` 函数主要用于判断一个对象是否包含某个属性，且该属性是该对象的自有属性，而不是从其原型链继承的属性。
- 它可以防止直接访问对象的 `hasOwnProperty` 方法时，可能由于对象自身覆盖或未定义该方法而产生的问题，因此是一个更安全的封装。

### 使用场景：
1. **避免继承属性的干扰**：
   - 当需要判断一个对象是否定义了某个属性时，使用 `hasOwn` 可以确保该属性是直接在对象上定义的，而不是从原型链继承的。

2. **Vue 源码中的使用**：
   - 在 Vue 的源码中，`hasOwn` 被广泛用于检查对象（例如组件的 `props`、`data`）是否包含某些属性，确保对象的属性操作不会影响原型链上的其他属性。

### 示例：
```js
var obj = { a: 1 };
console.log(hasOwn(obj, 'a'));    // 输出: true (自有属性)
console.log(hasOwn(obj, 'b'));    // 输出: false (不存在该属性)

var parentObj = { parentProp: true };
var childObj = Object.create(parentObj);
childObj.childProp = 'child';

console.log(hasOwn(childObj, 'childProp'));    // 输出: true (自有属性)
console.log(hasOwn(childObj, 'parentProp'));   // 输出: false (继承属性)
```

在这个示例中，`hasOwn` 函数确保只返回 `true`，当属性是对象的自有属性时。如果属性来自于继承链，则返回 `false`。

### 总结：
`hasOwn` 函数在 Vue 2.6.14 中的主要作用是**安全且可靠地检查对象是否具有某个自有属性**，而不会检查原型链上的继承属性。它封装了 `Object.prototype.hasOwnProperty`，简化了属性检查的操作，并保证了代码的健壮性。