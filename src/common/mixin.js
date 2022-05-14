import { debounce } from './utils';
import BackTop from 'components/content/backTop/BackTop';
export const itemListenerMixin = {
    data() {
        return {
            imgListener: null
        };
    },
    mounted() {
        // 1.图片加载完成的事件监听
        // refresh加载完成，准备调用return的function
        const refresh = debounce(this.$refs.scroll.refreshScroll, 200);
        // 封装即将被调用的函数
        this.imgListener = () => {
            refresh();
        };
        // 每次图片被激活，只要在时限之内就会被反复触发防抖(基于闭包，timer会被不断刷新)
        this.$bus.$on('itemImageLoad', this.imgListener);
        // 2.获取tabControl的offSetTop
        // 组件无法获取offsetTop，只能通过获取组件里面元素的offsetTop来获取到顶部的高度
        // 所有的组件都有一个$el属性：专门用于获取组件中的元素
        // 在mounted的过程中，图片不一定加载完成，
        // 所以直接获取组件的DOM元素组件的offsetTop是不对的
        // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
};

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            scrollControl: false
        };
    },
    methods: {
        backClick() {
            //   回到顶部
            this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 600);
        }
    }
};
