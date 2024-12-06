import { DialogContent } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import Commonform from '../common/form'
const initialFormData={
    status:''
}
function AdminOrderDetails() {
    const [formData,setFormData]=useState(initialFormData)
    function handleUpdateStatus(event){
        event.preventDefault();
    }
  return (
   <DialogContent className='sm:max-w-[600px]'>
        <div className="grid gap-6">
            <div className="grid gap-2 ">
                <div className="flex mt-6 items-center justify-between">
                    <p className='font-medium'>Order ID</p>
                    <Label>1234</Label>
                </div>

                <div className="flex mt-3 items-center justify-between">
                    <p className='font-medium'>Order Data</p>
                    <Label>1234</Label>
                </div>

                <div className="flex mt-6 items-center justify-between">
                    <p className='font-medium'>Order Price</p>
                    <Label>1234</Label>
                </div>

                <div className="flex mt-3 items-center justify-between">
                    <p className='font-medium'>Order Status</p>
                    <Label>in Progress</Label>
                </div>
            </div>
                <Separator/>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span>Product Name</span>
                                <span>$5052</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium"> Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>farzan</span>
                            <span>address</span>
                            <span>city</span>
                            <span>pincode</span>
                            <span>phone</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Commonform 
                    formControls={[
                        {
                            label:'Order Status',
                            name:'status',
                            componentType:'select',
                            options:[
                                {id:"inProcess",label:'In Process'},
                                {id:'delivered',label:'Delivered'},
                                {id:'pending',label:'Pending'},
                                {id:'rejected',label:'Rejected'},
                                {id:'inShipping',label:'In Shipping'},
                                ],
                            },
                    ]}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText='Update Order Status'
                    onSubmit={handleUpdateStatus}
                    />
                </div>
            
        </div>
   </DialogContent>
  )
}

export default AdminOrderDetails