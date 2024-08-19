Java中的`String`类提供了许多常用方法来操作和处理字符串。以下是一些常用方法及其示例：

### 1. `length()`
获取字符串的长度。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        int length = str.length();
        System.out.println("Length: " + length); // 输出: 13
    }
}
```

### 2. `charAt(int index)`
获取指定索引处的字符。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        char ch = str.charAt(0);
        System.out.println("Character at index 0: " + ch); // 输出: H
    }
}
```

### 3. `substring(int beginIndex)`
获取从指定索引开始的子字符串。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        String substr = str.substring(7);
        System.out.println("Substring from index 7: " + substr); // 输出: World!
    }
}
```

### 4. `substring(int beginIndex, int endIndex)`
获取从指定起始索引到结束索引之间的子字符串。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        String substr = str.substring(7, 12);
        System.out.println("Substring from index 7 to 12: " + substr); // 输出: World
    }
}
```

### 5. `indexOf(String str)`
查找子字符串在当前字符串中的首次出现位置。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        int index = str.indexOf("World");
        System.out.println("Index of 'World': " + index); // 输出: 7
    }
}
```

### 6. `lastIndexOf(String str)`
查找子字符串在当前字符串中的最后一次出现位置。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World! Hello again!";
        int lastIndex = str.lastIndexOf("Hello");
        System.out.println("Last index of 'Hello': " + lastIndex); // 输出: 14
    }
}
```

### 7. `toLowerCase()`
将字符串转换为小写。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        String lowerCaseStr = str.toLowerCase();
        System.out.println("Lower case: " + lowerCaseStr); // 输出: hello, world!
    }
}
```

### 8. `toUpperCase()`
将字符串转换为大写。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        String upperCaseStr = str.toUpperCase();
        System.out.println("Upper case: " + upperCaseStr); // 输出: HELLO, WORLD!
    }
}
```

### 9. `trim()`
移除字符串两端的空白字符。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "   Hello, World!   ";
        String trimmedStr = str.trim();
        System.out.println("Trimmed: '" + trimmedStr + "'"); // 输出: 'Hello, World!'
    }
}
```

### 10. `replace(CharSequence target, CharSequence replacement)`
替换字符串中的子字符串。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        String replacedStr = str.replace("World", "Java");
        System.out.println("Replaced: " + replacedStr); // 输出: Hello, Java!
    }
}
```

### 11. `split(String regex)`
根据正则表达式分割字符串。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "apple,banana,orange";
        String[] fruits = str.split(",");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        // 输出:
        // apple
        // banana
        // orange
    }
}
```

### 12. `equals(Object anObject)`
比较两个字符串是否相等。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "Hello";
        String str3 = "World";
        System.out.println("str1 equals str2: " + str1.equals(str2)); // 输出: true
        System.out.println("str1 equals str3: " + str1.equals(str3)); // 输出: false
    }
}
```

### 13. `equalsIgnoreCase(String anotherString)`
比较两个字符串（忽略大小写）是否相等。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "hello";
        System.out.println("str1 equalsIgnoreCase str2: " + str1.equalsIgnoreCase(str2)); // 输出: true
    }
}
```

### 14. `contains(CharSequence s)`
检查字符串是否包含指定的字符序列。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        boolean contains = str.contains("World");
        System.out.println("Contains 'World': " + contains); // 输出: true
    }
}
```

### 15. `startsWith(String prefix)`
检查字符串是否以指定的前缀开始。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        boolean startsWith = str.startsWith("Hello");
        System.out.println("Starts with 'Hello': " + startsWith); // 输出: true
    }
}
```

### 16. `endsWith(String suffix)`
检查字符串是否以指定的后缀结尾。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "Hello, World!";
        boolean endsWith = str.endsWith("World!");
        System.out.println("Ends with 'World!': " + endsWith); // 输出: true
    }
}
```

### 17. `isEmpty()`
检查字符串是否为空（长度为0）。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str = "";
        boolean isEmpty = str.isEmpty();
        System.out.println("Is empty: " + isEmpty); // 输出: true
    }
}
```

### 18. `concat(String str)`
连接两个字符串。

```java
public class StringMethodsExample {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = " World";
        String concatenated = str1.concat(str2);
        System.out.println("Concatenated: " + concatenated); // 输出: Hello World
    }
}
```

这些方法展示了`String`类的一些常用操作。通过这些方法，你可以高效地处理和操作字符串数据。