在 `JSON.stringify()` 方法中，第二个参数 `replacer` 可以是一个函数或数组，用来筛选和转换对象的属性。

### 示例 1：`replacer` 为数组
当 `replacer` 为数组时，只有数组中列出的属性会被序列化，其他属性将被忽略。

```js
const obj = {
  name: "Alice",
  age: 30,
  gender: "female"
};

// 只序列化 'name' 和 'age' 属性
const jsonString = JSON.stringify(obj, ["name", "age"], 2);
console.log(jsonString);
```

输出：
```json
{
  "name": "Alice",
  "age": 30
}
```

在这个例子中，`replacer` 是 `["name", "age"]`，所以只有 `name` 和 `age` 属性被序列化，`gender` 属性被忽略了。

---

### 示例 2：`replacer` 为函数
当 `replacer` 为一个函数时，函数会被调用来处理每个键值对，可以对值进行修改或过滤。

```js
const obj = {
  name: "Alice",
  age: 30,
  salary: 5000
};

// 使用 replacer 函数，只序列化数字类型的值
const jsonString = JSON.stringify(obj, (key, value) => {
  if (typeof value === 'number') {
    return value;
  }
  return undefined; // 非数字类型的值被过滤
}, 2);

console.log(jsonString);
```

输出：
```json
{
  "age": 30,
  "salary": 5000
}
```

在这个例子中，`replacer` 函数过滤掉了所有非数字类型的属性（比如 `name` 是字符串），所以只保留了数字类型的 `age` 和 `salary` 属性。

---

这两个例子展示了如何通过 `replacer` 来控制 `JSON.stringify()` 的输出，既可以通过数组指定需要的属性，也可以通过函数进行更复杂的筛选和转换。