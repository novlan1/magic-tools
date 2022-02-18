import VFuncLine from '../../index';
import funcLineMap from '../../funcLineMap.json';


export default({
  Vue,
  router,
  siteData
}) => {
  Vue.use(VFuncLine, {
    router,
    siteData,
    funcLineMap, // 函数和文件名行号的对象
    delay: 300, // mounted后的延迟执行时间
    gitLink: 'https://github.com/novlan1/v-func-line/blob/master', // git仓库路径地址
  });

  Vue.mixin({
    mounted() {
      changeLang();
    },
  });
}

function changeLang() {
  const htmlEle = document.getElementsByTagName('html')[0];
  htmlEle.lang = 'zh-CN';
}

