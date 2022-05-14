<template>
  <div class="DetailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backHome">
        <img src="~assets/img/common/back.svg" alt="返回首页" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index + 100"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import NavBar from 'components/common/navbar/NavBar';
export default {
  components: { NavBar },
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('backToContent', this.currentIndex);
    },
    backHome() {
      this.$router.back(); //或者go(-1)
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}

.back img {
  vertical-align: middle;
}
</style>
