
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toast } from './components/ui/toast.jsx'
import { ToastProvider } from '@radix-ui/react-toast'
// import { toast } from 'react-toastify'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Provider store={store}>
   <App />
   {/* <toast/> */}
   <ToastProvider>
   <Toast/>
   </ToastProvider>
   
  </Provider>
 </BrowserRouter>

)
