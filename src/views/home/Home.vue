<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
<home-swiper :banners="banners"/>
<recommend-view :recommends="recommends"/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import { getMultiData } from 'network/home'

export default {
  name: 'Home',
  components: {
    /* 注册导入的组件 */
    NavBar,  
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    //1.请求多个数据

    /* 1.函数调用 --> 压入函数栈(保存函数调用中所有的变量)
      2.函数调用结束 --> 弹出函数栈(释放函数所有的变量)  */
    getMultiData().then((res) => {
      let vm=this
      vm.banners=res.data.banner.list;
      vm.recommends=res.data.recommend.list;
    })
  },
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>
