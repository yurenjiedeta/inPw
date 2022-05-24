- 开启clash后，git被拒绝

```bash
#重新设置代理，将代理端口号，设置上去。 clash默认代理端口号 7890 设置如下
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

#取消全局代理：
git config --global --unset http.proxy
git config --global --unset https.proxy
```

