要在Ubuntu上添加阿里云的Kubernetes并安装，可以按照以下步骤进行：

### 添加阿里云的Kubernetes APT源

1. **导入阿里云的GPG密钥**：

   ```bash
   sudo curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -
   ```

2. **添加Kubernetes APT源**：

   ```bash
   echo "deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
   ```

### 安装Kubernetes组件

1. **更新APT包索引**：

   ```bash
   sudo apt-get update
   ```

2. **安装Kubernetes组件**：

   - 安装 `kubelet`、`kubeadm`、`kubectl`：

     ```bash
     sudo apt-get install -y kubelet kubeadm kubectl
     sudo apt-mark hold kubelet kubeadm kubectl #锁定版本
     ```

3. **设置kubelet开机启动**：

   ```bash
   sudo systemctl enable kubelet
   ```

### 初始化Kubernetes集群

1. **使用kubeadm初始化Master节点**（以后续的节点作为Slave）：

   ```bash
   sudo kubeadm init --pod-network-cidr=10.244.0.0/16
   ```

   - `--pod-network-cidr` 参数用于指定Pod网络的CIDR范围，根据需要进行调整。

2. **按照初始化后的提示设置kubectl配置**：

   ```bash
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config
   ```

### 安装网络插件（如需）

1. **安装Calico网络插件**（示例）：

   ```bash
   kubectl apply -f https://docs.projectcalico.org/v3.3/getting-started/kubernetes/installation/hosted/rbac-kdd.yaml
   kubectl apply -f https://docs.projectcalico.org/v3.3/getting-started/kubernetes/installation/hosted/kubernetes-datastore/calico-networking/1.7/calico.yaml
   ```

2. **等待一段时间让所有组件正常启动**。

### 加入更多节点（如需）

1. **在其他节点上使用`kubeadm join`命令**，加入集群。初始化Master节点后会显示具体的加入命令。

以上步骤可以帮助你在Ubuntu上安装并配置阿里云的Kubernetes集群。