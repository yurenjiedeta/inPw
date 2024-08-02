在Java中，可以使用 `Scanner` 类从控制台读取不同类型的数据。下面是一个整合了读取整数、浮点数和字符串的示例：

```java
import java.util.Scanner;

public class ReadFromConsole {
    public static void main(String[] args) {
        // 创建 Scanner 对象用于从控制台读取输入
        Scanner scanner = new Scanner(System.in);

        // 读取整数
        System.out.print("请输入一个整数: ");
        int intValue = scanner.nextInt();
        System.out.println("你输入的整数是: " + intValue);

        // 读取浮点数
        System.out.print("请输入一个浮点数: ");
        double doubleValue = scanner.nextDouble();
        System.out.println("你输入的浮点数是: " + doubleValue);

        // 清空输入缓冲区
        scanner.nextLine();  // 读取完浮点数后紧接的换行符

        // 读取字符串
        System.out.print("请输入一个字符串: ");
        String stringValue = scanner.nextLine();
        System.out.println("你输入的字符串是: " + stringValue);

        // 关闭 Scanner
        scanner.close();
    }
}
```

### 代码解释

1. **导入 `Scanner` 类**
   ```java
   import java.util.Scanner;
   ```

2. **创建 `Scanner` 对象**
   ```java
   Scanner scanner = new Scanner(System.in);
   ```

3. **读取整数**
   ```java
   System.out.print("请输入一个整数: ");
   int intValue = scanner.nextInt();
   System.out.println("你输入的整数是: " + intValue);
   ```

4. **读取浮点数**
   ```java
   System.out.print("请输入一个浮点数: ");
   double doubleValue = scanner.nextDouble();
   System.out.println("你输入的浮点数是: " + doubleValue);
   ```

5. **清空输入缓冲区**
   ```java
   scanner.nextLine();  // 读取完浮点数后紧接的换行符
   ```

6. **读取字符串**
   ```java
   System.out.print("请输入一个字符串: ");
   String stringValue = scanner.nextLine();
   System.out.println("你输入的字符串是: " + stringValue);
   ```

7. **关闭 `Scanner` 对象**
   ```java
   scanner.close();
   ```

通过这个例子，你可以在控制台中输入不同类型的数据，并且可以看到这些输入数据是如何被读取并输出到控制台的。