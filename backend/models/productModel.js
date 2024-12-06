const mongoose=require('mongoose')
const productsSchema= new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    price:Number,
    salePrice:Number,
    totalStock:Number

},{timestamps:true}
    
);
const productModel=mongoose.model('product',productsSchema)
module.exports= productModel