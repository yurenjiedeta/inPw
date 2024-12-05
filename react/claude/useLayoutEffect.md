我会创建一个全面的 useLayoutEffect 示例集合，涵盖各种使用场景和与 useEffect 的对比。

```javascript
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

// 1. 基础的 DOM 测量示例
function MeasureExample() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    // 在 DOM 更新后同步测量
    if (elementRef.current) {
      const measurement = elementRef.current.getBoundingClientRect();
      setWidth(measurement.width);
    }
  }, []); // 只在挂载时执行

  return (
    <div>
      <div ref={elementRef} style={{ padding: '20px', border: '1px solid black' }}>
        Measure my width
      </div>
      <p>Width: {width}px</p>
    </div>
  );
}

// 2. 避免闪烁的动画示例
function AnimationExample() {
  const [show, setShow] = useState(false);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (elementRef.current && show) {
      const element = elementRef.current;
      // 立即设置初始位置
      element.style.transform = 'translateX(-100%)';
      element.style.transition = 'none';
      
      // 强制重排
      element.getBoundingClientRect();
      
      // 设置动画
      element.style.transform = 'translateX(0)';
      element.style.transition = 'transform 500ms ease-in-out';
    }
  }, [show]);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle Animation</button>
      {show && (
        <div
          ref={elementRef}
          style={{
            padding: '20px',
            backgroundColor: 'blue',
            color: 'white',
          }}
        >
          Smooth Animation
        </div>
      )}
    </div>
  );
}

// 3. Tooltip 定位示例
function TooltipExample() {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // 计算tooltip位置
      tooltipRef.current.style.left = `${buttonRect.left + (buttonRect.width - tooltipRect.width) / 2}px`;
      tooltipRef.current.style.top = `${buttonRect.bottom + 5}px`;
    }
  }, [showTooltip]);

  return (
    <div style={{ padding: '50px' }}>
      <button
        ref={buttonRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Hover me
      </button>
      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            padding: '5px',
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '3px',
          }}
        >
          Tooltip content
        </div>
      )}
    </div>
  );
}

// 4. 实时尺寸监听示例
function ResizeListenerExample() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        resize: 'both',
        overflow: 'auto',
        padding: '20px',
        border: '1px solid black',
        minWidth: '100px',
        minHeight: '100px',
      }}
    >
      <p>Width: {Math.round(dimensions.width)}px</p>
      <p>Height: {Math.round(dimensions.height)}px</p>
      <p>Resize this box!</p>
    </div>
  );
}

// 5. DOM 更新同步示例
function SyncUpdateExample() {
  const [count, setCount] = useState(0);
  const buttonRef = useRef(null);

  // 使用 useEffect - 可能会看到闪烁
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translateX(${count * 10}px)`;
    }
  }, [count]);

  // 使用 useLayoutEffect - 更新是同步的，不会闪烁
  useLayoutEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translateX(${count * 10}px)`;
    }
  }, [count]);

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => setCount(c => c + 1)}
        style={{ transition: 'transform 0.3s' }}
      >
        Move me ({count})
      </button>
    </div>
  );
}

// 6. 自动滚动示例
function AutoScrollExample() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // 当消息列表更新时滚动

  const addMessage = () => {
    setMessages(prev => [...prev, `Message ${prev.length + 1}`]);
  };

  return (
    <div>
      <button onClick={addMessage}>Add Message</button>
      <div style={{ height: '200px', overflow: 'auto', border: '1px solid black' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ padding: '10px' }}>
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

// 7. 条件渲染中的布局测量
function ConditionalMeasureExample() {
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (show && elementRef.current) {
      const newHeight = elementRef.current.scrollHeight;
      setHeight(newHeight);
    } else {
      setHeight(0);
    }
  }, [show]);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle Content</button>
      <div
        style={{
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out',
          height: `${height}px`,
        }}
      >
        <div ref={elementRef}>
          <p>Some content that might be long...</p>
          <p>More content...</p>
          <p>Even more content...</p>
        </div>
      </div>
    </div>
  );
}

// 8. 模态框定位示例
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    if (isOpen && modalRef.current) {
      const modalElement = modalRef.current;
      const viewportHeight = window.innerHeight;
      const modalHeight = modalElement.offsetHeight;
      
      // 确保模态框在视口中居中
      modalElement.style.top = `${Math.max(0, (viewportHeight - modalHeight) / 2)}px`;
      
      // 禁用背景滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <div
            ref={modalRef}
            style={{
              position: 'relative',
              margin: '0 auto',
              width: '80%',
              maxWidth: '500px',
              backgroundColor: 'white',
              padding: '20px',
            }}
          >
            <h2>Modal Content</h2>
            <p>Some modal content here...</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

```

这些示例展示了 useLayoutEffect 的主要用例，让我解释每个示例的要点：

1. DOM 测量示例：
- 同步测量 DOM 元素尺寸
- 避免布局闪烁
- 精确获取元素位置

2. 动画示例：
- 避免动画闪烁
- 同步设置初始状态
- 平滑过渡效果

3. Tooltip 定位：
- 精确计算位置
- 动态更新定位
- 避免位置闪烁

4. 实时尺寸监听：
- 使用 ResizeObserver
- 同步响应尺寸变化
- 实时更新状态

5. DOM 更新同步：
- 对比 useEffect 和 useLayoutEffect
- 展示同步更新的重要性
- 避免视觉闪烁

6. 自动滚动：
- 滚动位置同步更新
- 平滑滚动效果
- 响应内容变化

7. 条件渲染中的布局测量：
- 动态高度计算
- 平滑过渡效果
- 避免布局跳动

8. 模态框定位：
- 居中定位计算
- 视口适配
- 背景滚动控制

使用 useLayoutEffect 的关键点：

1. 使用时机：
- 需要同步 DOM 测量和更新时
- 避免视觉闪烁时
- 需要在浏览器重绘前执行操作时

2. 性能考虑：
- useLayoutEffect 是同步执行的
- 可能会阻塞视觉更新
- 应谨慎使用，只在必要时采用

3. 与 useEffect 的区别：
- useLayoutEffect 同步执行
- useEffect 异步执行
- useLayoutEffect 会阻塞视觉更新

您想深入了解某个特定场景吗？或者有其他关于 useLayoutEffect 的问题？