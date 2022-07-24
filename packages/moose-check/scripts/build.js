const path = require('path')
const { execSync } = require('child_process')

const ROOT_DIR = path.resolve(__dirname, '..')

// 清空构建文件夹
execSync(`rm -rf ./dist/*`, { encoding: 'utf-8', cwd: ROOT_DIR })

// 执行 rollup 打包
execSync(`npx rollup --config rollup.config.js`, { encoding: 'utf-8', cwd: ROOT_DIR })
