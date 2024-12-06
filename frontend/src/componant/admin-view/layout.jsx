import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import Adminheader from './header'

function Adminlayout() {
  const[openSidebar,setOpenSidbar]=useState(false)
  return (
    <div className="flex min-h-screen w-full text-white">
        <Adminsidebar open={openSidebar} setOpen={setOpenSidbar}/>
        <div className="flex flex-1 w-full flex-col">
            <Adminheader setOpen={setOpenSidbar}/>
            <main className='flex-1 flex-col bg-muted/40 p/4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Adminlayout