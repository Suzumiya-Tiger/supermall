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
      scrollNum: 10,
      currentIndex: 0
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
        pullUpLoad: this.pullUpLoad,
        click: true
      });
      if (this.probeType === 2 || this.probeType === 3) {
        this.bs.on('scroll', position => {
          this.$emit('scroll', position);
        });
      }
      if (this.pullUpLoad) {
        this.bs.on('pullingUp', () => {
          // 上拉加载事件,实现原理应该是拉到已加载完成的模块的底部触发
          this.$emit('loadMore');
        });
      }
    },
    getSCrollY() {
      return this.bs ? this.bs.y : 0;
    },
    finishPullUp() {
      this.bs.finishPullUp();
    },
    refreshScroll() {
      this.bs && this.bs.refresh();
    },
    scrollTo(x = 0, y = 0, timer = 3000) {
      this.bs && this.bs.scrollTo(x, y, timer);
    }
  }
};
</script>

<style></style>
