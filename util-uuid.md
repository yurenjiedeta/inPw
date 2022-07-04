- 通用工具类方法

- uuid

```js
//Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where each x is replaced with a random hexadecimal digit from 0 to f, and y is replaced with a random hexadecimal digit from 8 to b.
// https://gist.github.com/1308368
function uuid(a, b) {
        for (b = a = ''; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-');
        return b
      }
```

