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

- git的其他命令---如取消设置用户名等

```javascript
//查看全部配置
git config --list

//删除全局配置
git config --global --unset user.name
git config --global --unset user.email

//添加全局配置
git config --global user.name "yurenjiedeta"
```

- git以http链接拉取代码要输入账号密码问题

```bash
#方法1、拉取的时候带上账号密码：
git cloen http://账号:密码@git.ops.test.com.cn/root/puppet.git
#方法2、修改配置文件：位于项目根目录下的 .git 文件夹下的 config 文件
url = http://账号:密码@gitlab.powershopin.top/lu-front-shoppy/shopywinwin-buyer-front.git
```

- github添加成员

```tex
头像--》Your Profile--》Settings--》Add collaborates
```

