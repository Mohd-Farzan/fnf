const express=require('express')
const {addToCart,fetchCart,updateCart,deleteCart}=require('../../controllers/shop/cart-controller')
const router=express.Router();
router.post('/add',addToCart);
router.get('/get/:userId',fetchCart);
router.put('/update-cart',updateCart);
router.delete('/delete/:userId/:productId',deleteCart);
module.exports=router