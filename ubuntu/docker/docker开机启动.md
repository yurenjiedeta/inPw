要设置 Docker 在系统启动时自动启动，可以使用 `systemctl` 命令来启用 Docker 服务。以下是具体的步骤：

1. **启用 Docker 开机启动**：
   ```bash
   sudo systemctl enable docker
   ```

2. **验证 Docker 服务状态**（可选）：
   ```bash
   sudo systemctl is-enabled docker
   ```

   如果成功启用，你应该看到输出为 `enabled`。

3. **立即启动 Docker 服务**（如果尚未运行）：
   ```bash
   sudo systemctl start docker
   ```

4. **验证 Docker 服务是否正在运行**（可选）：
   ```bash
   sudo systemctl status docker
   ```

通过这些步骤，Docker 服务将在每次系统启动时自动启动。如果你遇到任何问题或有更多问题，请告诉我。