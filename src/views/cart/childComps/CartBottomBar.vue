<template>
  <div id="CartBottomBar">
    <div class="checked-content" @click="checkClick">
      <check-button :is-checked="isSelectAll" class="checked-button"></check-button>
      <span class="checked-des">全选</span>
    </div>
    <span class="totalPrice">合计：{{totalPrice}}</span>
    <div class="caculator" @click="calcClick">
      <p>去计算({{checkLength}})</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CheckButton from '../../../components/content/checkButton/CheckButton.vue';
export default {
  components: { CheckButton },
  name: 'CartBottomBar',
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '￥' +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    isSelectAll() {
      if (this.cartList.length) {
        return !this.cartList.find(item => !item.checked);
      } else {
        return false;
      }
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全选状态
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.showMsg('请选择要购买的商品');
      }
    }
  }
};
</script>

<style lang="less" scoped>
#CartBottomBar {
  height: 40px;
  position: relative;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  //   line-height: 40px;
  .checked-content {
    display: flex;
    align-items: center;

    .checked-button {
      width: 20px;
      height: 20px;
    }
    .checked-des {
      padding-left: 2px;
    }
  }
  .totalPrice {
    font-size: 14px;
    padding-top: 12px;
    padding-left: 5px;
  }
  .caculator {
    color: #fff;
    font-size: 14px;
    padding: 0 5px;
    background-color: #f99665;
    height: 100%;
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
</style>