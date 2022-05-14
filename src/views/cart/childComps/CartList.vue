<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!--   <li v-for="(item,index) in cartList" :key="index+59">{{item}}</li> -->
      <cart-list-item
        v-for="(item,index) in cartList"
        :item-info="item"
        :key="index+59"
        @checked="item.checked=!item.checked"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll';
import { mapGetters } from 'vuex';

import CartListItem from './CartListItem';
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refreshScroll();
  }
};
</script>

<style lang="less" scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
  .content {
    height: 100%;
    overflow: hidden;
  }
}
</style>