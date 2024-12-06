const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
    
    email:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    },
    password:{
        type:String
    },
    userName:{
        type:String
    }
},{timestamps:true}
    
);
const loginModel=mongoose.model('user',userSchema)
module.exports= loginModel