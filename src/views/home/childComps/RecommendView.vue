<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="100 + index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  /* flex-grow:1 flex-shrink:1 flex-basis:0% 可增大，可收缩，空间不足时优先压缩自身尺寸 */
  flex: auto;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
