## read-file-env

读取环境变量

```bash
# .env.local
VUE_APP_DIR=project/match
```

开始使用：

```js
const { readEnv } = require('read-file-env');

const appDir = readEnv('VUE_APP_DIR', '.env.local');

console.log(appDir); // project/match
```



