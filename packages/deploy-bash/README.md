# deploy-bash



部署脚本

## 开始使用

```bash
# 参数依次为 isBackEndProject
$ npx deploy 1
```

前端项目

```bash
$ npx deploy
```

## 流程

1. 读取环境变量，获取`DEPLOY_HOST_NAME`/`DEPLOY_HOST_PWD`/`DEPLOY_TARGET_DIR`/`DEPLOY_PROJECT`
2. 获取打包文件名
3. 打包
4. 上传



