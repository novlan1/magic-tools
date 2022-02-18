const VuePreLoadImg = {};
let PRELOAD_IMAGES_KEY = 'VUE_PRELOAD_IMG_CONFIG';

VuePreLoadImg.install = function (Vue, options) {
  if (options.key && typeof options.key === 'string') {
    PRELOAD_IMAGES_KEY = options.key;
  }

  Vue.mixin({
    mounted() {
      if (this.$data
           && this.$data[PRELOAD_IMAGES_KEY]
           && this.$data[PRELOAD_IMAGES_KEY].data
           && Array.isArray(this.$data[PRELOAD_IMAGES_KEY].data)
           && this.$data[PRELOAD_IMAGES_KEY].data.length
      ) {
        const { delay } = this.$data[PRELOAD_IMAGES_KEY];
        let thisDelay = 0;
        if (delay && typeof delay === 'number') {
          thisDelay = delay;
        }
        setTimeout(() => {
          this.$data[PRELOAD_IMAGES_KEY].data.map((item) => {
            const image = new Image();
            image.src = item;
          });
        }, thisDelay);
      }
    },
  });
};

export default VuePreLoadImg;
