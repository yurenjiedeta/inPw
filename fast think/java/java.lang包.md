在Java中，`Math`类属于`java.lang`包中的一部分。`java.lang`包是Java语言核心的一部分，它包含了许多常用的基本类，例如`String`、`System`、`Object`、`Integer`等。

由于`java.lang`包是Java核心的一部分，因此这个包中的所有类都默认自动导入到每一个Java程序中。这意味着你不需要显式地导入`java.lang.Math`类即可使用它的功能。

### 示例说明

你可以直接在代码中使用`Math`类的方法，而无需导入：

```java
public class Main {
    public static void main(String[] args) {
        double result = Math.sqrt(16);  // 使用 Math 类的方法
        System.out.println("Square root of 16: " + result);
    }
}
```

在这个示例中，尽管没有使用`import java.lang.Math;`，你仍然可以直接使用`Math.sqrt`方法，这是因为`java.lang`包中的所有类默认自动导入。

### 默认导入的`java.lang`包中的常用类

以下是一些`java.lang`包中的常用类，它们在所有Java程序中都默认导入：

- `Object`
- `String`
- `System`
- `Math`
- `Integer`
- `Double`
- `Float`
- `Long`
- `Short`
- `Byte`
- `Character`
- `Boolean`
- `Thread`
- `Runnable`
- `Exception`
- `Error`

### 总结

`Math`类属于`java.lang`包，这个包是Java语言核心的一部分，默认自动导入到每一个Java程序中，因此你可以直接使用`Math`类中的方法而无需显式地导入该类。这使得代码更加简洁，也便于使用常见的基本功能。