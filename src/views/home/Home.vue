<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      class="tab-control"
      @tabClick="tabClick"
      v-show="isTabFixed"
      :titles="['流行', '新款', '精选']"
    />
    <scroll
      class="scrollContent"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @loadMore="loadMore"
      :pullUpLoad="true"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        ref="tabControl2"
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

import { itemListenerMixin, backTopMixin } from 'common/mixin';
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
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
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

    /*   this.refreshDom = false; */
  },

  activated() {
    this.$refs.scroll.refreshScroll();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getSCrollY();
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.imgListener);
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
        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     *事件监听相关方法
     */
    tabClick(index) {
      this.currentType = index === 0 ? 'pop' : index === 1 ? 'new' : 'sell';
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 判断backTop是否显示
      this.scrollControl = Math.abs(position.y) > 1000 ? true : false;
      // 决定tabControl是否吸顶的位置
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  touch-action: pan-y;
  width: 100%;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: relative;
  /* z-index只有在Postition定义以后方才生效 */
  z-index: 9;

  /* 为了适用于原生滚动而设计了下面的语法
  *  此时better-scroll标定了滚动区域，不使用下面的语法也不会跟随滚动
  */
  /*   position: fixed;
  left: 0;
  right: 0;
  top: 0;
    z-index: 9;
   */
}
.tab-control {
  /* position: sticky; */
  /* sticky必须设置top属性 */
  /* 该属性未到达该模块位置为顶部之时，默认为static属性，
  而到达了该属性的顶部位置之后，则自动变化为fixed属性，常用于移动端 */
  position: relative;
  top: 0px;
  z-index: 9;
}
.fixed {
  position: fixed;
  left: 0%;
  right: 0%;
  top: 44px;
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
