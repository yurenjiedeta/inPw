这是个很好的问题！让我们比较一下两种方式：

1. 使用泛型的方式：
```typescript
removeHelper<T extends symbol>(name: T): void
```

2. 直接使用 symbol 类型：
```typescript
removeHelper(name: symbol): void
```

乍看之下，第二种方式确实更简单直观。但使用泛型在这里有一个重要的优势：它可以保留具体的字面量类型信息。

让我用例子说明：

```typescript
// 假设我们有一些特定的 helper symbols
const CREATE_VNODE = Symbol('createVNode');
const CREATE_ELEMENT = Symbol('createElement');

// 场景 1: 使用泛型
class CompilerContext {
  removeHelper<T extends symbol>(name: T): void {
    // ...
  }
}

// TypeScript 会保留具体的字面量类型信息
type CreateVNode = typeof CREATE_VNODE;  // symbol 的具体字面量类型
context.removeHelper(CREATE_VNODE);  // T 被推断为具体的 CREATE_VNODE 类型

// 场景 2: 直接使用 symbol
class CompilerContext2 {
  removeHelper(name: symbol): void {
    // ...
  }
}

// TypeScript 会将类型扩展为一般的 symbol
context2.removeHelper(CREATE_VNODE);  // name 的类型仅仅是 symbol
```

使用泛型的主要优势：
1. 保留了更精确的类型信息
2. 在需要根据具体 symbol 类型做进一步处理时更有优势
3. 在类型系统中可以实现更严格的类型检查

例如，如果你想要基于具体的 helper 类型做一些特殊处理：
```typescript
class CompilerContext {
  removeHelper<T extends symbol>(name: T): void {
    // 可以基于具体的 symbol 类型做特殊处理
    if (name === CREATE_VNODE) {
      // 这里的类型检查会更精确
    }
  }
}
```

不过你说得对，如果代码中不需要这种精确的类型信息，使用简单的 `symbol` 类型确实更直观。选择哪种方式主要取决于：
1. 是否需要保留具体的字面量类型信息
2. 是否需要基于具体类型做进一步处理
3. 代码的复杂度和可维护性要求

在 Vue 的编译器中使用泛型可能是因为需要在整个编译过程中保持这种精确的类型信息，以支持更复杂的类型检查和处理逻辑。