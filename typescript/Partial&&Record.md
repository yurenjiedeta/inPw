让我详细介绍 `Partial` 和 `Record` 的使用场景和例子：

1. `Partial<T>` 的使用例子：
```typescript
// 原始接口
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 使用 Partial
type PartialUser = Partial<User>;
// 等同于：
// interface PartialUser {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

// 实际使用场景：更新用户信息
function updateUser(userId: number, updates: Partial<User>) {
  // 只需要提供要更新的字段
  const user = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 25
  };
  
  // 合并更新
  return { ...user, ...updates };
}

// 调用时可以只提供部分字段
updateUser(1, { 
  age: 26,
  email: "new.john@example.com"
});
```

2. `Record<K, T>` 的使用例子：
```typescript
// 基本使用
type PageInfo = Record<string, string>;
// 等同于：
// interface PageInfo {
//   [key: string]: string;
// }

// 使用字面量类型作为键
type HttpStatus = Record<'ok' | 'error' | 'loading', boolean>;
// 等同于：
// interface HttpStatus {
//   ok: boolean;
//   error: boolean;
//   loading: boolean;
// }

// 实际使用场景：API 响应缓存
type CacheRecord = Record<string, {
  data: any;
  timestamp: number;
}>;

const cache: CacheRecord = {
  '/api/users': {
    data: ['user1', 'user2'],
    timestamp: Date.now()
  },
  '/api/posts': {
    data: ['post1', 'post2'],
    timestamp: Date.now()
  }
};
```

3. 组合使用的高级例子：
```typescript
// 定义状态类型
interface TaskState {
  isComplete: boolean;
  progress: number;
  errors: string[];
}

// 定义任务 ID 类型
type TaskId = 'task1' | 'task2' | 'task3';

// 创建任务状态映射，所有字段都是可选的
type TaskStateMap = Record<TaskId, Partial<TaskState>>;

// 使用示例
class TaskManager {
  private taskStates: TaskStateMap = {
    task1: { isComplete: false },
    task2: { progress: 50 },
    task3: { errors: ['Error 1'] }
  };

  updateTask(taskId: TaskId, updates: Partial<TaskState>) {
    this.taskStates[taskId] = {
      ...this.taskStates[taskId],
      ...updates
    };
  }
}
```

4. 实际应用场景：表单处理
```typescript
// 表单字段接口
interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

// 创建表单状态类型
type FormState = Record<string, Partial<FormField>>;

class FormHandler {
  private state: FormState = {};

  updateField(name: string, updates: Partial<FormField>) {
    this.state[name] = {
      ...this.state[name],
      ...updates
    };
  }

  getFieldState(name: string): Partial<FormField> {
    return this.state[name] || {};
  }
}

// 使用示例
const form = new FormHandler();
form.updateField('email', {
  value: 'user@example.com',
  touched: true
});
```

5. 配置对象的例子：
```typescript
// 配置项接口
interface ConfigItem {
  enabled: boolean;
  value: string | number;
  description: string;
}

// 创建配置类型，所有字段都是可选的
type Config = Record<string, Partial<ConfigItem>>;

// 使用示例
const appConfig: Config = {
  'feature-a': {
    enabled: true,
    value: 'active'
  },
  'feature-b': {
    enabled: false,
    description: 'This feature is currently disabled'
  },
  'max-users': {
    value: 100
  }
};
```

这些类型工具在实际开发中非常有用：
1. `Partial` 主要用于：
   - 更新操作，只需要提供部分字段
   - 初始化对象，可以逐步添加属性
   - 创建可选的配置对象

2. `Record` 主要用于：
   - 创建键值映射
   - 定义统一的对象结构
   - 管理状态或缓存
   - 创建查找表或字典

3. 组合使用可以创建更灵活和强大的类型定义，特别适合处理：
   - 表单状态管理
   - 配置系统
   - 缓存系统
   - 状态管理
   - API 响应处理