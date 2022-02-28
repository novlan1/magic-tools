'use strict';

const fs = require('fs');

function getKeyValue(key, sourceline) {
  let result;
  let ma;
  const re = new RegExp(`${key}\\s*=\\s*(.*?)(\\s|$)`);

  for (const line of sourceline) {
    if (line.startsWith('#')) {
      // 忽略注释行
      continue;
    }

    ma = line.match(re);

    if (ma) {
      result = ma[1] || '';
      break;
    }
  }

  return result;
} // 获取模块名称


function readEnv(key, filepath) {
  if (!fs.lstatSync(filepath)) {
    console.log('文件不存在:', filepath, '，请先创建文件');
    process.exit(1);
  }

  try {
    const sourceStr = fs.readFileSync(filepath, 'utf-8');
    const sourceLine = sourceStr.split('\n');
    return getKeyValue(key, sourceLine);
  } catch (e) {
    console.log('打开文件失败:', filepath);
    process.exit(1);
  }
}

module.exports = {
  readEnv
};
