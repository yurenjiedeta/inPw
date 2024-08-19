使用阿里云镜像在 Ubuntu 上安装 Kubernetes 可以加速软件包的下载并提高安装效率。下面是使用阿里云镜像安装 Kubernetes 的步骤：

### 1. 更新系统并安装必要的软件包
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```

### 2. 添加阿里云的 Kubernetes 软件源
创建 `/etc/apt/sources.list.d/kubernetes.list` 文件，并添加以下内容：
```bash
sudo tee /etc/apt/sources.list.d/kubernetes.list <<EOF
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF
```

### 3. 添加阿里云的 GPG 密钥
```bash
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -
```

### 4. 更新软件包列表
```bash
sudo apt-get update
```

### 5. 安装 Kubernetes 组件
安装 `kubeadm`、`kubelet` 和 `kubectl`：
```bash
sudo apt-get install -y kubelet kubeadm kubectl
```

### 6. 锁定 Kubernetes 组件的版本
为了防止它们被意外升级，可以锁定它们的版本：
```bash
sudo apt-mark hold kubelet kubeadm kubectl
```

### 7. 初始化 Kubernetes 集群
在主节点上初始化 Kubernetes 集群：
```bash
sudo kubeadm init --image-repository registry.aliyuncs.com/google_containers
```

### 8. 配置 kubectl
设置普通用户使用 `kubectl`：
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 9. 部署网络插件
使用 `kubectl` 部署网络插件，例如 Flannel：
```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

### 10. 加入工作节点
在每个工作节点上运行以下命令，将其加入到集群中：
```bash
sudo kubeadm join <master-ip>:<master-port> --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```
`<master-ip>` 和 `<master-port>` 是主节点的 IP 地址和端口号，`<token>` 和 `<hash>` 是在初始化主节点时提供的令牌和哈希值。

### 完成
至此，您已经成功使用阿里云镜像在 Ubuntu 上安装了 Kubernetes。如果有任何问题或需要进一步帮助，请随时告诉我。