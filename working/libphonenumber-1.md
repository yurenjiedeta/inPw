使用 **libphonenumber-js** 库校验网页中的国家对应的电话号码并输出格式化后的号码可以通过以下步骤完成：

### 1. 安装库

在项目中使用 **libphonenumber-js** 之前，先安装它：

```bash
npm install libphonenumber-js
```

如果是在浏览器中使用，也可以通过 CDN 直接引入：

```html
<script src="https://unpkg.com/libphonenumber-js/bundle/libphonenumber-max.js"></script>
```

### 2. 基本思路

你可以通过以下步骤实现：

1. 根据用户输入的电话号码和所选的国家代码来解析电话号码。
2. 使用 **libphonenumber-js** 解析并校验该电话号码。
3. 如果号码有效，则输出格式化后的号码（国际格式或国家格式）。

### 3. 示例代码

以下是如何在网页中实现这种逻辑的完整示例：

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phone Number Validation</title>
  <script src="https://unpkg.com/libphonenumber-js/bundle/libphonenumber-max.js"></script>
</head>
<body>
  <h2>Phone Number Validation</h2>
  <form id="phone-form">
    <label for="country">Select Country:</label>
    <select id="country">
      <option value="US">United States</option>
      <option value="GB">United Kingdom</option>
      <option value="CN">China</option>
      <!-- 添加其他国家 -->
    </select>

    <br><br>

    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" placeholder="Enter phone number">

    <br><br>

    <button type="submit">Validate</button>
  </form>

  <h3 id="result"></h3>

  <script src="phone-validation.js"></script>
</body>
</html>
```

#### JavaScript (phone-validation.js)

```javascript
// 绑定表单提交事件
document.getElementById('phone-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // 获取用户输入的国家代码和电话号码
    const country = document.getElementById('country').value;
    const phone = document.getElementById('phone').value;

    // 校验和格式化号码
    validatePhoneNumber(country, phone);
});

function validatePhoneNumber(country, phoneNumber) {
    // 使用 libphonenumber-js 来解析电话号码
    const phoneNumberObj = window.libphonenumber.parsePhoneNumberFromString(phoneNumber, country);

    // 检查号码是否有效
    if (phoneNumberObj && phoneNumberObj.isValid()) {
        // 获取格式化后的号码
        const formattedNumber = phoneNumberObj.formatInternational(); // 国际格式
        const nationalFormat = phoneNumberObj.formatNational();       // 国家格式

        // 显示结果
        document.getElementById('result').innerHTML = `
          <p>Valid Number!</p>
          <p><strong>International Format:</strong> ${formattedNumber}</p>
          <p><strong>National Format:</strong> ${nationalFormat}</p>
        `;
    } else {
        // 显示错误信息
        document.getElementById('result').innerHTML = '<p style="color: red;">Invalid phone number!</p>';
    }
}
```

### 4. 解释

- **HTML 部分**：
  - 用户可以选择国家并输入电话号码。
  - 提交表单后会调用 JavaScript 来校验和格式化电话号码。

- **JavaScript 部分**：
  - 监听表单的提交事件，获取用户输入的国家和电话号码。
  - 使用 `libphonenumber.parsePhoneNumberFromString()` 解析电话号码，并传入所选国家的代码（如 "US" 或 "GB"）。
  - 调用 `isValid()` 方法来检查号码的合法性。
  - 如果号码有效，使用 `formatInternational()` 和 `formatNational()` 获取格式化后的电话号码（分别为国际格式和国家格式）。
  - 结果会显示在页面上。

### 5. 示例运行效果

1. 用户选择国家（如 "US"）并输入电话号码（如 `2025550123`）。
2. 点击 "Validate" 后，页面会显示：
   - **Valid Number!**
   - **International Format:** +1 202-555-0123
   - **National Format:** (202) 555-0123

如果电话号码无效，页面会显示 **Invalid phone number!**。

### 6. 扩展使用

- 你可以添加更多国家的选项，方便用户选择。
- 可以通过 `phoneNumberObj.getType()` 来判断号码类型（如手机、固定电话等）。
- 根据需求，你可以输出其他格式的电话号码，比如 E.164 格式（`+12025550123`）。

这样，通过 **libphonenumber-js**，你可以轻松实现国际化的电话号码验证和格式化功能。