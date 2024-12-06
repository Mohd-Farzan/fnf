import React from 'react'
import ShopingHeader from './header'
import { Outlet } from 'react-router-dom'

function Shoplayout() {
  return (
    <div className=" flex min-h-screen w-full">
      {/* <ShopingSidebar/> */}
      <div className="flex flex-1 w-full flex-col">
        <ShopingHeader/>
        <main className='flex-1 flex-col bg-muted/40 p/4 md:p-6'>
          <Outlet/>
        </main>
    </div>
  </div>

    
  )
}

export default Shoplayout