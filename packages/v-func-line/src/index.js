const DEFAULT_DELAY = 500;
const MIN_DELAY = 300;

// 主方法
const install = function (Vue, options) {
  const { router, siteData } = options;
  if (!router || !siteData) {
    return 
  }

  let delay = DEFAULT_DELAY;
  const funcLineMap = options && options.funcLineMap || {};
  const gitLink = options && options.gitLink || '';

  if (options
      && options.delay
      && options.delay >= MIN_DELAY
  ) {
    delay = options.delay;
  }

  Vue.mixin({
    mounted() {

      addEmptyLinkEle(router, siteData);
       
      setTimeout(() => {
        addSourceLink(funcLineMap, gitLink);
      }, delay);
    },
  });
};

// 在所有标题h1/h2...下添加空的a标签
function addEmptyLinkEle(router, siteData) {
  // 所有的page数据
  const pages = siteData && siteData.pages || [];

  const relativePath = router && router.history && router.history.current && router.history.current.path || '';
  
  // 当前page的key，也就是当前路由的name
  const currentName = router && router.history && router.history.current && router.history.current.name || '';
  
  // 文件名
  const filename = getFileName(relativePath);

  // 找到当前页面数据
  const currentPage = pages.filter(item => {
    return item.key === currentName
  })
  let headers = currentPage && currentPage[0] && currentPage[0].headers || [];

  // 遍历当前页面所有标题，添加子元素-a标签
  headers.map(item => {
    const { slug } = item;
    
    const title = item.title || '';

    // 唯一的className
    const fullFuncName = `${filename}-${getPureFuncName(title)}`;

    // 标题元素
    const slugEle = document.getElementById(slug);
    
    // a标签元素
    const linkEle = document.getElementsByClassName(fullFuncName)[0];

    if (slugEle && !linkEle) {
      const a = document.createElement('a');
      a.classList.add(`source-btn`)
      a.classList.add(fullFuncName)
      slugEle.appendChild(a)
    }
  })
}

// 获取文件名称
function getFileName(dir) {
  const rDir = dir.replace(/^\//, '').replace(/\.[^\.]*?$/, '');
  const dirArr = rDir.split('/');
  return dirArr[dirArr.length - 1]
}

// 去除函数参数
function getPureFuncName(func) {
  return func.replace(/\(.*$/, '')
}

// 获取元素，赋予属性
function addSourceLink(funcLineMap, gitLink) {
  const sourceEle = document.getElementsByClassName('source-btn');

  sourceEle.forEach((item) => {
    const href = getHref(item, funcLineMap, gitLink);
    
    if (!item.target && !item.href && href) {
      const parentElement = item.parentElement;
      parentElement.style = 'position: relative;';

      item.href = href;
      item.target = '_blank';
      item.style = 'position: absolute;right: 0;bottom: 6px;font-size: 1rem;z-index: 1;';
      item.innerText = 'source';
    }
  });
}

// 获取a标签的链接
function getHref(ele, funcLineMap, gitLink) {
  const eleClass = ele.classList && ele.classList[1] ? ele.classList[1] : '';
  const linkPostFix = funcLineMap[eleClass];
  if (!linkPostFix) {
    return '';
  }
  const resPath = pathResolve(gitLink, linkPostFix);
  return resPath;
}

// 模仿path.resolve
function pathResolve(dir, file = '') {
  if (file.startsWith('.')) {
    file = file.slice(1);
  }
  return dir + file;
}


export default install;
