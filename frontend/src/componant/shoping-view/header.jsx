import { House, SquareMenu, ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { shopingHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"; // Ensure DropdownMenuContent is imported
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "@/store/auth-slice";
import {LogOut } from "lucide-react"
import CartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCart } from "@/store/shop/cart-slice";
import { Label } from "@/components/ui/label";


function MenuItems() {
  const navigate=useNavigate();
  function handleNavigate(getCurrentMenuITem){
    sessionStorage.removeItem('filters');
    const currentFilter=getCurrentMenuITem.id!=='home'?{
      category:[getCurrentMenuITem.id]
    }:null
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(getCurrentMenuITem.path)
  }
  return (
    <nav className="flex flex-col lg:mb-0 items-center gap-6 lg:flex-row">
      {shopingHeaderMenuItems.map(menuItem => (
        <Label onClick={()=>handleNavigate(menuItem)}className='text-sm font-bold cursor-pointer' key={menuItem.id}>
          {menuItem.lable}
        </Label >
      ))}
    </nav>
  );
}

function HeaderRight() {
  const { user } = useSelector((state) => state.auth);
  const{cartItems}=useSelector((state)=>state.ShopingCart)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const[openCartSheet,setOpenCartSheet]=useState(false);

  function handleLogout(){
    dispatch(LogoutUser())
  }
  useEffect(()=>{
    dispatch(fetchCart(user?.id))
    
  },[dispatch])
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
      <Button  onClick={()=>setOpenCartSheet(true)}variant='outline' size='icon'>
        <ShoppingCart  className="h-6 w-6 my-8" />
        <span className="sr-only">Add to Cart</span>
      </Button>
      <CartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0? cartItems.items:[]}/>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-zinc-500'>
            <AvatarFallback className='bg-zinc-900 text-white font-extrabold'>
              {user?.userName ? user.userName[0].toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Add dropdown menu items here */}
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>Account</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate('/shop/settings')}>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{handleLogout()}}> <LogOut/>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShopingHeader(){
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to='/shop/home' className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size='icon' className='lg:hidden'>
              <SquareMenu className='h-6 w-6' />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-full max-w-xs'> {/* Corrected mx-w-xs to max-w-xs */}
            <MenuItems />
            <HeaderRight/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
          <div className="hidden lg:block">
            <HeaderRight />
          </div>
  
      </div>
    </header>
  );
}

export default ShopingHeader;
