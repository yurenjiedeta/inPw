当使用 `axios.create` 创建自定义实例后，您可以在每个请求中传入 `cancelToken`。以下是一个示例，展示如何在创建自定义 Axios 实例后传入 `cancelToken` 以取消请求：

```javascript
const axios = require('axios');
const CancelToken = axios.CancelToken;
let cancel;

// 创建自定义 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 发起请求时传入 cancelToken
instance.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
}).then(function (response) {
  console.log(response);
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

// 取消请求
cancel('Operation canceled by the user.');
```

如果需要在多个请求中使用同一个取消令牌，可以这样做：

```javascript
const source = CancelToken.source();

// 创建自定义 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 发起请求时传入 cancelToken
instance.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

instance.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

// 取消请求
source.cancel('Operation canceled by the user.');
```

这样，通过在每个请求配置中传入 `cancelToken`，您可以控制和取消这些请求。