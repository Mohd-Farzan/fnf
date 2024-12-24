import {Routes , Route,useNavigate, Navigate} from 'react-router-dom';
import AuthSignup from './pages/auth/Signup';
import AuthLogin from './pages/auth/Login';
import Authlayout from './componant/auth/layout';
import Adminlayout from './componant/admin-view/layout';
import Admindashboard from './pages/admin-view/dashboard';
import Adminproduct from './pages/admin-view/product';
import Adminorder from './pages/admin-view/order';
import Shoplayout from './componant/shoping-view/layout';
// import ShopingAcount from './componant/shoping-view/address';
import ShopingCheackout from './pages/shoping-view/checkout';
import ShopingList from './pages/shoping-view/list';

import CheckAuth from './componant/common/checkauth';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from './store/auth-slice';
import React, { useEffect } from 'react';
import ShopingHome from './pages/shoping-view/home';
import ShopAccount from './pages/shoping-view/account';
// import PaypalCancel from './pages/shoping-view/paypalCancel';
import PaypalReturn from './pages/shoping-view/paypalReturn';
function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, user,  } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    },[dispatch]);
     
     

  return (
    <div className=' flex overflow-hidden w-full bg-slate-400'>
      
      <Routes>
                    <Route path='/auth' element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <Authlayout />
                        </CheckAuth>
                    }>
                        <Route path='login' element={<AuthLogin />} />
                        <Route path='signup' element={<AuthSignup />} />
                    </Route>

                    <Route path='/admin' element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <Adminlayout />
                        </CheckAuth>
                    }>
                        <Route path='dashboard' element={<Admindashboard />} />
                        <Route path='product' element={<Adminproduct />} />
                        <Route path='order' element={<Adminorder />} />
                    </Route>

                    <Route path='/shop' element={
                        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                            <Shoplayout />
                        </CheckAuth>
                    }>
                        <Route path='home' element={<ShopingHome/>} />
                        <Route path='account' element={<ShopAccount />} />
                        <Route path='checkout' element={<ShopingCheackout />} />
                        <Route path='list' element={<ShopingList />} />
                        <Route path='paypal-return' element={<PaypalReturn/>}/>
                        
                    </Route>
                </Routes>
     
    </div>
  )
  
}

export default App
