const fs = require('fs');
const path = require('path');

// 遍历文件夹，逐个文件获取函数所在行
function getContent(dir, funcLineMap = {}) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = `${dir}/${file}`;
    const fileInfo = fs.statSync(fullPath);

    console.log('fullPath: ', fullPath);

    if (fileInfo.isFile()) {
      readContentFromMd(fullPath, funcLineMap);
    } else {
      getContent(fullPath, funcLineMap);
    }
  });
  return funcLineMap;
}

// 如果文件名是index，获取父文件夹名称
function getParentDirName(file) {
  const list = file.split('/');
  return list[list.length - 2];
}

// 获取文件名
function getFileName(file) {
  let fileName = path.basename(file, '.js');
  if (fileName === 'index') {
    fileName = getParentDirName(file);
  }
  return fileName;
}

// 获取函数所在行
function readContentFromMd(file, funcLineMap) {
  const content = fs.readFileSync(file, 'utf-8');
  const contentList = content.split('\n');
  const fileName = getFileName(file);
  // console.log(file.replace(__dirname, ''));

  const relativePath = file.replace(__dirname, '');

  /**
   * 分别对应以下几种情况：
   * function test(){}
   * export const test = () => {}
   * const test = function() {}
   */
  const reg = /(.*function\s+([^(\s]+?)[{|(]|export\s+const\s+([^\s]+?)\s*=\s*|const\s+(.*?)\s+=\s+function)/;
  
  addAttributeForMap(contentList, fileName, relativePath, funcLineMap, reg)
 
  /**
   * 分别对应以下集中情况：
   * Share.initConfig = function() {}
   * Share.initConfig = (src) => {}
   */
  const extraReg = /(\.([^\.]+)\s+=\s+(function|.+=>))/
  addAttributeForMap(contentList, fileName, relativePath, funcLineMap, extraReg)

  return funcLineMap;
}

// 为funcLineMap添加属性
function addAttributeForMap(contentList, fileName, relativePath, funcLineMap, reg) {
  contentList.map((item, index) => {
    const regMatch = item.match(reg);

    if (regMatch && (regMatch[2] || regMatch[3] || regMatch[4])) {
      const funcName = regMatch[2] || regMatch[3] || regMatch[4];
      const key = `${fileName}-${funcName}`;

      if (!funcLineMap[key]) {
        funcLineMap[key] = `${relativePath}#L${index + 1}`;
      }
    }
  });
}

// function getAnnotation(fileContent, fileAnnotationMap) {
//   const mainReg = /\/\*\*[\s\S]*?([^@]function|=>).*\n/g;
//   const matchRes = fileContent.match(mainReg);
//   let funcName;

//   const res = {
//     param: [],
//     returns: [],
//     function: [],
//   };

//   if (matchRes && matchRes.length) {
//     matchRes.map((item) => {
//       const itemList = item.split('\n');
//       const annoReg = /@(.+?)\s(.*)/;
//       const funcNameReg = /(?:function\s+(.+?)[{|(]|const\s+(.+?)\s+=)/;

//       itemList.map((it) => {
//         const funcNameMatchRes = it.match(funcNameReg);
//         const annoMatchRes = it.match(annoReg);

//         if (funcNameMatchRes && (funcNameMatchRes[1] || funcNameMatchRes[2])) {
//           funcName = funcNameMatchRes[1] || funcNameMatchRes[2];
//         }
//         if (annoMatchRes && annoMatchRes[1] && annoMatchRes[2] && res[annoMatchRes[1]]) {
//           res[annoMatchRes[1]].push(annoMatchRes[2]);
//         }
//       });
//     });
//   }
//   if (funcName) {
//     fileAnnotationMap[funcName] = res;
//   }
// }

// 保存函数所在行到文件中
function saveFuncLineMap(funcLineMap) {
  const str = JSON.stringify(funcLineMap, null, 2);
  fs.writeFileSync(process.cwd() + '/funcLineMap.json', str, {
    encoding: 'utf-8',
  });
};

module.exports = {
  getContent,
  saveFuncLineMap
};