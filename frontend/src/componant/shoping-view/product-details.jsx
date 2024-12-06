import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { addToCartItems, fetchCart } from '@/store/shop/cart-slice';
import { fetchProductDetails, setProductDetails } from '@/store/shop/products-slice';
import { StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
 
  const [feedback, setFeedback] = useState(''); // State for feedback input

  useEffect(()=>{
    if(user?.id){
      dispatch(fetchProductDetails(user?.id))
    }
  },[dispatch]);
   
    
  

  function handleAddToCart(productId) {
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }

    dispatch(addToCartItems({ userId: user.id, productId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          console.log(data, 'data');
          dispatch(fetchCart(user?.id));
          alert('Product added to cart');
        } else {
          console.error('Failed to add item to cart');
          alert('Failed to add product to cart');
        }
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  function handleFeedbackChange(e) {
    setFeedback(e.target.value);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[80vw] sm:max-w-[70vw] lg:max-w-[60vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <div>
            <h1 className="text-4xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mt-4 mb-5">{productDetails?.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-2xl font-bold text-primary ${productDetails?.price > 0 ? 'line-through' : ''}`}>
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-xl font-bold text-muted-foreground">${productDetails?.salePrice}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-4 fill-primary" />
              <StarIcon className="w-5 h-4 fill-primary" />
              <StarIcon className="w-5 h-4 fill-primary" />
              <StarIcon className="w-5 h-4 fill-primary" />
              <StarIcon className="w-5 h-4 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            <Button onClick={() => handleAddToCart(productDetails?._id)} className="w-full">
              Add To Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2>Reviews</h2>
            <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>userprofile</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold">userName</h2>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-4 fill-primary" />
                      <StarIcon className="w-5 h-4 fill-primary" />
                      <StarIcon className="w-5 h-4 fill-primary" />
                      <StarIcon className="w-5 h-4 fill-primary" />
                      <StarIcon className="w-5 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">This is awesome</p>
                  </div>
                </div>
              
            </div>
            <div className="mt-6 flex gap-4">
              <Input
                className="text-bold border-zinc-700"
                placeholder="Give Feedback"
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
