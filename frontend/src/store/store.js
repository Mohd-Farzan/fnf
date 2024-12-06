
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
import AdminProductSlice from './admin/product-slice'
import ShopProductSlice from './shop/products-slice'
import ShopingCartSlice from './shop/cart-slice'
import ShopAddressSlice from './shop/address-slice'
import shoppingOrderSlice from './shop/order-slice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:AdminProductSlice,
        ShopProducts:ShopProductSlice,
        ShopingCart:ShopingCartSlice,
        ShopAddress:ShopAddressSlice,
        shoppingOrder:shoppingOrderSlice
        
    },
});
export default store;