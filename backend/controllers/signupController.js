import signupModel from "../models/SignupModel.js";
import bcrypt from 'bcryptjs'

const signupUser = async (req, res) => {
    try {
        const {email,name,age,password } = req.body;
        const userExist=await signupModel.findOne({email});
        if(userExist){
            return res.status(400).json({success:false,message:"email already exist"})
        }
        const saltaround=10;
        const hash_password=await bcrypt.hash(password,saltaround);
        const NewUser = new signupModel({
            name,
            email,
            age,
            password:hash_password
        });

        await NewUser.save();
        res.status(200).json({
            success: true,
            message: 'User account created  successfully',
            NewUser,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};