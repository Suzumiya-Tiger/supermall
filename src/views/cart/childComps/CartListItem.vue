<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-price right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
export default {
  components: {
    CheckButton
  },
  name: 'CartListItem',
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkClick() {
      this.$emit('checked');
    }
  }
};
</script>

<style lang="less" scoped>
#shop-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 0;
    padding-right: 10px;
    img {
      width: 80px;
      height: 100px;
      display: block;
      border-radius: 5px;
    }
  }
  .item-info {
    display: block;
    width: 69%;
    position: relative;

    font-size: 16px;
    .item-title {
      padding-bottom: 10px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-desc {
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .info-bottom {
      margin-top: 10px;
      position: absolute;
      bottom: 10px;
      right: 10px;
      left: 10px;
      .item-price {
        color: orangered;
      }
    }
  }
}
</style>