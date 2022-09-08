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

- 事件循环调用机制

```js
//只有用户触发点击事件才会被推入队列中（如果点击时间小于定时器指定的时间，则先于定时器推入，否则反之）
document.querySelector("#box").onclick = function(){
  console.log("click");
};
//第一个推入队列中
setTimeout(function(){
  console.log("1");
},0);
//第三个推入队列中
setTimeout(function(){
 console.log("2");
},1000);
//第二个推入队列中
setTimeout(function(){
  console.log("3");
},0);
```

- 事件另一个案例

```js
//异步代码
setTimeout(function(){
    for(var i = 0; i < 100000000; i++){}
    console.log('timer a');
}, 0)
//同步代码
for(var j = 0; j < 5; j++){
    console.log(j);
}
//异步代码
setTimeout(function(){
    console.log('timer b');
}, 0)
//函数
function waitFiveSeconds(){
    var now = (new Date()).getTime();
    while(((new Date()).getTime() - now) < 5000){}
    console.log('finished waiting');
}
//异步代码
document.addEventListener('click', function(){
    console.log('click');
})
//同步代码
console.log('click begin');
//同步代码，调用函数，执行函数体
waitFiveSeconds();

// 在线程执行过程中，JS引擎线程空闲后，会先查看是否有事件可执行，接着再处理其他异步任务。
```

