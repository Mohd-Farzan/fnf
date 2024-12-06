import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { ChartNoAxesCombined, LayoutDashboard,ShoppingCart} from 'lucide-react'
import React from 'react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

export const sidebarMenuItems=[
  {
      id:'dashboard',
      label:'dashboard',
      path:'/admin/dashboard',
      icon:<LayoutDashboard color='black'/>
  },
  {
      id:'products',
      label:'products',
      path:'/admin/product',
      icon:<ChartNoAxesCombined color='black'/>
  },
  {
      id:'orders',
      label:'orders',
      path:'/admin/order',
      icon:<ShoppingCart color='black'/>
  },
]

function MenuItems(){
  const navigate=useNavigate()
  return (
    <nav className='flex-col mt-8 flex gap-2 text-black'>
      {
        sidebarMenuItems.map(menuItem=><div key={menuItem.id} onClick={()=>navigate(menuItem.path)} className='flex items-center gap-2 rounded-md px-3 py-2'>
          {menuItem.icon}
        <span>{menuItem.label}</span>
        </div>)
      }
    </nav>
  )
}

function Adminsidebar({open,setOpen}) {
  const navigate=useNavigate()
  return (
    <Fragment>
      <Sheet open={open}onOpenChange={setOpen}>
        <SheetContent side='left'className='w-64'>
          <div className="flex flex-col h-full"> 
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2 mt-5 mb-5'>
              <ChartNoAxesCombined color='black'size={30}/>
                Admin Panel
              </SheetTitle>

            </SheetHeader>
            <MenuItems/>
          </div>

        </SheetContent>

      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=>navigate('/admin/dashboard')} className="flex items-center gap-2">
          
        <ChartNoAxesCombined color='black'size={30}/>
          <h1 className='text-xl font-extrabold text-black'>Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default Adminsidebar