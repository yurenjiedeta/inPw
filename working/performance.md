`performance.measure()` 是 `Performance` API 中用于测量特定代码块执行时间的方法。它通过在两个 `performance.mark()` 标记之间创建一个度量，适合用于精确测量代码段的执行时间。

以下是一个 `performance.measure()` 的使用例子：

### 1. **使用 `performance.mark()` 和 `performance.measure()` 测量代码段的执行时间**

```javascript
// 开始标记
performance.mark('start');

// 模拟一段需要测量的代码
for (let i = 0; i < 1000000; i++) {
  // 模拟一些耗时的计算
}

// 结束标记
performance.mark('end');

// 创建测量，标记的名字是 'execution-time'
performance.measure('execution-time', 'start', 'end');

// 获取测量结果
const measure = performance.getEntriesByName('execution-time')[0];
console.log(`代码段执行时间: ${measure.duration} 毫秒`);

// 清理标记和测量
performance.clearMarks('start');
performance.clearMarks('end');
performance.clearMeasures('execution-time');
```

### 解释：
- `performance.mark('start')`: 标记代码开始的地方。
- `performance.mark('end')`: 标记代码结束的地方。
- `performance.measure('execution-time', 'start', 'end')`: 通过开始和结束的标记来测量这段代码执行的时间。
- `performance.getEntriesByName('execution-time')`: 获取之前测量的结果，可以从中获得 `duration`，即代码执行的持续时间。

### 2. **多个代码段的测量**

如果你想测量多个代码段的执行时间，也可以添加多个标记和度量：

```javascript
// 标记第一个代码段的开始
performance.mark('start-code-block-1');
for (let i = 0; i < 500000; i++) {
  // 模拟代码段1
}
// 标记第一个代码段的结束
performance.mark('end-code-block-1');

// 标记第二个代码段的开始
performance.mark('start-code-block-2');
for (let i = 0; i < 1000000; i++) {
  // 模拟代码段2
}
// 标记第二个代码段的结束
performance.mark('end-code-block-2');

// 测量两个代码段
performance.measure('code-block-1-time', 'start-code-block-1', 'end-code-block-1');
performance.measure('code-block-2-time', 'start-code-block-2', 'end-code-block-2');

// 获取并输出结果
const block1 = performance.getEntriesByName('code-block-1-time')[0];
const block2 = performance.getEntriesByName('code-block-2-time')[0];

console.log(`代码段1执行时间: ${block1.duration} 毫秒`);
console.log(`代码段2执行时间: ${block2.duration} 毫秒`);

// 清理标记和测量
performance.clearMarks();
performance.clearMeasures();
```

在这个例子中，我们分别测量了两个不同代码段的执行时间，并使用 `performance.measure()` 创建多个度量，以此查看每段代码的耗时。