1. 仅有静态 class
   ```html
   <div class="static-class"></div>
   ```
   对应的 `mergeClassData` 参数:
   ```javascript
   mergeClassData(
     { staticClass: 'static-class' },
     { staticClass: '' }
   )
   // 返回 { staticClass: 'static-class' }
   ```

2. 动态 class
   ```html
   <div :class="dynamicClass"></div>
   ```
   对应的 `mergeClassData` 参数:
   ```javascript
   mergeClassData(
     { class: dynamicClass },
     { class: '' }
   )
   // 返回 { class: dynamicClass }
   ```

3. 静态和动态 class 混合
   ```html
   <div class="static-class" :class="dynamicClass"></div>
   ```
   对应的 `mergeClassData` 参数:
   ```javascript
   mergeClassData(
     { staticClass: 'static-class', class: dynamicClass },
     { staticClass: '', class: '' }
   )
   // 返回 { staticClass: 'static-class', class: dynamicClass }
   ```

4. 父组件传递 class 到子组件
   ```html
   <!-- 父组件 -->
   <child-component :class="parentClass"></child-component>

   <!-- 子组件 -->
   <div></div>
   ```
   对应的 `mergeClassData` 参数:
   ```javascript
   // 在子组件中
   mergeClassData(
     { class: '' },
     { class: parentClass }
   )
   // 返回 { class: parentClass }
   ```

5. 数组形式的动态 class
   ```html
   <div :class="[staticClass, dynamicClass]"></div>
   ```
   对应的 `mergeClassData` 参数:
   ```javascript
   mergeClassData(
     { class: [staticClass, dynamicClass] },
     { class: '' }
   )
   // 返回 { class: [staticClass, dynamicClass] }
   ```

这些例子涵盖了 Vue 模板中常见的 class 绑定情况,希望对你有所帮助。如果还有任何疑问,欢迎继续询问。