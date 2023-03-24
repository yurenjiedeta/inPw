- 图片资源在客户端会对网络产生不同需求影响
- 利用响应式可以解决不同设备的问题

```html
<picture>
   <source media="(min-width: 1024px)" srcset="dest/1024/tiger.jpg">
   <source media="(min-width: 640px)" srcset="dest/640/tiger.jpg">
   <source srcset="dest/320/tiger.jpg">
   <img src="dest/640/tiger.jpg" alt="This picture will load on browsers that don't yet support the element.">
   <p>This is some accessible text.</p>
</picture>
```

- 利用图片的  `srcset` 和 `source` 属性

```html
<img src="dest/320/tiger.jpg" srcset="dest/1024/tiger.jpg 1024w,dest/640/tiger.jpg 640w, dest/320/tiger.jpg 320w" alt="A TIGER!!!">
// https://github.com/andismith/grunt-responsive-images 该插件可以响应式地处理图像元素
```

