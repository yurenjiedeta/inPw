- 安装或卸载指定版本

```bash
npm install 库名@0.6.6 --save
yarn add 库名@0.6.6
```

- 关于npx

```tex
npx会在当前以来内寻找包来运行项目.
```

- yarn --dev

```basic
yarn add xxx --dev
```

- yarn --remove

```bash
yarn remove xxx xxxx xxxx
```

- npm安装特定的版本或者tag

```bash
npm install --save-dev webpack/webpack#<tagname/branchname>
# 安装特定的 tag/分支
```

- yarn镜像

```bash
#默认 https://registry.yarnpkg.com

#设置淘宝镜像
yarn config set registry https://registry.npmmirror.com/

#设置国内镜像 yarn config set registry https://registry.npm.taobao.org --global

#删除国内镜像 yarn config delete registry --global

#还原地址
yarn config set registry https://registry.yarnpkg.com

# 查看所有镜像
yrm ls

  npm ---------- https://registry.npmjs.org/
* yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.nlark.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

# 使用淘宝镜像
yrm use taobao
```

- npm镜像

```bash
npm config set registry https://registry.npm.taobao.org

npm config set disturl https://npm.taobao.org/dist

npm config delete registry

npm config delete disturl


# 查看所有镜像
nrm ls
  npm ---------- https://registry.npmjs.org/
* yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.nlark.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

# 使用淘宝镜像
nrm use taobao

#设置淘宝镜像【不建议，影响其他指令】
npm config set registry https://registry.npmmirror.com/

#还原地址
npm config set registry https://registry.npmjs.org/

```

- yarn和npm清除本地缓存

```bash
yarn cache clean
npm cache clean --force
#yarn缓存位置：C:\Users\admin\AppData\Local\Yarn
```

