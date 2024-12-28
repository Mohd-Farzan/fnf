import Commonform from '@/componant/common/form'; // Fixed typo: 'componant' -> 'components'
import { loginFormControls } from '@/config';
import { LoginUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast if you are using react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are imported

const initialState = {
  email: '',
  password: '',
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    console.log("Form data being sent:", formData);
    dispatch(LoginUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          alert('login successfull!') // Success message
          setTimeout(() => navigate('/shop/home'), 1500); // Added '/' to navigate path
        } else {
          alert('wrong credentials') // Error handling
          // console.log('login failed')
        }
      })
      .catch(() => {
        toast.error("An error occurred"); // Handle any unexpected errors
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-white shadow-sm">Sign In</h1>
      </div>
      <Commonform
        formControls={loginFormControls}
        buttonText={'Login'} // Changed 'sign Up' to 'Sign In'
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        
      />
      <p className='text-slate-200'>Don't have an account ? 
        <Link className='font-medium text-primary text-slate-300  hover:underline' to='/auth/signup'> Create an account</Link>
      </p>
    </div>
  );
}

export default AuthLogin;
