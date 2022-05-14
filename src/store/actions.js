import { ADD_COUNTER, ADD_TO_CART } from './mutation-types';

export default {
    // 复杂操作在actions里面完成，将简单的加减交给Mutations
    addCart(context, payload) {
        return new Promise(resolve => {
            let oldProduct = context.state.cartList.find(item => {
                return item.iid === payload.iid;
            });
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct);
                resolve('当前的商品数量+1');
            } else {
                payload.count = 1;
                // state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve('添加了新的商品');
            }
        });
    }
};
