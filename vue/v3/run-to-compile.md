# Vue3 模板编译和 AST 生成流程详细分析

## 1. mount 入口处理

当调用 `app.mount('#app')` 时，首先进入重写的 mount 方法：

```typescript
// packages/runtime-dom/src/index.ts
app.mount = (containerOrSelector: Element | string): any => {
  // 1. 标准化容器
  const container = normalizeContainer(containerOrSelector)
  if (!container) return
  
  // 2. 获取组件实例
  const component = app._component
  
  // 3. 如果组件没有 render 函数和 template 属性，则使用容器的 innerHTML 作为模板
  if (!isFunction(component) && !component.render && !component.template) {
    component.template = container.innerHTML
  }
  
  // 4. 清空容器
  container.innerHTML = ''
  
  // 5. 执行真正的挂载
  const proxy = mount(container, false, container instanceof SVGElement)
  return proxy
}
```

## 2. 模板编译入口

当组件初始化时，会进入编译过程：

```typescript
// packages/runtime-core/src/component.ts
function setupComponent(instance: ComponentInternalInstance) {
  // 1. 处理 props
  initProps(instance, instance.vnode.props)
  // 2. 处理 slots
  initSlots(instance, instance.vnode.children)
  
  // 3. 设置有状态的组件
  const setupResult = setupStatefulComponent(instance)
  return setupResult
}

function setupStatefulComponent(instance: ComponentInternalInstance) {
  // 1. 获取组件选项
  const Component = instance.type
  
  // 2. 如果没有 render 函数，需要编译模板
  if (!Component.render && Component.template && !Component.ssrRender) {
    const { compile } = instance.appContext.config
    Component.render = compile(Component.template, {
      isCustomElement: instance.appContext.config.isCustomElement || NO,
      delimiters: Component.delimiters
    })
  }
}
```

## 3. 编译过程 - 生成 AST

编译过程从 compile 函数开始：

```typescript
// packages/compiler-core/src/compile.ts
export function compile(
  template: string,
  options: CompilerOptions = {}
): CodegenResult {
  // 1. 解析模板，生成 AST
  const ast = parse(template, options)
  
  // 2. 转换 AST
  transform(ast, Object.assign({}, options, {
    nodeTransforms: [
      transformElement,
      transformText,
      transformOn,
      transformBind,
      ...options.nodeTransforms || []
    ]
  }))
  
  // 3. 生成代码
  return generate(ast, options)
}
```

### 3.1 解析模板生成 AST

```typescript
// packages/compiler-core/src/parse.ts
export function parse(template: string, options: ParserOptions = {}): RootNode {
  // 1. 创建解析上下文
  const context = createParserContext(template, options)
  // 2. 获取起始位置
  const start = getCursor(context)
  
  // 3. 创建 AST 根节点并开始解析
  return createRoot(
    parseChildren(context, TextModes.DATA, []),
    getSelection(context, start)
  )
}

function parseChildren(
  context: ParserContext,
  mode: TextModes,
  ancestors: ElementNode[]
): TemplateChildNode[] {
  const nodes: TemplateChildNode[] = []
  
  // 循环解析节点直到结束
  while (!isEnd(context, mode, ancestors)) {
    const s = context.source
    let node: TemplateChildNode | undefined = undefined
    
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      // 1. 处理标签
      if (startsWith(s, '<')) {
        if (s[1] === '!') {
          // 处理注释和 DOCTYPE
        } else if (s[1] === '/') {
          // 处理结束标签
          node = parseEndTag(context, ancestors)
        } else if (/[a-z]/i.test(s[1])) {
          // 处理元素标签
          node = parseElement(context, ancestors)
        }
      } 
      // 2. 处理插值
      else if (startsWith(s, '{{')) {
        node = parseInterpolation(context)
      }
    }
    
    // 3. 如果没有特殊节点，则作为文本处理
    if (!node) {
      node = parseText(context)
    }
    
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        pushNode(nodes, node[i])
      }
    } else {
      pushNode(nodes, node)
    }
  }
  
  return nodes
}
```

## 4. 子组件的处理

当解析到子组件时，会有特殊的处理流程：

```typescript
function parseElement(
  context: ParserContext,
  ancestors: ElementNode[]
): ElementNode | undefined {
  // 1. 解析开始标签
  const element = parseTag(context, TagType.Start)
  
  // 2. 检查是否是自闭合标签
  if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
    return element
  }
  
  // 3. 递归解析子节点
  ancestors.push(element)
  const children = parseChildren(context, TextModes.DATA, ancestors)
  ancestors.pop()
  
  element.children = children
  
  // 4. 解析结束标签
  parseTag(context, TagType.End)
  
  return element
}

// 组件解析后的处理
function processComponent(
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null
) {
  if (n1 === null) {
    // 挂载组件
    mountComponent(n2, container, anchor)
  } else {
    // 更新组件
    updateComponent(n1, n2)
  }
}

function mountComponent(
  initialVNode: VNode,
  container: RendererElement,
  anchor: RendererNode | null
) {
  // 1. 创建组件实例
  const instance = createComponentInstance(initialVNode)
  
  // 2. 设置组件实例
  setupComponent(instance)
  
  // 3. 设置渲染效果
  setupRenderEffect(instance, initialVNode, container, anchor)
}
```

## 5. AST 节点的基本结构

```typescript
interface Node {
  type: NodeTypes
  loc: SourceLocation
}

interface ElementNode extends Node {
  type: NodeTypes.ELEMENT
  tag: string
  props: Array<AttributeNode | DirectiveNode>
  children: TemplateChildNode[]
  isSelfClosing: boolean
  codegenNode: VNodeCall | SimpleExpressionNode | CacheExpression | undefined
}

interface ComponentNode extends ElementNode {
  // 组件特有属性
  component: string
  isComponent: true
}
```

## 6. 编译优化

编译过程中会进行一些优化：

```typescript
function transform(root: RootNode, options: TransformOptions) {
  const context = createTransformContext(root, options)
  
  // 1. 遍历 AST
  traverseNode(root, context)
  
  // 2. 静态提升
  if (options.hoistStatic) {
    hoistStatic(root, context)
  }
  
  // 3. 创建根节点代码生成节点
  if (!options.ssr) {
    createRootCodegen(root, context)
  }
  
  // 4. 完成转换
  root.helpers = [...context.helpers]
  root.components = [...context.components]
  root.directives = [...context.directives]
  root.imports = context.imports
  root.hoists = context.hoists
  root.temps = context.temps
  root.cached = context.cached
}
```

## 关键流程总结

1. **入口解析**：
   - mount 时获取模板
   - 判断是否需要编译
   - 清理容器内容

2. **模板编译**：
   - parse：生成 AST
   - transform：转换和优化
   - generate：生成渲染函数

3. **子组件处理**：
   - 识别组件节点
   - 创建组件实例
   - 递归处理子组件

4. **AST 生成过程**：
   - 解析标签和属性
   - 处理指令和插值
   - 构建节点关系

5. **编译优化**：
   - 静态节点提升
   - 补丁标记生成
   - 缓存处理