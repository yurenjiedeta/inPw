我来详细介绍 React 自定义 Hook 的各种实用场景和具体实现。

```javascript
// 1. 状态管理类 Hook
// 1.1 表单处理
const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!values.email) tempErrors.email = "Email is required";
    if (!values.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return { values, errors, handleChange, validate };
};

// 使用示例
function LoginForm() {
  const { values, errors, handleChange, validate } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 提交表单
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}
      {/* ... */}
    </form>
  );
}

// 1.2 本地存储管理
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// 2. 网络请求类 Hook
// 2.1 数据获取
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// 2.2 WebSocket连接
const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    return () => ws.close();
  }, [url]);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(message);
    }
  };

  return { messages, sendMessage };
};

// 3. UI交互类 Hook
// 3.1 窗口尺寸监听
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// 3.2 滚动位置监听
const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

// 4. 性能优化类 Hook
// 4.1 防抖
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// 4.2 节流
const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() >= lastExecuted.current + delay) {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
};

// 5. 设备API类 Hook
// 5.1 地理位置
const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported'
      }));
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
    };

    const handleError = (error) => {
      setLocation(prev => ({
        ...prev,
        error: error.message
      }));
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return location;
};

// 5.2 媒体查询
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);

    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, [query]);

  return matches;
};

// 6. 业务逻辑类 Hook
// 6.1 权限控制
const usePermission = (requiredPermission) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        // 假设从API获取用户权限
        const userPermissions = await fetchUserPermissions();
        setHasPermission(userPermissions.includes(requiredPermission));
      } catch (error) {
        console.error(error);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [requiredPermission]);

  return { hasPermission, loading };
};

// 6.2 主题切换
const useTheme = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, []);

  return { theme, toggleTheme };
};

```

这些自定义Hook涵盖了以下主要使用场景：

1. 状态管理类
- 表单处理（useForm）
- 本地存储管理（useLocalStorage）
- 全局状态管理
- 状态持久化

2. 网络请求类
- 数据获取（useFetch）
- WebSocket连接（useWebSocket）
- API调用封装
- 请求状态管理

3. UI交互类
- 窗口尺寸监听（useWindowSize）
- 滚动位置监听（useScroll）
- 鼠标位置追踪
- 键盘事件处理

4. 性能优化类
- 防抖处理（useDebounce）
- 节流处理（useThrottle）
- 缓存优化
- 计算结果记忆

5. 设备API类
- 地理位置（useGeolocation）
- 媒体查询（useMediaQuery）
- 设备方向
- 传感器数据

6. 业务逻辑类
- 权限控制（usePermission）
- 主题切换（useTheme）
- 国际化
- 路由管理

使用建议：

1. 命名规范：
- 使用"use"前缀
- 采用驼峰命名法
- 名称要能清晰表达功能

2. 设计原则：
- 单一职责
- 可复用性
- 参数灵活性
- 返回值语义化

3. 错误处理：
- 合理使用try-catch
- 提供错误状态
- 添加适当的错误提示

4. 性能考虑：
- 合理使用useCallback和useMemo
- 避免过度依赖
- 及时清理副作用

这些自定义Hook示例可以根据实际项目需求进行修改和扩展。良好的Hook设计可以显著提高代码复用性和可维护性。