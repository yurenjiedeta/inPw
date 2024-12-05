我会创建一个全面的 useMemo 示例集合，涵盖各种使用场景和最佳实践。

```javascript
import React, { useState, useMemo, useEffect } from 'react';

// 1. 基础计算缓存示例
function BasicExample() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(2);

  // 使用 useMemo 缓存计算结果
  const multipliedNumbers = useMemo(() => {
    console.log('Computing multiplied numbers...');
    return numbers.map(num => num * multiplier);
  }, [numbers, multiplier]); // 依赖于 numbers 和 multiplier

  return (
    <div>
      <div>Original numbers: {numbers.join(', ')}</div>
      <div>Multiplied by {multiplier}: {multipliedNumbers.join(', ')}</div>
      <button onClick={() => setMultiplier(m => m + 1)}>
        Increase Multiplier
      </button>
    </div>
  );
}

// 2. 复杂计算示例
function ExpensiveCalculationExample() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟复杂计算，使用 useMemo 缓存结果
  const expensiveValue = useMemo(() => {
    console.log('Performing expensive calculation...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result / count || 0;
  }, [count]); // 只依赖于 count

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type here..."
      />
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <p>Expensive Value: {expensiveValue}</p>
    </div>
  );
}

// 3. 对象引用稳定性示例
function ObjectStabilityExample() {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(30);

  // 使用 useMemo 保持对象引用稳定
  const person = useMemo(() => ({
    name,
    age,
    details: {
      id: Math.random(),
      createdAt: new Date().toISOString()
    }
  }), [name, age]);

  useEffect(() => {
    console.log('Person changed:', person);
  }, [person]); // 依赖于 person 对象

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setAge(a => a + 1)}>
        Increment Age
      </button>
      <PersonDetails person={person} />
    </div>
  );
}

// 4. 列表过滤和排序示例
function ListProcessingExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 1 },
    { id: 2, name: 'Banana', price: 0.5 },
    { id: 3, name: 'Orange', price: 0.8 }
  ]);
  const [filterPrice, setFilterPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');

  // 使用 useMemo 缓存过滤和排序的结果
  const processedItems = useMemo(() => {
    console.log('Processing items...');
    let result = items.filter(item => item.price >= filterPrice);
    
    return result.sort((a, b) => {
      const comparison = a.price - b.price;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [items, filterPrice, sortOrder]);

  return (
    <div>
      <input
        type="number"
        value={filterPrice}
        onChange={(e) => setFilterPrice(Number(e.target.value))}
        step="0.1"
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <ul>
        {processedItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. 复杂样式计算示例
function StyleComputationExample() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  // 使用 useMemo 缓存复杂的样式计算
  const styles = useMemo(() => ({
    container: {
      backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
      color: theme === 'light' ? '#333333' : '#ffffff',
      padding: '20px',
      transition: 'all 0.3s ease',
      fontSize: `${fontSize}px`,
      boxShadow: theme === 'light' 
        ? '0 2px 4px rgba(0,0,0,0.1)'
        : '0 2px 4px rgba(0,0,0,0.5)',
    },
    button: {
      backgroundColor: theme === 'light' ? '#007bff' : '#28a745',
      color: '#ffffff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      fontSize: `${fontSize - 2}px`,
    }
  }), [theme, fontSize]);

  return (
    <div style={styles.container}>
      <button 
        style={styles.button}
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
      >
        Toggle Theme
      </button>
      <input
        type="range"
        min="12"
        max="24"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
    </div>
  );
}

// 6. 数据转换和格式化示例
function DataTransformExample() {
  const [data, setData] = useState([
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 150 },
    { date: '2024-01-03', value: 200 }
  ]);
  const [format, setFormat] = useState('number');

  // 使用 useMemo 缓存数据转换结果
  const transformedData = useMemo(() => {
    console.log('Transforming data...');
    return data.map(item => ({
      ...item,
      displayValue: format === 'currency' 
        ? `$${item.value.toFixed(2)}`
        : format === 'percent'
          ? `${(item.value / 100).toFixed(1)}%`
          : item.value,
      date: new Date(item.date).toLocaleDateString()
    }));
  }, [data, format]);

  return (
    <div>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="number">Number</option>
        <option value="currency">Currency</option>
        <option value="percent">Percentage</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {transformedData.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.displayValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 7. 动态依赖示例
function DynamicDependenciesExample() {
  const [config, setConfig] = useState({
    enableFeatureA: true,
    enableFeatureB: false,
    threshold: 10
  });
  const [data, setData] = useState([1, 2, 3, 4, 5]);

  // 使用 useMemo 处理动态依赖的计算
  const processedData = useMemo(() => {
    console.log('Processing data with config...');
    let result = [...data];

    if (config.enableFeatureA) {
      result = result.map(x => x * 2);
    }

    if (config.enableFeatureB) {
      result = result.filter(x => x > config.threshold);
    }

    return result;
  }, [data, config.enableFeatureA, config.enableFeatureB, config.threshold]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={config.enableFeatureA}
          onChange={(e) => setConfig({
            ...config,
            enableFeatureA: e.target.checked
          })}
        />
        Enable Feature A
      </label>
      <label>
        <input
          type="checkbox"
          checked={config.enableFeatureB}
          onChange={(e) => setConfig({
            ...config,
            enableFeatureB: e.target.checked
          })}
        />
        Enable Feature B
      </label>
      <input
        type="number"
        value={config.threshold}
        onChange={(e) => setConfig({
          ...config,
          threshold: Number(e.target.value)
        })}
      />
      <div>Result: {processedData.join(', ')}</div>
    </div>
  );
}

// 8. 缓存组件配置示例
function ComponentConfigExample() {
  const [componentId, setComponentId] = useState('1');
  const [globalTheme, setGlobalTheme] = useState('light');

  // 使用 useMemo 缓存复杂的组件配置
  const componentConfig = useMemo(() => ({
    id: componentId,
    theme: globalTheme,
    layout: {
      width: globalTheme === 'light' ? '100%' : '90%',
      padding: globalTheme === 'light' ? '20px' : '15px',
      margin: 'auto'
    },
    animations: {
      duration: '300ms',
      timing: 'ease-in-out',
      properties: ['background-color', 'color', 'padding']
    },
    accessibility: {
      role: 'region',
      ariaLabel: `Component ${componentId}`,
      tabIndex: 0
    }
  }), [componentId, globalTheme]);

  return (
    <div {...componentConfig.accessibility} style={componentConfig.layout}>
      <button onClick={() => setComponentId(id => String(Number(id) + 1))}>
        Change Component ID
      </button>
      <button onClick={() => setGlobalTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <pre>{JSON.stringify(componentConfig, null, 2)}</pre>
    </div>
  );
}

```

