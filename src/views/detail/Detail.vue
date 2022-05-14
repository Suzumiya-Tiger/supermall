<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @backToContent="backToContent"
      ref="nav"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top
      @click.native="backClick"
      v-show="scrollControl"
      :pull-up-load="true"
    />
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script type="text/ecmascript-6">
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from '@/views/detail/childComps/DetailSwiper';
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import { debounce } from 'common/utils';
import { itemListenerMixin, backTopMixin } from 'common/mixin';

import { mapActions } from 'vuex';
// import Toast from '../../components/common/toast/Toast.vue';
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    // Toast
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],

      getThemeTopY: null,
      currentIndex: 0

      /*       message: '',
      show: false */
    };
  },
  created() {
    // this.$route当前路由，params即为当前路由的参数
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (parseInt(data.rate.cRate)) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {
    // 1.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 50);
  },

  beforeDestroy() {
    this.$bus.$off('itemImageLoad', this.imgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      // 1.获取购物车需要展示的信息
      let product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加至购物车中
      // this.$store.commit('addCart', product);
      // this.$store.dispatch('addCart', product).then(res => console.log(res));
      this.addCart(product).then(res => {
        this.$toast.showMsg(res, 2000);
      });
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y;
      // 2.positionY和主题值做对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 回到顶部
      this.scrollControl = Math.abs(positionY) > 1000 ? true : false;
    },
    imageLoad() {
      this.$refs.scroll.refreshScroll();
      this.getThemeTopY();
      return true;
    },
    backToContent(index) {
      return new Promise(resolve => {
        resolve(this.imageLoad());
      }).then(res => {
        if (res) {
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#detail {
  touch-action: pan-y; // 个人推荐
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
