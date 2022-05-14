import Vue from 'vue';
import Vuex from 'vuex';
import mutations from '@/store/mutations';
import actions from '@/store/actions';
import getters from './getters';
// 1.安装插件
Vue.use(Vuex);
const state = {
    cartList: []
};
// 2.创建store对象
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    /*     mutations: {
        // 修改state中的状态
        // mutations之中每个方法尽可能完成的事情比较单一
    } */
    actions
});

// 3.挂载实例
export default store;
