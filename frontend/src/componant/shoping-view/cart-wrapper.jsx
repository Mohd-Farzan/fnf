import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import CartItemsContent from './cart-items-content'
import { useNavigate } from 'react-router-dom'


function CartWrapper({cartItems,setOpenCartSheet}) {
  
const navigate=useNavigate()
const  totalCartAmount=cartItems && cartItems.length >0 ?cartItems.reduce(
  (sum,currentItem)=> sum + 
  (
    currentItem.length > 0 ? currentItem?.salePrice :currentItem?.price )*currentItem?.quantity, 0):0;
  


  return <SheetContent className='sm:max-w-md'>
    <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>
    <div className="mt-8 space-y-4 max-h-96 overflow-y-auto">
    {
  cartItems && cartItems.length > 0 ? 
  cartItems.map(item => <CartItemsContent cartItem={item} key={item?.id}  />) : <p>Your Cart Is Empty</p>
  
  
}


      
    </div>
    <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
            <span className='font-bold'>Total</span>
            <span className='font-bold'>${totalCartAmount}
            </span>
        </div>
    </div>
        <Button onClick={()=>{
          navigate('/shop/checkout');
          setOpenCartSheet(false);
          }}className='w-full mt-5'>Checkout</Button>
    
  </SheetContent>
}

export default CartWrapper