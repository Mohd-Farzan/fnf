const express = require('express');
const {handleImageUpload, AddProduct, EditProduct, FatchProduct, DeleteProduct} = require('../../controllers/admin/productsController');
const {upload}=require('../../helpers/cloudinary');


const router = express.Router();

router.post('/upload', upload.single("my_file"),handleImageUpload);
router.post('/add',AddProduct);
router.get('/get',FatchProduct);
router.put('/edit/:id',EditProduct);
router.delete('/delete/:id',DeleteProduct);


module.exports = router;
