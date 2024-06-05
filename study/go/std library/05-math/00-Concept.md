### `math`包的功能定义

`math`包是Go标准库中的一个包，提供了基本的数学函数和常量。它是Go语言中进行数学计算的基础工具，涵盖了浮点运算、三角函数、对数函数、指数函数和一些特殊函数。`math`包主要功能包括：

1. **基本数学常量**：
   - 提供了多种数学常量，如`Pi`（π）、`E`（自然对数的底数）、`Phi`（黄金比例）、`Sqrt2`（2的平方根）等，用于常见的数学计算。

2. **基本运算函数**：
   - 提供了多种基本运算函数，如`Abs`（绝对值）、`Pow`（幂运算）、`Sqrt`（平方根）、`Cbrt`（立方根）等，用于常见的数学运算。
   - 支持对浮点数、整数和复数的运算。

3. **三角函数**：
   - 提供了多种三角函数，如`Sin`（正弦）、`Cos`（余弦）、`Tan`（正切）等，用于三角运算。
   - 提供了反三角函数，如`Asin`（反正弦）、`Acos`（反余弦）、`Atan`（反正切）等。

4. **指数和对数函数**：
   - 提供了多种指数和对数函数，如`Exp`（指数）、`Log`（自然对数）、`Log10`（以10为底的对数）、`Log2`（以2为底的对数）等，用于指数和对数运算。

5. **特殊函数**：
   - 提供了多种特殊函数，如`Gamma`（伽玛函数）、`Erf`（误差函数）、`Erfc`（余误差函数）等，用于高级数学计算。

6. **角度转换函数**：
   - 提供了角度与弧度之间的转换函数，如`DegToRad`（角度转弧度）、`RadToDeg`（弧度转角度）等。

7. **浮点数处理函数**：
   - 提供了多种浮点数处理函数，如`Ceil`（向上取整）、`Floor`（向下取整）、`Round`（四舍五入）、`Trunc`（截断）等，用于浮点数的处理和转换。
   - 提供了对浮点数进行比大小的函数，如`Max`、`Min`等。

### 使用示例

以下是`math`包的一些常见用法示例：

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	// 基本运算
	fmt.Println("Absolute value of -5:", math.Abs(-5)) // 输出: Absolute value of -5: 5
	fmt.Println("Square root of 16:", math.Sqrt(16))   // 输出: Square root of 16: 4

	// 三角函数
	angle := math.Pi / 4
	fmt.Println("Sin(π/4):", math.Sin(angle)) // 输出: Sin(π/4): 0.7071067811865476
	fmt.Println("Cos(π/4):", math.Cos(angle)) // 输出: Cos(π/4): 0.7071067811865476

	// 指数和对数函数
	fmt.Println("Exp(1):", math.Exp(1))   // 输出: Exp(1): 2.718281828459045
	fmt.Println("Log(10):", math.Log(10)) // 输出: Log(10): 2.302585092994046

	// 特殊函数
	fmt.Println("Gamma(5):", math.Gamma(5)) // 输出: Gamma(5): 24

	// 角度转换
	fmt.Println("Degrees to Radians (180°):", math.DegToRad(180)) // 输出: Degrees to Radians (180°): 3.141592653589793
	fmt.Println("Radians to Degrees (π):", math.RadToDeg(math.Pi)) // 输出: Radians to Degrees (π): 180

	// 浮点数处理
	fmt.Println("Ceil(3.14):", math.Ceil(3.14)) // 输出: Ceil(3.14): 4
	fmt.Println("Floor(3.14):", math.Floor(3.14)) // 输出: Floor(3.14): 3
}

```

### 结论

`math`包是Go语言中进行数学计算的基础工具。它提供了丰富的数学函数和常量，支持从基本运算到复杂数学计算的广泛需求。通过`math`包，开发人员可以在Go语言中方便地进行各种数学运算，提升代码的效率和准确性。