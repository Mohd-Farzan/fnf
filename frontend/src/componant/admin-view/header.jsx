import { AlignJustify,LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useDispatch } from "react-redux"
import { LogoutUser } from "@/store/auth-slice"

function Adminheader({setOpen}) {
  const dispatch=useDispatch();
  function handleLogout(){
    dispatch(LogoutUser())
  }
  return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <Button onClick={()=>{setOpen(true)}}className='lg:hidden sm:block'>
      <AlignJustify/>
      <span className="sr-only">Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
      <Button onClick={()=>{handleLogout()}}className='inline-flex gap-2'>
        <LogOut/>
        logout
      </Button>
    </div>

  </header>
}

export default Adminheader