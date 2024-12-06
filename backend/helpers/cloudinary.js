const cloudinary=require('cloudinary').v2;
const multer=require('multer');
cloudinary.config({
    cloud_name:'dosn9lzft',
    api_key:'325789311873754',
    api_secret:'yEmYGXAqD-LQ0PZA08Jpn5EOVEs'
});
const storage=new multer.memoryStorage();
async function ImageUploadUtils(file){
 const result = await cloudinary.uploader.upload(file,{
    resource_type:'auto'
 })
 return result
}
const upload=multer({storage});
module.exports={upload,ImageUploadUtils}