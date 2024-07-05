在Ubuntu 20.04.3 LTS上使用阿里云源安装Kubernetes，并部署Nginx和PHP，可以按照以下步骤进行操作：

### 1. 设置阿里云镜像源

首先，备份当前的APT源列表文件：

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

然后，编辑`/etc/apt/sources.list`文件：

```bash
sudo nano /etc/apt/sources.list
```

将文件内容替换为阿里云的源：

```plaintext
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

更新APT包列表：

```bash
sudo apt update
```

### 2. 安装Docker

安装Docker是部署Kubernetes集群的前提条件。

```bash
sudo apt install -y docker.io
```

启动并设置Docker为开机自启动：

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 3. 添加Kubernetes的APT源

首先，添加Kubernetes的签名密钥：

```bash
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -
```

然后，添加Kubernetes的APT源：

```bash
sudo bash -c 'cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF'
```

更新APT包列表：

```bash
sudo apt update
```

### 4. 安装Kubernetes组件

安装`kubelet`、`kubeadm`和`kubectl`：

```bash
sudo apt install -y kubelet kubeadm kubectl
```

锁定版本

```bash
sudo apt-mark hold kubelet kubeadm kubectl
```

### 5. 初始化Kubernetes集群

使用`kubeadm`初始化Kubernetes集群：

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

如果报错：

```bash
$ rm /etc/containerd/config.toml
$ systemctl restart containerd
```

如果成功，终端将输出一些命令来设置`kubectl`，例如：

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 6. 部署Flannel网络插件

使用以下命令部署Flannel网络插件：

```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

### 7. 部署Nginx和PHP

首先，创建一个包含Nginx和PHP的Deployment和Service的YAML文件，例如`nginx-php.yaml`：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-php-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx-php
  template:
    metadata:
      labels:
        app: nginx-php
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
      - name: php-fpm
        image: php:fpm
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-php-service
spec:
  type: NodePort
  ports:
  - port: 80
    nodePort: 30080
  selector:
    app: nginx-php
```

应用该YAML文件：

```bash
kubectl apply -f nginx-php.yaml
```

完成后，可以通过节点的IP地址和端口30080访问Nginx服务。

### 8. 验证部署

使用以下命令查看Pod和Service的状态：

```bash
kubectl get pods
kubectl get svc
```

确保Pod在运行，Service已暴露。

这些步骤将帮助你在Ubuntu 20.04.3 LTS上使用阿里云源安装Kubernetes，并部署一个包含Nginx和PHP的示例应用。如果有任何问题或需要进一步的帮助，请随时告知！