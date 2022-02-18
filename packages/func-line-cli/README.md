## func-line-cli

获取函数所在行号的命令行工具

### 使用方法

1、安装包
```bash
npm install func-line-cli
```

2、命令行中使用
```bash
func-line ./src/utils
```
其中`.src/utils`表示要遍历的目录


### 输出

输出一个文件`funcLineMap.json`，内容格式为：
```json
{
  "city-getAreaDataAll": "./src/utils/city/index.js#L3",
  "city-getAreaData": "./src/utils/city/index.js#L17",
  "city-getAreaCode": "./src/utils/city/index.js#L65",
  "city-getAreaName": "./src/utils/city/index.js#L92"
}
```
每一行的含义为：`${文件名}-${函数名}: ${文件路径}#L${行号}`

### 搭配使用

[v-func-line](https://github.com/novlan1/v-func-line)

### Demo文档

点击[这里](https://novlan1.github.io/v-func-line/)可以查看插件效果



