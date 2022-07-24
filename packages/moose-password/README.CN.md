# 摩尔斯密码解锁

这个库用来设置一个摩尔斯密码, 当输入该密码后. 即触发成功的回调函数.
可以用于 Pc 或 H5 页面的解锁, 校验是否是人工操作, 或触发某个隐藏的开关. 
如输入设置的密码后, 打开调试页面. 

## 使用流程

从 npm 安装. 

```
$ npm install morse-password --save;
```

也可以直接通过 script 引用 dist/index.js 文件

```html
<script src="dist/index.js" type="text/javascript"></script>
```

执行

```js
import MorsePass from 'morse-password'

moresePass = new MorsePass({
    // the target element which will bind event
    target: document.querySelector('body'),
    // the passwd to verify. '.' represents a click, '_' represents a press
    passwd: '.._.._',
    // the time from mousedown to mouse up. it will be treated as a press if bigger than this time
    // or it will be treated as click.  the unit is ms
    pressLeastTime: 1000,
    // how long time will the current operation expired, then it will verify again from the first code. the unit is ms
    expires: 6000,
    // trigger when the passwd is right.
    success() {
        console.log('Passwd Right!')
    },
    // trigger when input wrong code
    fail() {
        console.log('Passwd Wrong!')
    },
    // trigger on each input
    input(text) {
        console.log(text)
    },
    // trigger when the time is expired after the last operation
    expire() {
        console.log('expired!')
    }
})
```
