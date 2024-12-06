const mongoose=require('mongoose')
const cartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
   items:[
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            require:true
        },
        quantity:{
            type:Number,
            require:true,
            min:1
        }
    }
   ]
}, {timestamps:true})
const cartModel=mongoose.model('Cart',cartSchema)
module.exports=cartModel
