<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.check-button {
  width: 33px;
  height: 18px;
  margin-right: 2px;
  text-align: center;

  border-radius: 50%;
  border: 2px solid #aaa;
  img {
    width: 10px;
    margin-top: 2px;
  }
}
.check {
  border-color: red;
  background-color: red;
}
</style>