当然！下面是一个完整的 HTML 文件，你可以将其保存为 `.html` 文件并在浏览器中打开，来验证和格式化电话号码。这个例子结合了之前的 HTML 和 JavaScript 代码。

### 完整 HTML 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phone Number Validation</title>
  <!-- 引入 libphonenumber-js 库 -->
  <script src="https://unpkg.com/libphonenumber-js/bundle/libphonenumber-max.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    label, select, input {
      margin-bottom: 10px;
    }
    h3 {
      color: #333;
    }
    p {
      font-size: 16px;
    }
  </style>
</head>
<body>

  <h2>Phone Number Validation</h2>
  <form id="phone-form">
    <label for="country">Select Country:</label>
    <select id="country">
      <option value="US">United States</option>
      <option value="GB">United Kingdom</option>
      <option value="CN">China</option>
      <option value="IN">India</option>
      <option value="DE">Germany</option>
      <!-- 你可以添加更多的国家 -->
    </select>

    <br><br>

    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" placeholder="Enter phone number" required>

    <br><br>

    <button type="submit">Validate</button>
  </form>

  <h3>Validation Result:</h3>
  <div id="result"></div>

  <script>
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

        // 清空之前的结果
        document.getElementById('result').innerHTML = '';

        // 检查号码是否有效
        if (phoneNumberObj && phoneNumberObj.isValid()) {
            // 获取格式化后的号码
            const formattedNumber = phoneNumberObj.formatInternational(); // 国际格式
            const nationalFormat = phoneNumberObj.formatNational();       // 国家格式

            // 显示结果
            document.getElementById('result').innerHTML = `
              <p style="color: green;">Valid Number!</p>
              <p><strong>International Format:</strong> ${formattedNumber}</p>
              <p><strong>National Format:</strong> ${nationalFormat}</p>
            `;
        } else {
            // 显示错误信息
            document.getElementById('result').innerHTML = '<p style="color: red;">Invalid phone number!</p>';
        }
    }
  </script>

</body>
</html>
```

### 如何使用

1. 将上述代码保存为 `phone-validation.html`。
2. 打开浏览器，然后加载该文件。
3. 选择一个国家，输入一个电话号码，然后点击 "Validate" 按钮。
4. 验证结果会显示在页面下方，包括电话号码是否有效，以及其国际格式和国家格式。

### 示例输入

- **United States (US)**: 输入 `2025550123`。
- **United Kingdom (GB)**: 输入 `02079460000`（伦敦电话号码）。
- **China (CN)**: 输入 `13800138000`（中国常见的手机号格式）。

### 输出结果示例

如果电话号码有效，输出将显示类似如下：

- **Valid Number!**
- **International Format:** +1 202-555-0123
- **National Format:** (202) 555-0123

如果无效，会显示 "Invalid phone number!"。

你可以添加更多国家，也可以根据需要扩展这个示例。