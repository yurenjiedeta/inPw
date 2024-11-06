```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vue 2.6.14 Source Code Example</title>
    <!-- 使用开发版本以便于调试 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.14/vue.js"></script>
</head>
<body>
    <div id="app">
        <!-- 使用全局注册的组件 -->
        <my-header 
            :title="headerTitle"
            @header-click="handleHeaderClick">
        </my-header>
        
        <my-content 
            :items="contentItems"
            @item-selected="handleItemSelected">
        </my-content>

        <my-footer 
            :copyright="footerText"
            v-show="showFooter">
        </my-footer>
    </div>

    <script>
        // 1. 全局注册 header 组件
        Vue.component('my-header', {
            props: {
                title: {
                    type: String,
                    required: true
                }
            },
            template: `
                <header class="app-header">
                    <h1 @click="handleClick">{{ title }}</h1>
                    <slot></slot>
                </header>
            `,
            data() {
                return {
                    localData: 'Header Component Data'
                }
            },
            methods: {
                handleClick() {
                    // 触发自定义事件
                    this.$emit('header-click', this.localData)
                }
            },
            // 生命周期钩子
            beforeCreate() {
                console.log('Header beforeCreate')
            },
            created() {
                console.log('Header created')
            },
            beforeMount() {
                console.log('Header beforeMount')
            },
            mounted() {
                console.log('Header mounted')
            }
        })

        // 2. 全局注册 content 组件
        Vue.component('my-content', {
            props: {
                items: {
                    type: Array,
                    default: () => []
                }
            },
            template: `
                <div class="content">
                    <ul>
                        <li v-for="(item, index) in items" 
                            :key="index"
                            @click="selectItem(item)">
                            {{ item.name }}
                        </li>
                    </ul>
                    <p v-if="items.length === 0">No items available</p>
                </div>
            `,
            methods: {
                selectItem(item) {
                    this.$emit('item-selected', item)
                }
            },
            // 监听器
            watch: {
                items: {
                    handler(newVal, oldVal) {
                        console.log('Items changed:', newVal)
                    },
                    deep: true
                }
            }
        })

        // 3. 全局注册 footer 组件
        Vue.component('my-footer', {
            props: {
                copyright: String
            },
            template: `
                <footer>
                    <p>{{ copyright }}</p>
                    <p>{{ computedMessage }}</p>
                </footer>
            `,
            computed: {
                computedMessage() {
                    return `Computed at: ${new Date().toLocaleTimeString()}`
                }
            }
        })

        // 4. 创建根实例
        new Vue({
            el: '#app',
            data: {
                headerTitle: 'Vue Source Code Demo',
                contentItems: [
                    { id: 1, name: 'Item 1' },
                    { id: 2, name: 'Item 2' },
                    { id: 3, name: 'Item 3' }
                ],
                footerText: '© 2024 Vue Demo',
                showFooter: true
            },
            methods: {
                handleHeaderClick(data) {
                    console.log('Header clicked:', data)
                    // 修改数据以触发响应式更新
                    this.headerTitle = `Clicked: ${new Date().toLocaleTimeString()}`
                },
                handleItemSelected(item) {
                    console.log('Item selected:', item)
                    // 修改数组以触发响应式更新
                    this.contentItems = this.contentItems.filter(i => i.id !== item.id)
                }
            },
            // 根实例生命周期钩子
            beforeCreate() {
                console.log('Root beforeCreate')
            },
            created() {
                console.log('Root created')
            },
            beforeMount() {
                console.log('Root beforeMount')
            },
            mounted() {
                console.log('Root mounted')
                // 演示 nextTick
                this.$nextTick(() => {
                    console.log('DOM updated')
                })
            }
        })
    </script>
</body>
</html>

```

这个示例涵盖了 Vue 2.6.14 的主要功能点：

1. **组件注册与使用**：
   - 使用 `Vue.component` 全局注册了三个组件
   - 展示了组件间的数据流和通信

2. **核心功能特性**：
   - Props 传递和验证
   - 事件触发和监听
   - 计算属性
   - 观察者（watch）
   - 生命周期钩子
   - 条件渲染（v-if）
   - 列表渲染（v-for）
   - 显示控制（v-show）

3. **响应式系统**：
   - data 属性的响应式
   - 数组操作的响应式
   - nextTick 的使用

4. **组件通信**：
   - Props down
   - Events up
   - 插槽使用

调试建议：
1. 在浏览器中打开开发者工具
2. 在 Vue Devtools 中观察组件层级和数据流
3. 在生命周期钩子中设置断点
4. 在响应式更新的关键点设置断点，如：
   - `defineReactive` 函数
   - `patch` 函数
   - `updateComponent` 函数

关键源码文件位置：
- src/core/instance/init.js (实例初始化)
- src/core/global-api/assets.js (组件注册)
- src/core/observer/index.js (响应式系统)
- src/core/vdom/patch.js (虚拟 DOM 更新)

需要我详细解释某个具体部分吗？