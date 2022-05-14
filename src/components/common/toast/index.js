import Toast from '@/components/common/toast/Toast';

const obj = {};
obj.install = function (Vue) {
    // document.body.appendChild(Toast.$el);
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast);
    // 2.通过new的方式，根据组件构造器，来创造一个组件对象
    const toast = new toastConstructor();
    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el);

    // 加入Vue的原型链来调用
    Vue.prototype.$toast = toast;
};
export default obj;
