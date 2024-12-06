const cartModel = require("../../models/cartModel");
const productModel=require('../../models/productModel');
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if(!userId || !productId || quantity<=0){
        return res.status(400).json({
            success:false,
            message:'invalid data provided'
        })
    }

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //     return res.status(400).json({ success: false, message: 'Invalid product ID' });
    // }
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).json({ success: false, message: 'Invalid user ID' });
    // }

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
       
        let cart = await cartModel.findOne({ userId });
        
        // Create new cart if none exists
        if (!cart) {
            cart = new cartModel({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if product already exists in cart
        } else {
            cart.items.push({ productId, quantity }); // Add new item to cart
        }

        await cart.save();
        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while adding to cart'
        });
    }
};



const fetchCart = async (req, res) => {
    try {
        const { userId} = req.params; 
        // console.log(userId,'userID')
        if(!userId){
            return res.status(400).json({
                success:false,
                message:'invalid user id'
            })
        }
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Invalid userId format',
        //     });
        // }
        const cart = await cartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });
        
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }
        const validCartItems=cart.items.filter(productItem=>productItem.productId)
        if(validCartItems.length<cart.items.length){
            cart.items=validCartItems
            await cart.save() 
        }
        // const validCartItems = cart.items.filter(item => item.productId !== null);
        const populatedCartItems = validCartItems.map(item => ({
            productId:item.productId._id,
            image:item.productId.image,
            title:item.productId.title,
            price:item.productId.price,
            salePrice:item.productId.salePrice,
            quantity: item.quantity
        }));
        
        
        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

  

  const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate input data
        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided"
            });
        }

        // Find the cart for the given userId
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        // Find the index of the product in the cart
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not present'
            });
        }

        // Update the quantity of the product
        cart.items[findCurrentProductIndex].quantity = quantity;

        // Save the updated cart
        await cart.save();

        // Populate the cart items with product details
        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        // Map the cart items to the desired format
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        // Return the updated cart
        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while updating the cart'
        });
    }
}


const deleteCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const cart = await cartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        // Remove item from the cart
        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

        // Save the updated cart
        await cart.save();

        const populatedCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populatedCartItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting cart item',
        });
    }
};


module.exports={addToCart,fetchCart,updateCart,deleteCart};
