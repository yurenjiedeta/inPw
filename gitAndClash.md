- 开启clash后，git被拒绝

```bash
#重新设置代理，将代理端口号，设置上去。 clash默认代理端口号 7890 设置如下
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

#取消全局代理：
git config --global --unset http.proxy
git config --global --unset https.proxy

#局部设置
git config --global http.https://domain.com.proxy http://proxyUsername:proxyPassword@proxy.server.com:port

#局部取消设置
git config --global --unset http.proxy
git config --global --unset http.https://domain.com.proxy
```

- github ssh无法使用的时候：

```bash
#去github后台，Settings/Developer settings / Personal access tokens
#修改 .git 文件夹目录下的配置为：https://<githubtoken>@github.com/<username>/<repositoryname>.git
#最后就可以使用了

git config --local -e      //编辑本地git配置
```

