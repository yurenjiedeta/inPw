当然，这里是整理后的 `go tool` 命令及其使用例子：

1. **显示 Go 程序的汇编代码**：
   - **命令**：
     ```bash
     go tool objdump -s "main.main" your_binary_file
     ```
   - **示例**：
     ```bash
     go build -o my_program main.go
     go tool objdump -s "main.main" my_program
     ```
   - **描述**：显示 `main.main` 函数的汇编代码。

2. **分析并显示 Go 程序的内存分配情况**：
   - **命令**：
     ```bash
     go tool pprof http://localhost:6060/debug/pprof/heap
     ```
   - **示例**：
     ```go
     import _ "net/http/pprof"
     import "net/http"
     
     func main() {
         go func() {
             log.Println(http.ListenAndServe("localhost:6060", nil))
         }()
         // 你的程序代码
     }
     ```
     ```bash
     go build -o my_program main.go
     ./my_program
     go tool pprof http://localhost:6060/debug/pprof/heap
     ```
   - **描述**：分析并显示内存分配情况。首先需要在程序中启用 pprof。

3. **查看 Go 程序的运行时跟踪信息**：
   - **命令**：
     ```bash
     go tool trace trace.out
     ```
   - **示例**：
     ```go
     import _ "net/http/pprof"
     import "net/http"
     
     func main() {
         go func() {
             log.Println(http.ListenAndServe("localhost:6060", nil))
         }()
         // 你的程序代码
     }
     ```
     ```bash
     go build -o my_program main.go
     ./my_program
     curl -o trace.out http://localhost:6060/debug/pprof/trace?seconds=30
     go tool trace trace.out
     ```
   - **描述**：生成并分析运行时跟踪信息。需要通过 `http://localhost:6060/debug/pprof/trace?seconds=30` 生成跟踪文件。

4. **查看 Go 程序的类型信息**：
   - **命令**：
     ```bash
     go tool objdump -type your_binary_file
     ```
   - **示例**：
     ```bash
     go build -o my_program main.go
     go tool objdump -type my_program
     ```
   - **描述**：显示指定包或程序的类型信息。

5. **获取 Go 程序的性能统计信息**：
   - **命令**：
     ```bash
     go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
     ```
   - **示例**：
     ```go
     import _ "net/http/pprof"
     import "net/http"
     
     func main() {
         go func() {
             log.Println(http.ListenAndServe("localhost:6060", nil))
         }()
         // 你的程序代码
     }
     ```
     ```bash
     go build -o my_program main.go
     ./my_program
     go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
     ```
   - **描述**：获取程序的 CPU 性能数据，并使用 `go tool pprof` 命令分析。

6. **生成 Go 程序的运行时分析报告**：
   - **命令**：
     ```bash
     go tool trace trace.out
     ```
   - **示例**：
     ```go
     import _ "net/http/pprof"
     import "net/http"
     
     func main() {
         go func() {
             log.Println(http.ListenAndServe("localhost:6060", nil))
         }()
         // 你的程序代码
     }
     ```
     ```bash
     go build -o my_program main.go
     ./my_program
     curl -o trace.out http://localhost:6060/debug/pprof/trace?seconds=30
     go tool trace trace.out
     ```
   - **描述**：分析生成的跟踪文件以查看运行时分析报告。

7. **查看 Go 程序的编译器生成的中间代码**：
   - **命令**：
     ```bash
     go tool compile -S your_file.go
     ```
   - **示例**：
     ```bash
     go tool compile -S main.go
     ```
   - **描述**：显示编译器生成的汇编代码，其中包含中间代码信息。

8. **分析 Go 程序的内存使用情况并生成详细的内存分配报告**：
   - **命令**：
     ```bash
     go tool pprof http://localhost:6060/debug/pprof/heap
     ```
   - **示例**：
     ```go
     import _ "net/http/pprof"
     import "net/http"
     
     func main() {
         go func() {
             log.Println(http.ListenAndServe("localhost:6060", nil))
         }()
         // 你的程序代码
     }
     ```
     ```bash
     go build -o my_program main.go
     ./my_program
     go tool pprof http://localhost:6060/debug/pprof/heap
     ```
   - **描述**：分析内存分配情况并生成报告。

这些命令和工具可以帮助你深入分析和优化 Go 程序的性能、内存使用和其他运行时特性。