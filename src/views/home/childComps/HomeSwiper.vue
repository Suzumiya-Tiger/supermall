<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index + 100">
      <a :href="item.link">
        <img :src="item.image" alt="首页图片" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImgLoad');
        this.load = true;
      }
    }
  }
};
</script>

<style></style>
