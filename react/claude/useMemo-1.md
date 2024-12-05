让我通过具体示例来解释这些问题。

1. useMemo 重新执行的情况：
```javascript
function Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // 1. 当依赖项(count)改变时重新执行
  const doubledCount = useMemo(() => {
    console.log('Calculating doubled count...');
    return count * 2;
  }, [count]);

  // 2. 组件重新渲染但依赖项没变时不会重新执行
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return someExpensiveOperation();
  }, []); // 空依赖数组，只计算一次

  // 3. 当任一依赖项改变时重新执行
  const fullInfo = useMemo(() => {
    return `${name}-${count}`;
  }, [name, count]);

  return (...)
}
```

2. 关于引用类型数据修改：
```javascript
function DataExample() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]);

  // 错误示例：直接修改缓存的数据
  const processedUsers = useMemo(() => {
    const result = [...users];
    result[0].name = 'Modified'; // 这会修改原始 state！
    return result;
  }, [users]);

  // 正确示例：创建新的引用
  const safeProcessedUsers = useMemo(() => {
    return users.map(user => ({
      ...user,
      name: user.id === 1 ? 'Modified' : user.name
    }));
  }, [users]);
}
```

3. 引用类型修改对 state 的影响：
```javascript
function MutationExample() {
  const [data, setData] = useState({ count: 0, items: [] });

  // 不好的做法：直接修改缓存的对象
  const memoizedData = useMemo(() => {
    const newData = data;
    newData.items.push('new item'); // 这会修改原始 state！
    return newData;
  }, [data]);

  // 好的做法：使用不可变更新
  const safeMemoizedData = useMemo(() => {
    return {
      ...data,
      items: [...data.items, 'new item']
    };
  }, [data]);
}
```

4. 避免引用类型修改的最佳实践：
```javascript
function BestPracticeExample() {
  const [data, setData] = useState({ items: [1, 2, 3] });

  // 1. 使用不可变更新模式
  const processedData = useMemo(() => {
    return {
      ...data,
      items: data.items.map(item => item * 2)
    };
  }, [data]);

  // 2. 使用深拷贝（当需要时）
  const deepProcessedData = useMemo(() => {
    return JSON.parse(JSON.stringify(data));
  }, [data]);

  // 3. 使用 immer 进行不可变更新
  const immerProcessedData = useMemo(() => {
    return produce(data, draft => {
      draft.items.push(4);
    });
  }, [data]);
}
```

关键点总结：

1. useMemo 重新执行的条件：
- 当依赖数组中的任何值发生改变时
- 如果依赖数组为空，则只在组件首次渲染时执行
- 组件重新渲染但依赖项没有变化时不会重新执行

2. 引用类型数据修改的影响：
- 直接修改缓存的引用类型数据会影响原始 state
- 应该始终使用不可变更新模式
- 避免在 useMemo 中直接修改数据

3. 最佳实践：
- 总是返回新的引用而不是修改现有数据
- 使用展开运算符或 Object.assign 创建新对象
- 考虑使用 immer 等工具进行不可变更新
- 必要时进行深拷贝

4. 需要注意的问题：
- 缓存的值仍然可以访问闭包中的变量
- 要小心处理异步操作中的数据更新
- 考虑性能影响，不是所有计算都需要缓存

你遇到过具体的数据修改问题吗？或者想了解更具体的使用场景？