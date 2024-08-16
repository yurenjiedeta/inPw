在Swiper轮播图中，你可以使用`slideTo`方法将轮播图定位到某一张图片。`slideTo`方法接受一个参数，即你想要定位的图片的索引（从0开始）。

### 示例
假设你有一个Swiper轮播图，并且想要在初始化时将轮播图定位到第三张图片（索引为2）：

```html
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    <div class="swiper-slide">Slide 4</div>
  </div>
</div>

<script>
  var swiper = new Swiper('.swiper-container', {
    // 其他配置选项
  });

  // 定位到第三张图片
  swiper.slideTo(2);
</script>
```

在这个例子中，Swiper在初始化后会直接跳转到第三张图片。

### 注意事项
- 如果你在初始化Swiper时需要立即定位到某一张图片，可以在配置选项中使用`initialSlide`参数：
  ```javascript
  var swiper = new Swiper('.swiper-container', {
    initialSlide: 2, // 初始定位到第三张图片
    // 其他配置选项
  });
  ```
- `slideTo`方法可以在任何时候使用，以便在用户交互或其他条件下动态地改变当前显示的图片。