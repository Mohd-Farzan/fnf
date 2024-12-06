const { ImageUploadUtils } = require('../../helpers/cloudinary');
const productModel = require('../../models/productModel');

const handleImageUpload = async (req, res) => {
    try {
        // Convert the image buffer to a base64 string
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        // Create a data URL for the image
        const url = "data:" + req.file.mimetype + ";base64," + b64;  // Fixed missing colon

        // Call the utility function to upload the image
        const result = await ImageUploadUtils(url);

        // Return the result to the client
        res.json({
            success: true,
            result
        });

    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while uploading the image'
        });
    }
};

//add new product 
const AddProduct=async(req,res)=>{
    try {
        const{image,title,description,category,price,salePrice,totalStock}=req.body
        const newProduct=new productModel({
            image,title,description,category,price,salePrice,totalStock
        })
        await newProduct.save();
        res.status(201).json({
            success:true,
            message:'product created successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:'error occur in product',
            data:newProduct
        });
    }
}

// fatching products

const FatchProduct=async(req,res)=>{
    try {
        const listOfproduct=await productModel.find();
        res.status(200).json({
            success:true,
            message:'fatching data succes',
            data:listOfproduct
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error occureds in fatching product"})
    }
}

//delete product
const DeleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const deletedProduct=await productModel.findByIdAndDelete(id)
        if(!deletedProduct) return res.status(404).json({
            success:false,
            message:'not found product'
        })
        res.status(200).json({
            success:true,
            message:'deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error occureds in fatching product"})
    }
}

// update product

const EditProduct=async(req,res)=>{
    try {
        const { id } = req.params;
        const{title,description,category,price,salePrice,totalStock}=req.body
        const findProduct= await productModel.findById(id);
        if(!findProduct) return res.status(404).json({
            success:false,
            message:'product not found'
        })
        findProduct.title=title || findProduct.title
        findProduct.description=description|| findProduct.description
        findProduct.category=category || findProduct.category
        findProduct.price=price || findProduct.price
        findProduct.salePrice=salePrice|| findProduct.salePrice
        findProduct.totalStock=totalStock || findProduct.totalStock
        await findProduct.save();
        res.status(200).json({
            success:true,
            message:'passess data',
            data:findProduct
        })
        // console.log(findProduct)

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error occureds in editing product"})
    }
}

module.exports = { handleImageUpload ,AddProduct,FatchProduct,EditProduct,DeleteProduct};
