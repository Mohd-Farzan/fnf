const mongoose=require('mongoose');
const AddressSchema=new mongoose.Schema(
    {
        userId:String,
        address:String,
        pincode:Number,
        phone:Number,
        city:String
    },
    {timestamps:true}
);
const AddressModel=mongoose.model('Address',AddressSchema)
module.exports=AddressModel