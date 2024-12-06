import Commonform from '@/componant/common/form';
import { registerFormControls } from '@/config';
import { SignupUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  age: '',
  password: '',
};

function AuthSignup() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    // console.log("Form data being sent:", formData);
    dispatch(SignupUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success('successfully signup')
        setTimeout(() => navigate('/auth/login'), 1500);
      } else {
        toast.error(data.payload?.message || "Signup failed!");
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-slate-200">Sign Up</h1>
      </div>
      <Commonform
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className='text-slate-200'>
        Already have an account?{' '}
        <Link className="font-extrabold text-slate-300 text-primary hover:underline" to="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default AuthSignup;
