好的，我用最简单的例子来说明 useDeferredValue 的核心作用。

```tsx
import React, { useState, useDeferredValue } from 'react';

export default function SimpleExample() {
  // 普通输入状态
  const [input, setInput] = useState('');
  
  // 创建延迟值
  const deferredInput = useDeferredValue(input);

  return (
    <div className="p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded"
        placeholder="输入些内容..."
      />

      <div className="mt-4 space-y-2">
        <div>当前输入: {input}</div>
        <div>延迟值: {deferredInput}</div>
      </div>
    </div>
  );
}

```

useDeferredValue 的核心作用很简单：

1. **延迟更新**
   - 对于一个频繁变化的值，创建一个延迟版本
   - 主要用于处理性能开销大的渲染

2. **具体表现**
   - 用户输入立即显示
   - 延迟值会稍后更新
   - 适合处理列表过滤、搜索等场景

在上面的例子中：
- 当你输入文字时，input 值立即更新
- deferredInput 值会稍微延迟更新
- 这种延迟在性能开销大的场景中特别有用

简单来说，useDeferredValue 就像是一个"延迟镜像"，用于处理开销大的更新，同时保持界面响应性。