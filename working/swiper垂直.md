要实现当鼠标悬停在缩略图上时自动切换主图的效果，可以通过在Swiper配置中监听缩略图的 `mouseenter` 事件，然后手动控制主图切换。以下是具体的实现步骤：

### 1. 初始化Swiper
首先，按照之前的代码结构，设置两个Swiper实例，一个用于缩略图，另一个用于主图，并将它们关联起来。

```javascript
var galleryThumbs = new Swiper('.gallery-thumbs', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});

var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  thumbs: {
    swiper: galleryThumbs,
  },
});
```

### 2. 添加鼠标悬停事件监听
使用JavaScript添加`mouseenter`事件监听器，当鼠标悬停在某个缩略图上时，触发主图的切换。

```javascript
// 获取所有缩略图的DOM元素
var thumbsSlides = document.querySelectorAll('.gallery-thumbs .swiper-slide');

thumbsSlides.forEach(function (slide, index) {
  slide.addEventListener('mouseenter', function () {
    galleryTop.slideTo(index); // 切换到对应的主图
  });
});
```

### 3. 完整的示例
```html
<div class="swiper-container gallery-thumbs">
  <div class="swiper-wrapper">
    <div class="swiper-slide"><img src="thumb1.jpg" alt="Thumbnail 1"></div>
    <div class="swiper-slide"><img src="thumb2.jpg" alt="Thumbnail 2"></div>
    <!-- 更多缩略图 -->
  </div>
</div>

<div class="swiper-container gallery-top">
  <div class="swiper-wrapper">
    <div class="swiper-slide"><img src="main1.jpg" alt="Main Image 1"></div>
    <div class="swiper-slide"><img src="main2.jpg" alt="Main Image 2"></div>
    <!-- 更多主图 -->
  </div>
</div>

<script>
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  var thumbsSlides = document.querySelectorAll('.gallery-thumbs .swiper-slide');

  thumbsSlides.forEach(function (slide, index) {
    slide.addEventListener('mouseenter', function () {
      galleryTop.slideTo(index);
    });
  });
</script>
```

通过这种方式，当鼠标悬停在某个缩略图上时，右侧的主图将自动切换到对应的图片。这个方法利用了 `mouseenter` 事件和Swiper的 `slideTo` 方法来实现联动效果。