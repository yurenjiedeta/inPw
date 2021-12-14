- github和gitlab同时设置

- 生成密钥

```javascript
//进入 .ssh 文件夹
//ssh-keygen -t rsa -C "email@qq.com" -f ./id_rsa_github
```

- 生成config文件

```javascript
//在对应的用户目录 .ssh 文件夹创建 config 文件,参考下面配置
/*
#github
Host github.com
HostName github.com
User yurenjiedeta
PreferredAuthentications publickey
IdentityFile C:\Users\admin\.ssh\id_rsa.github

#gitlab
Host gitlab.powershopin.top
HostName gitlab.powershopin.top
User luyigen
PreferredAuthentications publickey
IdentityFile C:\Users\admin\.ssh\id_rsa.gitlab
*/
```

- 测试命令

```javascript
// ssh -T git@github.com
```

