我会创建一个全面的 useImperativeHandle 示例集合，涵盖各种使用场景和最佳实践。

```javascript
import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';

// 1. 基础示例：自定义输入框
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // 暴露自定义的聚焦方法
    focus: () => {
      inputRef.current.focus();
    },
    // 暴露自定义的清空方法
    clear: () => {
      inputRef.current.value = '';
    },
    // 暴露获取值的方法
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// 2. 复杂表单控件示例
const CustomForm = forwardRef((props, ref) => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  useImperativeHandle(ref, () => ({
    // 暴露表单验证方法
    validate: () => {
      const newErrors = {};
      if (!values.username) newErrors.username = 'Username is required';
      if (!values.password) newErrors.password = 'Password is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    // 暴露重置方法
    reset: () => {
      setValues({ username: '', password: '' });
      setErrors({});
    },
    // 暴露获取值方法
    getValues: () => values,
    // 暴露设置值方法
    setValues: (newValues) => {
      setValues(newValues);
    }
  }));

  return (
    <form>
      <div>
        <input
          value={values.username}
          onChange={e => setValues(prev => ({ ...prev, username: e.target.value }))}
          placeholder="Username"
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>
      <div>
        <input
          type="password"
          value={values.password}
          onChange={e => setValues(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Password"
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
    </form>
  );
});

// 3. 媒体播放器示例
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useImperativeHandle(ref, () => ({
    // 播放控制
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    stop: () => {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    },
    // 时间控制
    seek: (time) => {
      videoRef.current.currentTime = time;
    },
    // 音量控制
    setVolume: (volume) => {
      videoRef.current.volume = volume;
    },
    // 获取状态
    getCurrentTime: () => currentTime,
    getDuration: () => duration,
    isPlaying: () => !videoRef.current.paused
  }));

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', () => setCurrentTime(video.currentTime));
    video.addEventListener('loadedmetadata', () => setDuration(video.duration));
    return () => {
      video.removeEventListener('timeupdate', () => setCurrentTime(video.currentTime));
      video.removeEventListener('loadedmetadata', () => setDuration(video.duration));
    };
  }, []);

  return (
    <video ref={videoRef} {...props}>
      <source src={props.src} type="video/mp4" />
    </video>
  );
});

// 4. 模态框示例
const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  useImperativeHandle(ref, () => ({
    // 打开模态框
    open: (newContent) => {
      setContent(newContent);
      setIsOpen(true);
    },
    // 关闭模态框
    close: () => {
      setIsOpen(false);
    },
    // 更新内容
    updateContent: (newContent) => {
      setContent(newContent);
    },
    // 获取状态
    isOpen: () => isOpen
  }));

  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px'
      }}>
        {content}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
});

// 5. 绘图画布示例
const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    setContext(ctx);
  }, []);

  useImperativeHandle(ref, () => ({
    // 清空画布
    clear: () => {
      context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    },
    // 设置画笔样式
    setStrokeStyle: (color) => {
      if (context) context.strokeStyle = color;
    },
    setLineWidth: (width) => {
      if (context) context.lineWidth = width;
    },
    // 保存画布内容
    save: () => {
      return canvasRef.current.toDataURL();
    },
    // 加载图片
    loadImage: (imageUrl) => {
      const img = new Image();
      img.onload = () => {
        context?.drawImage(img, 0, 0);
      };
      img.src = imageUrl;
    }
  }));

  const startDrawing = (e) => {
    setIsDrawing(true);
    context?.beginPath();
    context?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    context?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context?.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      width={props.width || 500}
      height={props.height || 300}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={() => setIsDrawing(false)}
      onMouseOut={() => setIsDrawing(false)}
      style={{ border: '1px solid black' }}
    />
  );
});

// 6. 滚动容器示例
const ScrollContainer = forwardRef((props, ref) => {
  const containerRef = useRef();

  useImperativeHandle(ref, () => ({
    // 滚动控制
    scrollTo: (x, y) => {
      containerRef.current.scrollTo(x, y);
    },
    scrollToTop: () => {
      containerRef.current.scrollTo(0, 0);
    },
    scrollToBottom: () => {
      containerRef.current.scrollTo(
        0,
        containerRef.current.scrollHeight - containerRef.current.clientHeight
      );
    },
    // 获取滚动信息
    getScrollPosition: () => ({
      x: containerRef.current.scrollLeft,
      y: containerRef.current.scrollTop
    }),
    getScrollHeight: () => containerRef.current.scrollHeight,
    getClientHeight: () => containerRef.current.clientHeight
  }));

  return (
    <div
      ref={containerRef}
      style={{
        height: props.height || '300px',
        overflow: 'auto'
      }}
      {...props}
    />
  );
});

// 7. 定时器组件示例
const Timer = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  useImperativeHandle(ref, () => ({
    // 定时器控制
    start: () => {
      if (!isRunning) {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
          setTime(t => t + 1);
        }, 1000);
      }
    },
    pause: () => {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    },
    reset: () => {
      setTime(0);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    },
    // 获取状态
    getTime: () => time,
    isRunning: () => isRunning
  }));

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      Time: {time} seconds
    </div>
  );
});

// 8. 动画组件示例
const AnimatedBox = forwardRef((props, ref) => {
  const boxRef = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    // 移动控制
    moveTo: (x, y) => {
      setPosition({ x, y });
    },
    moveBy: (dx, dy) => {
      setPosition(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
    },
    // 动画控制
    animate: (keyframes, options) => {
      return boxRef.current.animate(keyframes, options);
    },
    // 获取状态
    getPosition: () => position
  }));

  return (
    <div
      ref={boxRef}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'blue',
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s ease'
      }}
    />
  );
});

```

这些示例展示了 useImperativeHandle 的多种用法，让我解释每个示例的要点：

1. 基础输入框示例：
- 暴露基本的输入框操作
- 封装和限制 DOM 访问
- 提供清晰的接口

2. 复杂表单控件：
- 表单验证控制
- 状态管理
- 值的获取和设置

3. 媒体播放器：
- 播放控制
- 时间和进度控制
- 状态监听

4. 模态框：
- 显示控制
- 内容更新
- 状态查询

5. 绘图画布：
- 画布操作
- 样式设置
- 图像处理

6. 滚动容器：
- 滚动控制
- 位置信息
- 尺寸查询

7. 定时器组件：
- 计时控制
- 状态管理
- 清理操作

8. 动画组件：
- 位置控制
- 动画管理
- 状态查询

使用 useImperativeHandle 的最佳实践：

1. 限制暴露的方法：
- 只暴露必要的操作
- 保持接口简单
- 避免暴露内部状态

2. 合理使用：
- 用于必要的命令式操作
- 配合 forwardRef 使用
- 考虑是否真的需要命令式API

3. 性能考虑：
- 避免频繁更新
- 合理使用依赖
- 注意内存泄漏

您想深入了解某个特定场景吗？或者有其他关于 useImperativeHandle 的问题？