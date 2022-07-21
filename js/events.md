- 浏览器中监听localStorage变化

```js
//1、在同源的两个页面中，可以监听 storage 事件
window.addEventListener("storage", function (e) {
        alert(e.newValue);
});

//2、在同一个页面中，对 localStorage 的 setItem 方法进行重写
var orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key,newValue){
      var setItemEvent = new Event("setItemEvent");
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this,arguments);
}
window.addEventListener("setItemEvent", function (e) {
    alert(e.newValue);
});
localStorage.setItem("name","wang");
```

