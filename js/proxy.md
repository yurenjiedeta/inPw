- proxy基本的用法

```javascript
let obj={
    name:'yehuozhili',
    age:{11:23}
}

let handler={
    set(target,key,value){
        if(key==='length')return true //如果是数组，忽略更新length
        console.log('更新');
        return Reflect.set(target,key,value)
    },
    get(target,key){
        if(typeof target[key]==='object'){
            return new Proxy(target[key],handler)
        }
        return Reflect.get(target,key)
    }
}
// let proxy = new Proxy(obj,handler)
// proxy.name='1111'
// console.log(proxy.name);
// proxy.sd='wqeqw'
// console.log(proxy.sd);
arr=[1,2,3,4,5]
let proxy = new Proxy(arr,handler)
proxy.push(arr)
```

- myProxy

```javascript
var handler = {
    set(target, key, value) {
        // if (key === 'length') return true //如果是数组，忽略更新length
        debugger;
        return Reflect.set(target, key, value)
    },
    get(target, key) {
        if (typeof target[key] === 'object') {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    }
}
function makeProxy(obj) {
    var ret = new Proxy(obj, handler);
    return ret;
}
```

