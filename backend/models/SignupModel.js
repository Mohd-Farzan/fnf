const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    email:{
        type:String
    },
    userName:{
        type:String
    },
    age:{
        type:Number
    },
    role:{
        type:String,
        default:'user'
    },
    password:{
        type:String
    },
},{timestamps:true}
    
);
const signupModel=mongoose.model('users',userSchema)
module.exports= signupModel