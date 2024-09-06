你可以通过扩展 jQuery 来实现检测重复绑定事件的功能。具体思路是对 `on`、`click` 等事件方法进行封装，记录每个元素上已绑定的事件，判断相同事件是否已经存在，如果存在则不再重复绑定。下面是一个示例代码，展示如何扩展 jQuery 来实现这个功能。

### 主要步骤：
1. 重写 `$.fn.on`、`$.fn.click` 等方法。
2. 利用数据存储（如 `$.data()` 或 `element.data()`）在元素上保存已绑定事件的记录。
3. 每次绑定事件时检查是否已经存在相同事件。

以下是一个示例代码，重写了 `on` 和 `click` 事件方法：

```javascript
(function($) {
    // 存储已经绑定的事件，防止重复绑定
    $.fn.bindOnce = function(event, selector, data, handler) {
        var eventsStore = this.data('__bound_events') || {}; // 存储已绑定事件的对象
        var uniqueEventKey = event + '_' + handler.toString() + '_' + (selector || ''); // 唯一事件键
        
        // 如果事件已经存在，不再绑定
        if (eventsStore[uniqueEventKey]) {
            console.log('Event already bound: ', uniqueEventKey);
            return this; // 直接返回，不绑定
        }

        // 如果事件不存在，绑定并记录
        this.on(event, selector, data, handler);
        eventsStore[uniqueEventKey] = true;
        this.data('__bound_events', eventsStore); // 更新事件记录
        
        return this;
    };

    // 重写 jQuery 的 on 方法
    var originalOn = $.fn.on;
    $.fn.on = function(types, selector, data, fn) {
        // 检查传参，判断 selector 和 data 是否可选
        if (typeof selector === 'function') {
            fn = selector;
            selector = undefined;
            data = undefined;
        } else if (typeof data === 'function') {
            fn = data;
            data = undefined;
        }

        return this.bindOnce(types, selector, data, fn); // 使用 bindOnce 方法绑定事件
    };

    // 重写 click 方法作为示例（其他事件如 hover, dblclick 可以类似处理）
    var originalClick = $.fn.click;
    $.fn.click = function(handler) {
        return this.bindOnce('click', null, null, handler); // 使用 bindOnce 方法绑定 click 事件
    };

})(jQuery);
```

### 解释：
- `$.fn.bindOnce`：这是一个通用的事件绑定方法。它将事件的相关信息（事件名、事件处理器、选择器等）作为键值对存储在元素的 `__bound_events` 数据对象中。每次尝试绑定事件时，会先检查是否已经存在相同的键，如果存在则跳过绑定。
- `$.fn.on`：重写了 jQuery 的 `on` 方法，使用 `bindOnce` 来检查和绑定事件。
- `$.fn.click`：重写了 jQuery 的 `click` 方法，保证点击事件不会重复绑定。

### 使用示例：
```javascript
// 初次绑定
$('#myElement').on('click', function() {
    console.log('Clicked!');
});

// 再次绑定相同的事件不会重复绑定
$('#myElement').on('click', function() {
    console.log('Clicked!');
});

// 绑定不同的事件处理器还是有效的
$('#myElement').on('click', function() {
    console.log('Another handler!');
});
```

这样，你可以确保相同的事件不会在同一个元素上重复绑定，而不同的事件处理器仍然可以正常绑定。