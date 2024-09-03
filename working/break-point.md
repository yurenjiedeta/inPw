- break point

```javascript
console.log(12344444);
const breakpoints = JSON.parse(localStorage.getItem('domBreakpoints'));
    if (breakpoints && breakpoints.length > 0) {
        breakpoints.forEach(bp => {
            const element = document.querySelector(bp.selector);
            if (element) {
                switch (bp.type) {
                    case 'subtree-modified':
                        element.addEventListener('DOMSubtreeModified', () => {
                            debugger;
                        });
                        break;
                    case 'attribute-modified':
                        new MutationObserver(mutations => {
                            mutations.forEach(mutation => {
                                if (mutation.type === 'attributes') {
                                    debugger;
                                }
                            });
                        }).observe(element, { attributes: true });
                        break;
                    // 你可以根据需要添加更多断点类型
                    default:
                        console.log(`Unknown breakpoint type: ${bp.type}`);
                }
            }
        });
        console.log('DOM breakpoints have been restored.');
    } else {
        console.log('No DOM breakpoints found in LocalStorage.');
    }
```

