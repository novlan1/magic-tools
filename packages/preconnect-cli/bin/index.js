#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');

const DNS_PREFETCH_TEMPLATE =  '<link rel="dns-prefetch" href="{{}}">';
const PRECONNECT_TEMPLATE = '<link rel="preconnect" href="{{}}" crossorigin>';
// const TEMP_WRITE_FILE_PATH = './.preconnect.html';


/**
 * 提取文件中（主要是index.html）的host列表
 * @param {string} fPath 文件路径
 */
function extractHost(fPath) {
  const str = fs.readFileSync(fPath, 'utf-8');
  const reg = /(?:href|src)=(?:"|')(.*?)("|')/g;
  let regRes;
  let hostList = [];
  while (regRes = reg.exec(str)) {
    if (regRes[1]) {
      const pureHost = getPureHost(regRes[1]);
      if (pureHost) {
        hostList.push(pureHost);
      }
    }
  }
  hostList = Array.from(new Set(hostList));
  return hostList;
}

/**
 * 去掉协议和多余路由信息
 * @param {string} url URL地址
 */
function getPureHost(url = '') {
  url = url.replace(/(https:|http:)/g, '');
  const parts = url.replace('//', '').split('/');

  if (parts[0] && parts[0] !== '#') {
    return `//${parts[0]}`;
  }
}

/**
 * 写入文件
 * @param {string} fPath 文件路径
 * @param {string} data 写入内容
 */
// eslint-disable-next-line no-unused-vars
function writeToFile(fPath, data) {
  fs.writeFileSync(fPath, data, {
    encoding: 'utf-8',
  });
}

/**
 * 获取DNS预解析等HTML内容
 * @param {Array} hostList host列表
 */
function getPrefetchAndPreConnectHTML(hostList = []) {
  const res = [];
  hostList.map((item) => {
    res.push(DNS_PREFETCH_TEMPLATE.replace('{{}}', item));
    res.push(PRECONNECT_TEMPLATE.replace('{{}}', item));
  });
  return res;
}

/**
 * 主函数
 * @param {Array} fPath 文件路径列表
 */
function main(pathList = []) {
  // 支持传入多个文件路径，以空格分割
  let totalHostList = [];
  pathList.map((fPath) => {
    const hostList = extractHost(fPath);
    totalHostList.push(...hostList);
  });

  // 去重
  totalHostList = Array.from(new Set(totalHostList));
  printHost(totalHostList);

  const htmlList = getPrefetchAndPreConnectHTML(totalHostList);
  printHtml(htmlList);
}


/**
 * 打印Host信息
 * @param {Array} hostList host列表
 */
function printHost(hostList = []) {
  const hostStr = hostList.join('\n');

  console.log(chalk.bold.blue('提取到的Host列表：\nStart ===>>'));
  console.log(chalk.green(hostStr));
  console.log(chalk.bold.blue('<<=== End\n'));
}

/**
 * 打印 HTML
 * @param {Array} html HTML列表
 */
function printHtml(html = []) {
  const htmlStr = html.join('\n');

  console.log(chalk.bold.blue('请复制以下绿色文字：\nStart ===>>'));
  console.log(chalk.green(htmlStr));
  console.log(chalk.bold.blue('<<=== End'));

  // writeToFile(TEMP_WRITE_FILE_PATH, htmlStr);
}

(function () {
  const args = process.argv.slice(2);

  if (args[0]) {
    main(args);
  } else {
    console.log(chalk.bold.red('错误: 请提供文件路径！'));
  }
}());
