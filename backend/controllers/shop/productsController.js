
const productModel = require('../../models/productModel')

const getFilterProduct=async(req,res)=>{
     try {
        const {category=[],sortBy="price-lowtohigh"}=req.query
        let filters={};
        if(category.length){
            filters.category={$in:category.split(',')}


        }
        let sort={};
        switch (sortBy) {
            case "price-lowtohigh":
                sort.price=1
                
                break;
            case "price-hightolow":
                sort.price=-1
                
                break;
            case "title-atoz":
                sort.title=1
                break;
            case "title-ztoa":
                sort.title=-1
                break;
              
            default:
                sort.price=1
                break;
        }
        const products =await productModel.find(filters).sort(sort)
        res.status(200).json({
            success:true,
            data:products
        })
     } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'some error occurs in filterProduct'
        })
     }
}
const getProductDetails = async (req, res) => {
    try {
      const { id } = req.params;
  
      
      const product = await productModel.findById(id)
  
      // If product is not found, return 404
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      // If product is found, return it
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error(error);
  
      // Send 500 status code for server error
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  
module.exports={getFilterProduct,getProductDetails}