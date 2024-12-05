我来重新组织这个示例，按照实际项目中的文件结构来展示。

```javascript
// src/contexts/ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// src/contexts/UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    isAuthenticated: false
  });

  const login = (username) => {
    setUser({
      name: username,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setUser({
      name: '',
      isAuthenticated: false
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// src/components/Header/Header.js
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();

  return (
    <header style={{ 
      background: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#333' : '#fff'
    }}>
      <div>Welcome, {user.name || 'Guest'}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
};

// src/components/Layout/Layout.js
import { Header } from '../Header/Header';

export const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      background: theme === 'light' ? '#f0f0f0' : '#1a1a1a',
      minHeight: '100vh'
    }}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

// src/components/LoginForm/LoginForm.js
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button type="submit">Login</button>
    </form>
  );
};

// src/App.js
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { Layout } from './components/Layout/Layout';
import { LoginForm } from './components/LoginForm/LoginForm';

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Layout>
          <LoginForm />
          {/* Other components */}
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

```

这个示例展示了一个典型的 React 项目中 Context 的组织方式：

1. **目录结构**:
```
src/
  ├── contexts/           # Context 相关文件
  │   ├── ThemeContext.js
  │   └── UserContext.js
  ├── components/         # 组件文件
  │   ├── Header/
  │   ├── Layout/
  │   └── LoginForm/
  ├── App.js
  └── index.js
```

2. **每个 Context 文件包含**:
- Context 的创建
- Provider 组件
- 自定义 Hook
- 相关的类型定义（如果使用 TypeScript）

3. **最佳实践**:
- 每个 Context 都导出自己的自定义 Hook
- Provider 组件在应用顶层组织
- Context 值包含数据和更新方法
- 添加错误处理确保 Context 在 Provider 内使用

4. **使用示例**:
- 主题切换功能 (Theme Context)
- 用户认证状态管理 (User Context)
- 组件中通过自定义 Hook 访问 Context

您想了解更多关于某个特定部分的详细信息吗？或者需要我解释某个特定的实现细节？

