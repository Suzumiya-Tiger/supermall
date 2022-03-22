<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="scrollContent"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @loadMore="loadMore"
      :pullUpLoad="true"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top
      @click.native="backClick"
      v-show="scrollControl"
      :pull-up-load="true"
    />
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import tabControl from 'components/content/tabControl/tabControl';

import { getHomeMultidata, getHomeGoods } from 'network/home';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    /* 注册导入的组件 */
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    tabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      scrollControl: false,
      refreshDom: true
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    this.refreshDom = false;
  },
  methods: {
    /**
     *网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    /* 2.请求商品数据 */
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.refreshDom ? null : this.$refs.scroll.refreshScroll();
      });
    },
    /**
     *事件监听相关方法
     */
    tabClick(index) {
      this.currentType = index === 0 ? 'pop' : index === 1 ? 'new' : 'sell';
    },
    backClick() {
      //   回到顶部
      this.$refs.scroll.scrollTo(0, 0, 600);
    },
    contentScroll(position) {
      this.scrollControl = Math.abs(position.y) > 1000 ? true : false;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    }
  }
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100vh;
  position: relative;
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
  /* position: sticky; */
  /* sticky必须设置top属性 */
  /* 该属性未到达该模块位置为顶部之时，默认为static属性，
  而到达了该属性的顶部位置之后，则自动变化为fixed属性，常用于移动端 */
  top: 44px;
  z-index: 9;
}
.scrollContent {
  position: absolute;
  top: 44px;
  bottom: 48px;
  left: 0;
  right: 0;
  -webkit-overflow-scrolling: touch;
}
</style>
