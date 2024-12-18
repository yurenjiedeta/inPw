当使用 Turbopack 时，中间件的日志输出可能会有所不同。让我们尝试几种方法来获取中间件的日志：

1. 首先，不要同时使用 Turbopack 和 --inspect，先用标准模式测试中间件：

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 使用响应头来验证中间件是否执行
    const response = NextResponse.next()
    response.headers.set('x-middleware-test', Date.now().toString())
    
    // 强制输出到错误日志
    console.error('Middleware executed:', request.nextUrl.pathname)
    
    return response
}

export const config = {
    matcher: '/:path*'
}
```

2. 如果确实需要使用 Turbopack，可以修改启动脚本：

```json
// package.json
{
  "scripts": {
    "dev:debug": "cross-env NODE_OPTIONS='--inspect' next dev",
    "dev:turbo": "next dev --turbo",
    "dev:turbo:debug": "cross-env NODE_OPTIONS='--inspect' next dev --turbo"
  }
}
```

3. 如果使用 Windows，命令应该是：

```bash
set NODE_OPTIONS=--inspect && next dev
# 或者
set NODE_OPTIONS=--inspect && npm run dev
```

4. 另一种调试方法是使用响应头或状态来验证中间件：

```typescript
export function middleware(request: NextRequest) {
    // 通过响应来调试
    if (request.nextUrl.searchParams.has('debug')) {
        return new NextResponse(JSON.stringify({
            path: request.nextUrl.pathname,
            timestamp: Date.now()
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'x-debug': 'true'
            }
        })
    }
    
    return NextResponse.next()
}
```

然后访问任意页面并添加 ?debug 参数来查看调试信息。

你可以先试试不使用 Turbopack 的情况下，中间件是否正常工作和输出日志？这样我们可以确定问题是否与 Turbopack 相关。