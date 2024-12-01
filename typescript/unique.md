让我详细解释 `unique symbol` 的特性和使用场景。

1. 唯一性保证：
```typescript
// 普通 symbol 的情况
const sym1: symbol = Symbol('test');
const sym2: symbol = Symbol('test');
let symVar: symbol = sym1;  // 可以赋值
symVar = sym2;             // 也可以赋值，因为类型都是 symbol

// unique symbol 的情况
const uniqueSym1: unique symbol = Symbol('test');
const uniqueSym2: unique symbol = Symbol('test');
// 错误：不能将 uniqueSym2 赋值给 uniqueSym1 类型的变量
// let symVar: typeof uniqueSym1 = uniqueSym2; // 这会报错
```

2. 声明限制：
```typescript
// unique symbol 只能用于 const 声明或 readonly static 类成员
const validUniqueSym: unique symbol = Symbol();  // 正确

// 以下都是错误的用法：
let invalidUniqueSym: unique symbol = Symbol();   // 错误
var anotherInvalidSym: unique symbol = Symbol(); // 错误

// 在类中的正确用法
class MyClass {
    static readonly classSymbol: unique symbol = Symbol();  // 正确
    instanceSymbol: unique symbol = Symbol();              // 错误
}
```

3. 在类型系统中的应用：
```typescript
// 作为对象字面量的计算属性
const KEY: unique symbol = Symbol('key');

interface Container {
    [KEY]: string;  // 使用 unique symbol 作为属性键
}

const container: Container = {
    [KEY]: "value"
};

// 只能用正确的 symbol 访问
console.log(container[KEY]);  // 正确
// console.log(container[Symbol('key')]);  // 错误
```

4. 与类型系统的交互：
```typescript
const METADATA: unique symbol = Symbol('metadata');

// 在泛型中使用
interface HasMetadata<T> {
    [METADATA]: T;
}

class DataContainer implements HasMetadata<string> {
    [METADATA]: string = "data";
}
```

5. 用途示例：
```typescript
// 用于品牌化类型
const Brand: unique symbol = Symbol('brand');

interface BrandedString {
    [Brand]: 'string';
    value: string;
}

// 用于私有属性
class PrivateData {
    static readonly private: unique symbol = Symbol('private');
    
    private [PrivateData.private]: string;
    
    constructor(data: string) {
        this[PrivateData.private] = data;
    }
}
```

使用 `unique symbol` 的主要场景：

1. 框架和库开发：
```typescript
// Vue 源码中的例子
const RENDER_HELPERS: unique symbol = Symbol('renderHelpers');
const CREATE_VNODE: unique symbol = Symbol('createVNode');

interface ComponentInternals {
    [RENDER_HELPERS]: Set<symbol>;
    [CREATE_VNODE]: () => void;
}
```

2. 类型安全的键：
```typescript
const EntityId: unique symbol = Symbol('entityId');
const MetadataKey: unique symbol = Symbol('metadata');

interface Entity {
    [EntityId]: number;
    [MetadataKey]: Record<string, unknown>;
}
```

3. 常量定义：
```typescript
// 在大型应用中定义唯一的操作类型
const ADD_USER: unique symbol = Symbol('ADD_USER');
const REMOVE_USER: unique symbol = Symbol('REMOVE_USER');

type Action = {
    type: typeof ADD_USER | typeof REMOVE_USER;
    payload: any;
}
```

`unique symbol` 的优势：
1. 提供类型级别的唯一性保证
2. 防止符号混淆和误用
3. 在编译时捕获潜在错误
4. 支持更精确的类型检查
5. 适合用于创建真正私有的属性或方法

使用时的注意事项：
1. 只能用于 const 声明或 readonly static 类成员
2. 不能被重新赋值
3. 每个 unique symbol 类型都是独一无二的
4. 需要使用 typeof 来引用类型