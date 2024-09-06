Google 的 **libphonenumber** 库是一个强大的工具，用于解析、格式化、验证和处理国际电话号码。它有多个语言版本，JavaScript 版本可以用于网页或 Node.js 项目。下面介绍如何在 JavaScript/Node.js 中使用 **libphonenumber-js**。

### 1. 安装库

如果你是用 **libphonenumber-js** 版本，可以通过 npm 安装：

```bash
npm install libphonenumber-js
```

### 2. 基本用法示例

下面是一些常见的用法示例，包括解析、验证和格式化电话号码。

#### 2.1 解析和格式化电话号码

```javascript
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// 解析国际电话号码
const phoneNumber = parsePhoneNumberFromString('+12025550123');

// 检查号码是否有效
if (phoneNumber && phoneNumber.isValid()) {
    console.log(phoneNumber.formatInternational()); // 输出国际格式
    console.log(phoneNumber.formatNational());      // 输出国家格式
    console.log(phoneNumber.format('E.164'));       // 输出 E.164 格式
}
```

- `parsePhoneNumberFromString` 解析电话号码，自动识别国家代码。
- `isValid()` 用于验证电话号码是否合法。
- `formatInternational()` 将电话号码格式化为国际标准，如 `+1 202-555-0123`。
- `formatNational()` 将电话号码格式化为国家标准，如 `202-555-0123` (美国)。
- `format('E.164')` 使用 E.164 标准格式化，如 `+12025550123`。

#### 2.2 验证电话号码

验证电话号码的步骤通常包括先解析，然后检查其有效性：

```javascript
const phoneNumber = parsePhoneNumberFromString('+12025550123');
if (phoneNumber && phoneNumber.isValid()) {
    console.log('这是一个有效的电话号码');
} else {
    console.log('电话号码无效');
}
```

#### 2.3 带国家代码的解析和格式化

如果你知道电话号码的国家代码，可以显式指定。例如，美国的电话号码可以这样解析：

```javascript
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const phoneNumber = parsePhoneNumberFromString('2025550123', 'US');

if (phoneNumber && phoneNumber.isValid()) {
    console.log(phoneNumber.formatInternational()); // +1 202-555-0123
}
```

#### 2.4 识别电话号码的国家

你可以通过电话号码识别其所属国家：

```javascript
const phoneNumber = parsePhoneNumberFromString('+12025550123');
if (phoneNumber) {
    console.log(phoneNumber.country); // 输出 "US"
}
```

### 3. 其他高级用法

#### 3.1 提取国家代码和其他详细信息

使用 `metadata` 获取关于号码的详细信息：

```javascript
const phoneNumber = parsePhoneNumberFromString('+442083661177');
if (phoneNumber) {
    console.log(phoneNumber.country);           // "GB"
    console.log(phoneNumber.countryCallingCode); // "44"
    console.log(phoneNumber.nationalNumber);     // "2083661177"
}
```

#### 3.2 检查号码类型

你还可以验证号码的类型，如手机或固定电话：

```javascript
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const phoneNumber = parsePhoneNumberFromString('+12025550123');
if (phoneNumber) {
    console.log(phoneNumber.getType()); // "FIXED_LINE_OR_MOBILE"
}
```

### 4. 使用场景

- **用户输入格式化**：你可以用这个库来处理用户输入的电话号码，将其转换为标准格式。
- **电话号码验证**：确保用户输入的是有效的国际电话号码。
- **国际化支持**：它支持几乎所有的国家和地区的电话号码格式和验证规则。

### 5. 在浏览器中使用

你可以直接将 `libphonenumber-js` 引入到 HTML 页面中使用。

```html
<script src="https://unpkg.com/libphonenumber-js/bundle/libphonenumber-max.js"></script>
<script>
  const phoneNumber = window.libphonenumber.parsePhoneNumberFromString('+12025550123');
  console.log(phoneNumber.isValid());  // true
  console.log(phoneNumber.formatNational());  // (202) 555-0123
</script>
```

### 6. 小结

**libphonenumber-js** 提供了对国际电话号码处理的完整支持，包括验证、格式化和解析等功能。你可以在网页或 Node.js 项目中轻松使用它，帮助处理用户的电话号码输入，确保它们的合法性和格式统一。

希望这些示例能帮助你开始使用 **libphonenumber** 库！