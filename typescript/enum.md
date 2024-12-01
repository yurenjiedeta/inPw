我来详细介绍 TypeScript 中 enum 的所有主要使用场景和特性：

1. 基本数字枚举：
```typescript
// 自动从 0 开始编号
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// 使用
let dir: Direction = Direction.Up;
console.log(Direction.Up);        // 0
console.log(Direction[0]);        // "Up"
console.log(Direction["Up"]);     // 0
```

2. 指定起始值的数字枚举：
```typescript
enum StatusCode {
  OK = 200,
  NotFound = 404,
  Error = 500
}

// 混合自动编号
enum MixedNumbers {
  Zero = 0,
  One,           // 1
  Two = 20,
  Three,         // 21
  Four           // 22
}
```

3. 字符串枚举：
```typescript
enum TextAlignment {
  Left = "LEFT",
  Center = "CENTER",
  Right = "RIGHT"
}

// 混合字符串和数字
enum Mixed {
  Name = "NAME",
  Id = 1,
  Description = "DESC"
}
```

4. 常量枚举（const enum）：
```typescript
// 编译时会被内联，提高性能
const enum Constants {
  Max = 100,
  Min = 0
}

let max = Constants.Max;  // 编译后直接变成：let max = 100;
```

5. 计算成员和常量成员：
```typescript
enum Calculated {
  // 常量成员
  Constant = 1,
  // 计算成员
  Calculated = Math.floor(Math.random() * 100),
  // 引用之前的成员
  Double = Constant * 2
}
```

6. 反向映射：
```typescript
enum AccessMode {
  Read = 1,
  Write = 2,
  ReadWrite = Read | Write
}

console.log(AccessMode[1]);  // "Read"
console.log(AccessMode.Read);  // 1
```

7. 联合枚举类型：
```typescript
enum ShapeKind {
  Circle,
  Square
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

type Shape = Circle | Square;
```

8. 在对象中使用枚举：
```typescript
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

interface UserConfig {
  role: UserRole;
  permissions: {
    [key in UserRole]?: boolean;
  }
}

const config: UserConfig = {
  role: UserRole.Admin,
  permissions: {
    [UserRole.Admin]: true,
    [UserRole.User]: false
  }
}
```

9. 枚举作为参数类型：
```typescript
enum LogLevel {
  Error = "ERROR",
  Warning = "WARNING",
  Info = "INFO",
  Debug = "DEBUG"
}

function log(message: string, level: LogLevel) {
  console.log(`[${level}] ${message}`);
}

log("Server started", LogLevel.Info);
```

10. 使用命名空间扩展枚举：
```typescript
enum Vegetables {
  Tomato = "tomato",
  Carrot = "carrot"
}

namespace Vegetables {
  export function makeSalad() {
    return `Salad with ${Vegetables.Tomato} and ${Vegetables.Carrot}`;
  }
}

console.log(Vegetables.makeSalad());
```

11. 位掩码枚举：
```typescript
enum FileAccess {
  None = 0,
  Read = 1 << 0,     // 1
  Write = 1 << 1,    // 2
  Execute = 1 << 2,  // 4
  Full = Read | Write | Execute
}

// 使用位运算
function checkAccess(access: FileAccess) {
  if (access & FileAccess.Read) {
    console.log("Has read access");
  }
}
```

12. 枚举合并：
```typescript
enum Animals {
  Dog = "DOG"
}

enum Animals {
  Cat = "CAT",
  Bird = "BIRD"
}

// 结果包含所有成员
console.log(Animals.Dog);   // "DOG"
console.log(Animals.Cat);   // "CAT"
console.log(Animals.Bird);  // "BIRD"
```

这些示例涵盖了 TypeScript 枚举的主要使用场景。枚举在以下情况特别有用：
1. 表示一组固定的常量值
2. 需要双向映射（值到名称和名称到值）
3. 需要类型安全的常量集合
4. 在编译时需要内联常量值
5. 需要使用位运算的场景

需要注意的是，虽然枚举很方便，但在某些情况下可能会增加编译后的代码量。如果只需要简单的常量集合，有时使用联合类型或 const 对象可能更合适。