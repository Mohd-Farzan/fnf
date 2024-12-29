import React from 'react'
import slide2 from '../../assets/img/slide_2.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/componant/shoping-view/orders'
import Address from '@/componant/shoping-view/address'
import ShoppingOrders from '@/componant/shoping-view/orders'
import Profile from '@/componant/shoping-view/profile'
function ShopAccount() {
  return <div className="flex flex-col">
    <div className="relative h-[300px] w-full overflow-hidden">
        <img
        src={slide2}
        className='w-full h-full object-cover object-center'
        />
    </div>
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background py-6 shadow-sm ">
            <Tabs defaultValue='orders'>
                <TabsList>
                    <TabsTrigger value='orders'>Orders</TabsTrigger>
                    <TabsTrigger value='address'>Address</TabsTrigger>
                    <TabsTrigger value='profile'>Profile</TabsTrigger>
                </TabsList>
                <TabsContent value='orders'>
                    <ShoppingOrders/>
                </TabsContent>

                <TabsContent value='address'>
                    <Address/>
                </TabsContent>
                <TabsContent value='profile'>
                    <Profile/>
                </TabsContent>

            </Tabs>
        </div>
    </div>
  </div>
    
}

export default ShopAccount