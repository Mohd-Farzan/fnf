const AddressModel = require("../../models/Address");

const addAddress=async(req,res)=>{
    try {
        const {userId,address,pincode,phone,city}= req.body;
        if(!userId || !address || !pincode || !phone || !city){
            return res.status(400).json({
                success:false,
                message:'invalide data provided'
            })
        }
        const newAddress= new AddressModel({
            userId,address,pincode,phone,city
        })
        await newAddress.save();
        return res.status(200).json({
            success:true,
            data:newAddress
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"invalide address"
        })
    }
}

const fetchAddress=async(req,res)=>{
    try {
        const {userId}=req.params
       
        if(!userId){
            return res.status(404).json({
                success:false,
                message:'address not found'
            })
        }
        const addressList= await AddressModel.find({userId})
        res.status(200).json({
            success:true,
            data:addressList
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"invalide address"
        })
    }
}

const editAddress=async(req,res)=>{
    try {
        const {userId,addressId}=req.params;
        const formData=req.body
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:'userId is require'
            })
        }
        const address=await AddressModel.findOneAndUpdate({_id:addressId,userId},formData,{new:true})
        if(!address){
            res.status(404).json({
                success:false,
                message:'address not found'
            })
        }
        res.status(200).json({
            success:true,
            data:address
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"invalid address"
        })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        
        // Check if userId and addressId are provided
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'userId and addressId are required'
            });
        }

        // Find and delete the address
        const address = await AddressModel.findOneAndDelete({ userId,_id:addressId});
        
        // If address not found, return 404
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Successfully deleted
        return res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        });

    } catch (error) {
        console.log(error);
        // Handle any server errors
        return res.status(500).json({
            success: false,
            message: 'Invalid address'
        });
    }
};

module.exports={addAddress,editAddress,fetchAddress,deleteAddress}