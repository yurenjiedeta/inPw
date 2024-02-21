- ## npm和yarn转换淘宝源和官方源

```bash
$ npm config set registry http://registry.npm.taobao.org/
$ npm config set registry https://registry.npmmirror.com  #淘宝源
$ npm config set registry https://registry.npmjs.org/

$ yarn config set registry http://registry.npm.taobao.org/
$ yarn config set registry https://registry.yarnpkg.com  #官方源
$ yarn config set registry https://registry.npmjs.org/
```

- npm设置代理

```bash
$ npm config set proxy http://127.0.0.1:8080
$ npm config set https-proxy http://127.0.0.1:8080
```

- npm删除代理

```bash
$ npm config delete proxy
$ npm config delete https-proxy
```

- yarn设置代理

```bash
$ yarn config set proxy http://127.0.0.1:8080
$ yarn config set https-proxy http://127.0.0.1:8080
```

- yarn删除代理

```bash
$ yarn config delete proxy
$ yarn config delete https-proxy
```

- 查看原

```bash
$ npm config get registry  // 查看npm当前镜像源
$ yarn config get registry  // 查看yarn当前镜像源
```

