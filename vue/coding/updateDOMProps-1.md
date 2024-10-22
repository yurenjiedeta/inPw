这段代码是为了**处理在IE浏览器中对SVG元素的`innerHTML`属性更新的兼容性问题**。在某些版本的IE中，直接给SVG元素设置`innerHTML`会失败，因此Vue通过一种替代方案来确保SVG的内容能够正确更新。

---

### **详细解析：**

#### **1. 判断逻辑：**
```javascript
else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML))
```
- **`key === 'innerHTML'`**：表示当前需要更新的属性是`innerHTML`。
- **`isSVG(elm.tagName)`**：判断当前元素是否是SVG标签。如果是`<svg>`，需要特殊处理，因为IE对SVG的`innerHTML`支持不佳。
- **`isUndef(elm.innerHTML)`**：如果当前SVG元素的`innerHTML`未定义，说明无法直接使用标准方式更新`innerHTML`。

---

#### **2. IE的兼容处理逻辑：**
```javascript
svgContainer = svgContainer || document.createElement('div');
svgContainer.innerHTML = "<svg>" + cur + "</svg>";
```
- **`svgContainer`**：声明一个`div`容器，用来临时包裹SVG内容。  
  - 这是因为在IE中，HTML标签（如`div`）可以使用`innerHTML`来解析字符串并生成子元素。
- 将`innerHTML`内容拼接成`<svg> + cur + </svg>`的字符串，然后通过`div`的`innerHTML`解析这段内容。

---

#### **3. 替换SVG元素的内容：**
```javascript
var svg = svgContainer.firstChild;
while (elm.firstChild) {
  elm.removeChild(elm.firstChild);
}
while (svg.firstChild) {
  elm.appendChild(svg.firstChild);
}
```
- **`svgContainer.firstChild`**：从`div`容器中获取解析后的`<svg>`节点。
- **`while (elm.firstChild)`**：移除当前SVG元素中的所有子节点，确保不会与新内容冲突。
- **`while (svg.firstChild)`**：将解析后的SVG子元素依次插入到真实的SVG节点中。

---

### **目的与意义：**
1. **解决IE浏览器中的兼容性问题**：
   - IE浏览器无法直接给`<svg>`元素赋值`innerHTML`，所以需要先用`<div>`解析，再逐一转移子节点。
   
2. **确保SVG内容能够正确更新**：
   - 当虚拟DOM中的`innerHTML`变化时，Vue将新内容同步到真实DOM中的SVG元素上。

3. **避免浏览器报错或更新失败**：
   - 某些浏览器可能会因不支持`innerHTML`而导致错误，Vue通过这个方法规避了这种问题。

---

### **总结：**
这段代码的主要作用是**为SVG元素更新`innerHTML`时提供兼容性支持**，特别是为了解决IE浏览器的限制。通过一个临时的`div`容器解析SVG内容，再将其转移到真实的SVG元素中，确保DOM状态和虚拟DOM保持一致。