<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar>
<home-swiper :banners="banners"/>
<recommend-view :recommends="recommends"/>
<feature-view/>
<tab-control class="tab-control" :titles="['流行','新款','精选']" />
<ul>
  <li>列表1</li>
  <li>列表2</li>
  <li>列表3</li>
  <li>列表4</li>
  <li>列表5</li>
</ul> 
</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import tabControl from 'components/content/tabControl/tabControl'

import { getMultiData, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    /* 注册导入的组件 */
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    tabControl,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        news: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    }
  },
  created() {
    let vm = this
    //1.请求多个数据
    vm.getHomeMultdata()
    /* 2.请求商品数据 */
    vm.getHomeGoods('pop')
  },
  methods: {
    getHomeMultdata() {
      let vm=this
      /* I.函数调用 --> 压入函数栈(保存函数调用中所有的变量)
      II.函数调用结束 --> 弹出函数栈(释放函数所有的变量)  */
      getHomeMultdata().then((res) => {
        vm.banners = res.data.banner.list
        vm.recommends = res.data.recommend.list
      })
    },

    getHomeGoods(type) {
      let vm=this
      const page=vm.goods[type].page+1
      getHomeGoods(type, page).then((res) => {
        /* 下面的方法是错误的，返回的数据是对应页码的数据，如果直接指向赋值，导致前面请求的页码数据就被覆盖消失
        vm.goods[type].list=res.data.list */
        
      })
    },
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  /* sticky必须设置top属性 */
  /* 该属性未到达该模块位置为顶部之时，默认为static属性，而到达了该属性的顶部位置之后，则自动变化为fixed属性，常用于移动端 */
  top: 44px;
}
</style>
