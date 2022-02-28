## read-file-env

读取环境变量

```bash
# .env.local
VUE_APP_DIR=project/match
```

开始使用：

```js
const { readFileEnv } = require('read-file-env');

const appDir = readFileEnv('VUE_APP_DIR', '.env.local');

console.log(appDir); // project/match
```



