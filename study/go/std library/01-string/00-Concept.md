`string`包定义了一组用于操作和处理字符串的函数，主要功能包括但不限于字符串的比较、搜索、替换、分割、连接、修剪和转换。具体功能如下：

1. **比较操作**：
   - `Compare(a, b string) int`：比较两个字符串的字典顺序。
   - `EqualFold(s, t string) bool`：忽略大小写比较两个字符串是否相等。

2. **搜索操作**：
   - `Contains(s, substr string) bool`：判断字符串s是否包含子串substr。
   - `HasPrefix(s, prefix string) bool`：判断字符串s是否以prefix开头。
   - `HasSuffix(s, suffix string) bool`：判断字符串s是否以suffix结尾。
   - `Index(s, substr string) int`：返回子串substr在字符串s中首次出现的位置。
   - `LastIndex(s, substr string) int`：返回子串substr在字符串s中最后一次出现的位置。

3. **替换操作**：
   - `Replace(s, old, new string, n int) string`：返回一个新的字符串，在s中用new替换old，共替换n次。
   - `ReplaceAll(s, old, new string) string`：返回一个新的字符串，在s中用new替换所有的old。

4. **分割和连接操作**：
   - `Split(s, sep string) []string`：根据sep将字符串s分割成子串并返回一个字符串切片。
   - `SplitN(s, sep string, n int) []string`：根据sep将字符串s分割成最多n个子串并返回一个字符串切片。
   - `Join(a []string, sep string) string`：将字符串切片a中的所有字符串连接成一个字符串，字符串之间用sep分隔。

5. **修剪操作**：
   - `Trim(s, cutset string) string`：返回一个删除了s两端所有cutset包含的字符的新字符串。
   - `TrimSpace(s string) string`：返回一个删除了s两端所有空白字符的新字符串。
   - `TrimPrefix(s, prefix string) string`：返回去除s的前缀prefix的字符串。
   - `TrimSuffix(s, suffix string) string`：返回去除s的后缀suffix的字符串。

6. **转换操作**：
   - `ToLower(s string) string`：将字符串s中的所有字符转换为小写字母。
   - `ToUpper(s string) string`：将字符串s中的所有字符转换为大写字母。
   - `Title(s string) string`：返回一个将字符串s中的每个单词的首字母转换为大写的字符串。
   - `ToTitle(s string) string`：返回一个将字符串s中的所有字符转换为其标题形式的字符串。

7. **其他操作**：
   - `Repeat(s string, count int) string`：返回一个新字符串，它由count个重复的字符串s组成。
   - `Fields(s string) []string`：将字符串s按空白字符分割成若干子串，并返回一个字符串切片。

