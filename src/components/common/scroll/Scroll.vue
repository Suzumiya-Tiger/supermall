<template>
  <div class="scroll-wrapper" ref="scroll">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bs: null,
      scrollNum: 10
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        useTransition: false,
        observeDOM: true,
        scrollX: false,
        scrollY: true,
        probeType: this.probeType,
        pullUpLoad: true,
        click: true
      });
      this.bs.on('scroll', position => {
        this.$emit('scroll', position);
      });
      this.bs.on('pullingUp', () => {
        // 上拉加载事件
        this.$emit('loadMore');
        this.bs.finishPullUp();
      });
    },
    refreshScroll() {
      this.bs.refresh();
    },
    scrollTo(x = 0, y = 0, timer = 3000) {
      this.bs.scrollTo(x, y, timer);
    }
  }
};
</script>

<style></style>
