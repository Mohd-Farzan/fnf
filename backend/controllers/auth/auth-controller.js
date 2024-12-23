const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signupModel = require('../../models/SignupModel');
const loginModel = require('../../models/loginModel');

// Signup function
const signupUser = async (req, res) => {
    const { email,userName, age, password } = req.body;
    try {
        const userExist = await signupModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const saltRounds = 10;
        const hash_password = await bcrypt.hash(password, saltRounds);
        const newUser = new signupModel({
            email,
            userName,
            age,
            password: hash_password,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User account created successfully',
            user: newUser,
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Login function
const loginUser = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const checkUser = await loginModel.findOne({ email });
        if (!checkUser) {
            return res.json({ success: false, message: "User not doesn't exist please register first" });
        }

        const pswrdMatch = await bcrypt.compare(password, checkUser.password);
        if (!pswrdMatch) {
            return res.status(400).json({ success: false, message: "Invalid password please try again" });
        }

        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email,userName:checkUser.userName},
            'CLIENT_SECRET_KEY', 
             {expiresIn: '60m'} 
             

        );
    
        

        res.cookie('token', token, { httpOnly: true, secure: false})
        .json({
            success: true,
            message: 'Login successfull',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                token:checkUser.token,
                userName: checkUser.userName
            },
            // token,
        });
      
        console.log(token,'token');

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Logout function
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logout successful'
    });
};

// Authentication middleware
const AuthMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user'
        });
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;

        // If you want to send a response back with user info:
        res.status(200).json({
            success: true,
            user: decoded
        });
        // If this is a middleware that protects routes and doesn't send a response:
        // next(); // uncomment if needed for protected routes
    } catch (error) {
        console.error(error.stack);
        res.status(401).json({
            success: false,
            message: 'Unauthorized user!'
        });
    }
};



module.exports = { signupUser, loginUser, logoutUser, AuthMiddleware };
