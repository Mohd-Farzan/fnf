import ProductImageUpload from "@/componant/admin-view/imageUpload";
import Commonform from '@/componant/common/form';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFromElement } from "@/config";
import { addNewProduct, deleteProduct, editProduct, FathcAllProduct } from "@/store/admin/product-slice";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProductTile from "@/componant/admin-view/product-tile"; // Ensure this component exists


function Adminproduct() {
  const initialFormData = {
    image: '',
    title: '',
    description: '',
    category: '',
    brand: '',
    price: "",
    salePrice: '',
    totalStock: '',
  };

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [UploadedImageUrl, setUploadedImageUrl] = useState('');
  const [ImageLoadingState, SetImageLoadingstate] = useState(false);
  const { productList } = useSelector(state => state.adminProducts);
  const [currentEditedId,setCurrenteditedId]=useState()
  const dispatch = useDispatch();
  // const { toast } = useToast();  // Using ShadCN toast

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !==null?
    dispatch(editProduct({
      id: currentEditedId, // Pass the correct ID
      formData 
      
    }))
    .then((data)=>{
      // console.log(data);
      if (data?.payload?.success) {
        dispatch(FathcAllProduct());
        setFormData(initialFormData);
        setOpenCreateProduct(false); // Close the modal
        setCurrenteditedId(null);
      }
    }):
    dispatch(addNewProduct({
      ...formData,
      image: UploadedImageUrl
    }))
    .then((data) => {
      if (data?.payload?.success) {
        dispatch(FathcAllProduct()); // Ensure this dispatch updates the productList
        setOpenCreateProduct(false);
        setImageFile(null);
        setFormData(initialFormData);

        // Show success toast notification using ShadCN
      }
    });
  }

  useEffect(() => {
    dispatch(FathcAllProduct()); // Fetch products on component mount
  }, [dispatch]);

  console.log(productList, UploadedImageUrl, "FormData");
  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(FathcAllProduct())
      }
    })
  }
  return (
      <Fragment>
        <div className="mb-5 flex w-full justify-end">
          <Button onClick={() => setOpenCreateProduct(true)}>Add New Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {
            productList && productList.length > 0 ? 
            productList.map(productItem => <AdminProductTile setFormData={setFormData}
               setOpenCreateProduct={setOpenCreateProduct}
               setCurrenteditedId={setCurrenteditedId}
               product={productItem}
               handleDelete={handleDelete}/>):null
          }
        </div>
        <Sheet open={openCreateProduct} onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrenteditedId(null)
          setFormData(initialFormData)
        }}>
          <SheetContent side='right' className='overflow-auto'>
            <SheetHeader>
              <SheetTitle>{currentEditedId !== null ? "Edit The Product": "Add The Product"}</SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              UploadedImageUrl={UploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              ImageLoadingState={ImageLoadingState}
              SetImageLoadingstate={SetImageLoadingstate}
              isEditMode={currentEditedId!==null}
            />
            <div>
              <Commonform
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                formControls={addProductFromElement}
                buttonText={currentEditedId ==null? "ADD":"Edit"}
              />
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
  );
}

export default Adminproduct;
