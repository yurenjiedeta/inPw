/etc/containerd/configtoml

```bash
disabled_plugins = ["cri"]  #改为
disabled_plugins = []

$ systemctl restart containerd
$ kubeadm init
```

```bash
swapoff -a    # will turn off the swap 
sed -ri 's/.*swap.*/#&/' /etc/fstab
kubeadm reset
systemctl daemon-reload
systemctl restart kubelet
iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X  # will reset iptables

kubeadm reset
swapoff -a => all nodes.
rm -rf /var/lib/cni/
systemctl restart kubelet
iptables -F
systemctl restart containerd
systemctl daemon-reload
```

- 最新版本

1. Check the hostname again, after reboot it might have changed.

   ```sh
   sudo vi /etc/hostname 
   sudo vi /etc/hosts
   ```

2. Perform the following clean-up actions

   Code:

   ```sh
   sudo kubeadm reset
   rm -rf /var/lib/cni/
   sudo rm -rf /var/lib/cni/
   
   systemctl daemon-reload
   
   systemctl restart kubelet
   
   sudo iptables -F && sudo iptables -t nat -F && sudo iptables -t mangle -F && sudo iptables -X
   ```

3. Execute the init action with the special tag as below

   Code:

   ```sh
   sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=10.10.10.2 --ignore-preflight-errors=all    
   ```

   (where 10.10.10.2 is the IP of master node and 192.168.0.0/16 is the private subnet assigned for Pods)