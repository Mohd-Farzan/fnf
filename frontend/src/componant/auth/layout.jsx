import React from 'react'
import { Outlet } from 'react-router-dom'
import bgImg from '../../assets/img/login.jpg'
function Authlayout() {
  return (
    <div className='flex min-h-screen w-full'>
        <div className="hidden lg:flex items-center justify-center w-full bg-cover bg-center " style={{backgroundImage: `url(${bgImg})`}}>
            
        </div>
        <div className="flex items-center justify-center bg-zinc-900 w-full px-4 py-6 sm:px-6 lg:px-8" >
            <Outlet/>
        </div>
    </div>
  )
}

export default Authlayout