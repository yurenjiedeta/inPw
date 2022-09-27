- 判断是否是平板

```js
/macintosh|mac os x/i.test(userAgent) && window.screen.height > window.screen.width && (!userAgent.match(/(iPhone\sOS)\s([\d_]+)/)) || userAgent.match(/(iPad).*OS\s([\d_]+)/

// 解决方法： iPad的屏幕高始终＞屏幕宽（不管你将屏幕竖着还是横着）,而Mac的宽＞高。
```

