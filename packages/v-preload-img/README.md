## vue预加载插件

功能：在mounted钩子中，加载需要预加载的图片。
 
使用方法：
 
1. 引入

```js
import VuePreLoadImg from 'vue-preload-img'
 ```
  
2. 使用
  
```js  
Vue.use(VuePreLoadImg, {
  key: 'myKey', // 默认是预加载配置项的key是'VUE_PRELOAD_IMG_CONFIG'
})
```

3. 在data中加入要预加载的图片地址，如：

```js
data() {
  return {
    // ...
    VUE_PRELOAD_IMG_CONFIG: {
      delay: 1000, // 延迟毫秒数
      data: [
          '图片1.png'，
          '图片2.png'，
          '图片3.png'
        ]
    }
  }
}
```

