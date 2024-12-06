const express=require('express')
const { createOrder, capturePayment } = require('../../controllers/shop/orderController')
const router=express.Router()
router.post('/create',createOrder)
router.post('/capture',capturePayment)
module.exports=router