import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'

function AddressCart({addressInfo, handleEditAddress,handleDeleteAddress ,setCurrentSelectedAddress}) {
  return (
   <Card className='bg-slate-300' onClick={ setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo):null}>
    <CardContent className='grid p-4 gap-4 '>
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
    </CardContent>
    <CardFooter className='flex p-2 gap-2'>
      <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
      <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
    </CardFooter>
   </Card>
  )
}

export default AddressCart