## preconnect-cli

生成DNS预解析、预连接HTML的脚手架工具

### 使用方法
1. 安装

```bash
npm install preconnect-cli -g
```

2. 执行以下命令
```
preconnect-cli 路径 路径 ...
```

举例：

```bash
preconnect-cli ./index.html ./index2.html

# 或者
preconnect-cli /Users/mike/index.html /Users/mike/index2.html
```


### 生成示例

```html
<link rel="dns-prefetch" href="//qq.com">
<link rel="preconnect" href="//qq.com" crossorigin>
<link rel="dns-prefetch" href="//baidu.com">
<link rel="preconnect" href="//baidu.com" crossorigin>
```

### 示例图片

![demo](/img/demo.png)
