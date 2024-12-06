import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import Commonform from '../common/form'
import { useState } from 'react'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, editAddress, fetchAddress } from '@/store/shop/address-slice'
import AddressCart from './address-cart'
const initialAddressFormData={
  address:'',
  city:'',
  phone:'',
  pincode:''
}
function Address({setCurrentSelectedAddress}) {
  const[formData,setFormData]=useState(initialAddressFormData)
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth);
  const {addressList}=useSelector((state)=>state.ShopAddress);
  const[currentEditedId,setCurrentEditedId]=useState(null)
  function handleManageAddress(event){

    event.preventDefault()
    // console.log(addressInfo?._id,"addressId")
    if(addressList.length>=3 && currentEditedId===null){
      setFormData(initialAddressFormData)
      alert('you can add max 3 addresses only')
      return ;
    }
    currentEditedId!==null?
    dispatch(editAddress({userId:user?.id,addressId:currentEditedId,formData})).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAddress(user?.id))
        setCurrentEditedId(null)
        setFormData(initialAddressFormData)
        alert('address updated ')
      }
    }):
    dispatch(addAddress({
      ...formData,
      userId:user?.id
    })).then(data=>{
      
      if(data?.payload?.success){
        dispatch(fetchAddress(user?.id))
       
        setFormData(initialAddressFormData)
          
      }
    })
  }
  function handleEditAddress(addressInfo){
  setCurrentEditedId(addressInfo._id)
  // console.log(addressId)
  setFormData({
    ...formData,
    address:addressInfo?.address,
    city:addressInfo?.city,
    phone:addressInfo?.phone,
    pincode:addressInfo?.pincode
  })
  }
  function handleDeleteAddress(addressInfo){
    // console.log('deleted address addresId is',addressId)
    dispatch(deleteAddress({userId:user?.id, addressId:addressInfo?._id})).then(data=>{
      if(data?.payload?.success){
        
        dispatch(fetchAddress(user?.id))
        alert('address deleted successfully')
      }
    })
   
  }
  useEffect(()=>{
    dispatch(fetchAddress(user?.id))
  },[dispatch])
 
 
  return (
    
  <Card className='bg-slate-500'>
    
    <CardHeader>
      <CardTitle>
        {currentEditedId!==null?"Edit Address":"Add New Address"}</CardTitle>
    </CardHeader>
    <CardContent className='space-y-3'>
      <Commonform
      
      formControls={addressFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={currentEditedId!==null?"Edit Address":"Add New Address"}
      onSubmit={handleManageAddress}
    


      />
    </CardContent>
    <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded ">
      {
        addressList && addressList.length > 0 ?
        addressList.map(singleAddressItem=>(<AddressCart  
          handleDeleteAddress={handleDeleteAddress}
          handleEditAddress={handleEditAddress}
          key={singleAddressItem._id}
          addressInfo={singleAddressItem}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          />))
          
          
        : <p>No Address Availble . Please Add New Address</p>
        
      }
    </div>  
  
  </Card>
  
 
  )

}

export default Address