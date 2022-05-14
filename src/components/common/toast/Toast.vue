<template>
  <div class="toast" v-show="show">{{message}}</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toast',
  data() {
    return {
      message: '',
      show: false
    };
  },
  methods: {
    showMsg(msg, duration = 1500) {
      this.show = true;
      this.message = msg;
      setTimeout(() => {
        this.show = false;
        this.message = '';
      }, duration);
    }
  }
};
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  padding: 8px 10px;
  color: #fff;
  z-index: 999;
}
</style>