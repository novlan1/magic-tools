const path = require('path')
const { readEnv } = require('../dist/bundle.js')

const appDir = readEnv('VUE_APP_DIR', path.resolve(__dirname, './.env'))
console.log('appDir', appDir)