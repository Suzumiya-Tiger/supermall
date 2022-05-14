<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list />
    <cart-bottom-bar></cart-bottom-bar>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from '@/views/cart/childComps/CartList';
import CartBottomBar from '@/views/cart/childComps/CartBottomBar';
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
};
</script>

<style lang="less" scoped>
.nav-bar {
  touch-action: pan-y; // 个人推荐
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
