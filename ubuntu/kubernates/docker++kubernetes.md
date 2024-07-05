在Ubuntu 20.04.3 LTS (Focal)上使用阿里云源安装Kubernetes和Docker，并使用阿里云镜像加速初始化Kubernetes，最后部署PHP和Nginx到Kubernetes的步骤如下：

### 步骤 1: 设置阿里云源

#### Docker 阿里云源

1. 安装必要的包：
    ```bash
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    ```

2. 添加Docker的GPG密钥：
    ```bash
    curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
    ```

3. 设置Docker阿里云源：
    ```bash
    sudo add-apt-repository "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
    ```

4. 安装Docker：
    ```bash
    sudo apt-get update
    sudo apt-get install -y docker-ce
    ```

5. 启动并启用Docker：
    ```bash
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

#### Kubernetes 阿里云源

1. 添加Kubernetes的GPG密钥：
    ```bash
    curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add -
    ```

2. 添加Kubernetes阿里云源：
    ```bash
    sudo tee /etc/apt/sources.list.d/kubernetes.list <<EOF
    deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
    EOF
    ```

3. 更新包列表并安装kubelet、kubeadm和kubectl：
    ```bash
    sudo apt-get update
    sudo apt-get install -y kubelet kubeadm kubectl
    sudo apt-mark hold kubelet kubeadm kubectl
    ```

### 步骤 2: 使用阿里云镜像加速初始化Kubernetes

1. 配置kubeadm使用阿里云镜像：
    ```bash
    sudo kubeadm init --image-repository registry.aliyuncs.com/google_containers
    ```

2. 配置kubectl：
    ```bash
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```

3. 安装网络插件（以Calico为例）：
    ```bash
    kubectl apply -f https://docs.projectcalico.org/v3.14/manifests/calico.yaml
    ```

### 步骤 3: 部署PHP和Nginx到Kubernetes

1. 创建一个PHP应用的Dockerfile：
    ```dockerfile
    # 创建一个Dockerfile
    mkdir php-app
    cd php-app
    nano Dockerfile
    ```

    ```dockerfile
    FROM php:7.4-fpm
    COPY . /var/www/html/
    ```

2. 构建并推送Docker镜像：
    ```bash
    docker build -t your-docker-repo/php-app:latest .
    docker push your-docker-repo/php-app:latest
    ```

3. 创建Nginx配置文件：
    ```bash
    nano default.conf
    ```

    ```nginx
    server {
        listen 80;
        server_name localhost;
        root /var/www/html;

        index index.php index.html index.htm;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass php-fpm:9000;
        }
    }
    ```

4. 创建Nginx Dockerfile：
    ```dockerfile
    FROM nginx:latest
    COPY default.conf /etc/nginx/conf.d/default.conf
    ```

5. 构建并推送Nginx Docker镜像：
    ```bash
    docker build -t your-docker-repo/nginx:latest .
    docker push your-docker-repo/nginx:latest
    ```

6. 创建Kubernetes部署和服务文件（php-nginx.yaml）：
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: php-nginx
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: php-nginx
      template:
        metadata:
          labels:
            app: php-nginx
        spec:
          containers:
          - name: php-fpm
            image: your-docker-repo/php-app:latest
            ports:
            - containerPort: 9000
          - name: nginx
            image: your-docker-repo/nginx:latest
            ports:
            - containerPort: 80
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: php-nginx
    spec:
      type: NodePort
      ports:
      - port: 80
        nodePort: 30080
      selector:
        app: php-nginx
    ```

7. 部署到Kubernetes：
    ```bash
    kubectl apply -f php-nginx.yaml
    ```

8. 访问PHP应用：
    在浏览器中访问`http://<Node_IP>:30080`。

这样就完成了在Ubuntu上使用阿里云源安装Kubernetes和Docker，并通过阿里云镜像加速初始化Kubernetes，并部署PHP和Nginx到Kubernetes的全过程。