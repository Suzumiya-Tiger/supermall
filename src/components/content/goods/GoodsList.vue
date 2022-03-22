<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index + 100"
      :goods-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
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
.goods {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1;
}
</style>