这些示例展示了 useMemo 的多种用法，让我解释每个示例的重点：

1. 基础计算缓存：
- 展示了最简单的 useMemo 使用方式
- 缓存数组计算结果
- 依赖项更新时重新计算

2. 复杂计算示例：
- 处理耗时的计算
- 避免不必要的重复计算
- 性能优化

3. 对象引用稳定性：
- 保持对象引用稳定
- 避免不必要的重新渲染
- 配合 useEffect 使用

4. 列表处理：
- 缓存过滤和排序结果
- 处理多个依赖项
- 优化列表渲染性能

5. 样式计算：
- 缓存复杂样式对象
- 主题切换优化
- 动态样式计算

6. 数据转换：
- 缓存数据格式化结果
- 处理复杂的数据转换
- 提高渲染性能

7. 动态依赖：
- 处理复杂的配置依赖
- 条件性计算
- 优化配置更改

8. 组件配置：
- 缓存复杂配置对象
- 处理主题和布局
- 优化组件性能

使用 useMemo 的最佳实践：

1. 合适的场景：
- 复杂计算
- 大数据处理
- 对象引用稳定性

2. 性能考虑：
- 避免过度使用
- 权衡缓存成本
- 测量实际性能影响

3. 依赖项管理：
- 正确设置依赖数组
- 考虑依赖项变化频率
- 避免过多依赖

您想深入了解某个特定场景吗？或者有其他关于 useMemo 的问题？