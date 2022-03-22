<!--
 * @Author: your name
 * @Date: 2022-03-17 20:26:05
 * @LastEditTime: 2022-03-21 18:36:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \supermall\src\views\category\Category.vue
-->
<template>
  <div class="wrapper" ref="aaa">
    <ul class="content"></ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Category',
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 创建better-scroll对象
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      click: true,
      probeType: this.probeType
    });
    this.scroll.on('scroll', position => {
      console.log(position);
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
}
</style>
