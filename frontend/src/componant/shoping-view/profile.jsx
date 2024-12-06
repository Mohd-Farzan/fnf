import React, { useState } from 'react'
import Commonform from '../common/form'
import { useSelector } from 'react-redux'
import { registerFormControls } from '@/config'

function Profile() {
  const{user}=useSelector((state)=>state.auth)
  const initialState={
      email:user?.email,
      userName:user?.userName,
      age:user?.age,
      password:user?.password
      
  }
    const[FormData,setFormData]=useState(initialState)
    function onSubmit(data){
      console.log(data,'dsghjgb')
    }
  return <div className="flex items-center justify-center gap-2 bg-yellow-200">
    <div className="flex cols-1 flex-col">
        <Commonform
        formControls={registerFormControls}
        formData={FormData}
        setFormData={setFormData}
        onSubmit={onSubmit}

        />
    </div>
  </div>
}

export default Profile