好的，让我用一个最简单的例子来说明 useTransition 的核心作用。

```tsx
import { useState, useTransition } from 'react';

export default function SimpleTransition() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // 模拟一个耗时操作
  const handleClick = () => {
    // 立即更新的状态
    setCount(c => c + 1);

    // 使用 transition 包装耗时操作
    startTransition(() => {
      // 创建大量数据，这是耗时的
      const newItems = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
      setItems(newItems);
    });
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        点击计数: {count}
      </button>

      {isPending ? (
        <div className="mt-2">加载中...</div>
      ) : (
        <div className="mt-2 h-32 overflow-auto">
          {items.slice(0, 20).map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

```

useTransition 的核心作用是：

1. **区分优先级**
   - 紧急更新（如点击响应）立即执行
   - 非紧急更新（如生成大量数据）在后台处理

2. **提升用户体验**
   - UI 保持响应性，不会卡顿
   - 可以显示加载状态
   - 用户可以继续交互

在这个例子中：
- 点击按钮时，计数器立即更新（高优先级）
- 生成大量数据的操作被标记为过渡（低优先级）
- 在生成数据时，界面依然可以响应点击
- isPending 状态用于显示加载提示

这就是 useTransition 最基本的用法，它帮助我们处理耗时操作的同时保持UI的响应性。