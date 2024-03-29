- nodejs 全局库安装的调试

```bash
#去全局安装目录找到 xxx.cmd
"%_prog%"  "%dp0%\node_modules\yarn\bin\yarn.js" %*
改成 
"%_prog%" --inspect-brk "%dp0%\node_modules\yarn\bin\yarn.js" %*
```

- nodejs设置端口

```bash
指定端口调试：--inspect-brk=[host:port]
node --inspect-brk ../../bin/webpack.js --verbose --min example.js js/output.js

换端口例子：
"build:dev": "node --inspect-brk=127.0.0.1:9222 ./node_modules/webpack/bin/webpack.js --mode=development",

//jest-debug:使用chrome调试jest
//node --inspect node_modules/.bin/jest   或者node --inspect-brk node_modules/.bin/jest
//这条命令可以调试成功：node --inspect-brk ./node_modules/jest/bin/jest --runInBand --no-cache --no-watchman


//gulp-debug:使用chrome调试gulp
//node --inspect-brk ./node_modules/gulp/bin/gulp loc --runInBand --no-cache --no-watchman  
```

- mocha的调试命令

```bash
node --inspect-brk .\node_modules\mocha\bin\mocha -b test\test.js
```

- rt-script调试命令

```bash
"start": "node --inspect-brk ./node_modules/react-scripts/bin/react-scripts start"
```

- jest针对某个文件的调试

```bash
node --inspect-brk ./node_modules/jest/bin/jest --testPathPattern=packages/scheduler/src/__tests__/Scheduler-test.js

node --inspect-brk ./node_modules/jest/bin/jest --findRelatedTests packages/scheduler/src/__tests__/Scheduler-test.js

"debug-test": "yarn test --debug  --findRelatedTests packages/scheduler/src/__tests__/Scheduler-test.js"

scripts/jest/matchers/schedulerTestMatchers.js
```

- react fixtures dom的另外运行命令

```bash
node --inspect-brk F:/codes/github-in-pw/react/fixtures/dom/node_modules/react-scripts/scripts/start.js

```

- jest超时报错方案

```js
// jest.config.js  方案一
module.exports = {
    // ...
    testTimeout: 20000
}

// 方案二
describe('Puppeteer tests', () => {
  jest.setTimeout(10000);// 放在 describe 下层
  test('Best Jest test fest', async () => {
    // Blah
  });
});
```

