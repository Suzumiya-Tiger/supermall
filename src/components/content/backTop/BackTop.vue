<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="toTop" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
name:'BackTop',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
