让我通过具体的例子来详细说明 `Omit` 和 `Required` 的用法：

1. `Omit<Type, Keys>` 的使用示例：
```typescript
// 基础接口
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 从 User 中排除 password，用于安全返回用户信息
type PublicUser = Omit<User, 'password'>;
// 结果等同于：
// interface PublicUser {
//   id: number;
//   name: string;
//   email: string;
// }

// 排除多个属性
type BasicUser = Omit<User, 'password' | 'email'>;
// 结果等同于：
// interface BasicUser {
//   id: number;
//   name: string;
// }

// 实际使用例子
function getPublicUserInfo(user: User): PublicUser {
  const { id, name, email } = user;
  return { id, name, email };
}
```

2. `Required<Type>` 的使用示例：
```typescript
// 带有可选属性的接口
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
  version: string;  // 这个是必需的
}

// 将所有属性变为必需
type RequiredConfig = Required<Config>;
// 结果等同于：
// interface RequiredConfig {
//   host: string;    // 不再是可选的
//   port: number;    // 不再是可选的
//   debug: boolean;  // 不再是可选的
//   version: string; // 原本就是必需的
// }

// 实际使用例子
function initializeServer(config: RequiredConfig) {
  // 可以安全地访问所有属性，不需要检查是否存在
  console.log(`Starting server on ${config.host}:${config.port}`);
}
```

3. 组合使用的高级示例：
```typescript
interface UserSettings {
  theme?: 'light' | 'dark';
  notifications?: {
    email?: boolean;
    push?: boolean;
  };
  language: string;
  privacyLevel?: 'public' | 'private';
}

// 假设 PrivacyOptions 包含隐私相关的设置
interface PrivacyOptions {
  privacyLevel: 'public' | 'private';
}

// 创建一个必需的、不包含隐私设置的用户配置类型
type RequiredDisplaySettings = Required<Omit<UserSettings, keyof PrivacyOptions>>;
// 结果等同于：
// interface RequiredDisplaySettings {
//   theme: 'light' | 'dark';
//   notifications: {
//     email?: boolean;
//     push?: boolean;
//   };
//   language: string;
// }

// 实际使用例子
function applyUserSettings(settings: RequiredDisplaySettings) {
  // 可以安全地访问 theme 和 language
  document.body.className = settings.theme;
  document.documentElement.lang = settings.language;
  
  // notifications 结构也是必需的，但其内部属性仍是可选的
  if (settings.notifications.email) {
    // 处理邮件通知设置
  }
}
```

4. 实际应用场景示例：
```typescript
interface APIRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

// 创建一个用于内部请求的类型，必须指定所有字段
type InternalAPIRequest = Required<APIRequest>;

// 创建一个不包含 body 的 GET 请求类型
type GetRequest = Required<Omit<APIRequest, 'body'>>;

// 使用示例
function makeRequest(config: InternalAPIRequest) {
  // 所有属性都是必需的，可以安全地使用
  fetch(config.endpoint, {
    method: config.method,
    headers: config.headers,
    body: JSON.stringify(config.body)
  });
}
```

这些类型工具的使用可以帮助我们：
1. 在不同场景下重用和改造类型
2. 确保类型安全
3. 减少代码重复
4. 创建更精确的类型定义

需要注意的是，`Required` 只会影响直接属性，对于嵌套对象的属性不会递归应用。如果需要递归地使其所有属性必需，你可能需要创建自定义的类型工具。