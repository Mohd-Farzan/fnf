import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCart, updateCart } from "@/store/shop/cart-slice";

function CartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  
  const dispatch=useDispatch();
  if (!cartItem) {
    return null; // or some fallback UI
  }
  useEffect(()=>{
    dispatch(fetchCart(user?.id))
   
  },[dispatch])
  function handleDeleteCart(getCartItem){
    dispatch(deleteCart({userId:user?.id,productId:getCartItem?.productId}))
   
 
   
  }
  function handleUpdateQuantity(getCartItem,typeOfAction){
    console.log(getCartItem)
    console.log(typeOfAction)
    dispatch(updateCart({userId:user?.id,productId:getCartItem?.productId,quantity:
      
      typeOfAction==='plus'?cartItem?.quantity+1:getCartItem?.quantity-1
      })).then(data=>{
        if(data?.payload?.success){
          alert('product updated')
        }
      })

  }
  // function handleMinusBtn(getCartItem,typeOfAction){
  //   dispatch(updateCart({userID:user?.id, productId:getCartItem?.productId,quantity:
  //     typeOfAction==='minus'?cartItem?.quantity-1:getCartItem?.quantity+1

  //   })).then(data=>{
  //     if(data?.payload?.success){
  //       alert('product updated')
  //     }
  //   })
  // }

  return (
    <div className="cart-item">
      <img src={cartItem.image} alt={cartItem.title} className="w-20 h-20 rounded object-cover" />

      <div className="flex-1">
        <h3 className='font-extrabold'>{cartItem.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button variant='outliine' className='w-8 h-8 rounded-full' size='icon'>
            <Plus 
              onClick={() => handleUpdateQuantity(cartItem,'plus')} 
              className="w-4 h-4" 
            />
            </Button>

              <span>{cartItem?.quantity}</span>
            <Button variant='outliine'
             className='w-8 h-8 rounded-full' 
             size='icon'
             disabled={cartItem?.quantity===1}
             onClick={() => handleUpdateQuantity(cartItem,'minus')} 
             >
              
            <Minus
              className="w-4 h-4" 
              disable={cartItem?.quantity==1}
            />
            </Button>
          </div>
      </div>
      <div className="flex flex-col items-end ">
        <p className='font-semibold'>${((cartItem?.salePrice > 0 ? cartItem?.salePrice: cartItem?.price)*cartItem?.quantity).toFixed(2)}.</p>
        <Trash  onClick={()=>handleDeleteCart(cartItem)}className='cursor-pointer mt-1' size={20}/>
      </div>
    </div>
  );
}

export default CartItemsContent;
