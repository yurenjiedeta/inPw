在Ubuntu上使用阿里云的国内镜像源来安装Docker，可以按照以下步骤进行操作：

### 1. 更新包索引并安装依赖

```bash
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

### 2. 添加Docker的GPG密钥

```bash
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

### 3. 添加Docker的阿里云镜像源

```bash
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

### 4. 更新包索引并安装Docker CE

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 5. 启动Docker并设置开机自启

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 6. 验证Docker安装

```bash
sudo docker version
```

以上步骤应该能够帮助你在Ubuntu上使用阿里云的镜像源安装Docker。如果在任何一步遇到问题，请告诉我，我可以进一步帮助你解决。