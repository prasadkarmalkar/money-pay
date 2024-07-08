import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function SignUp() {
    const [userForm, setUserForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleFieldChange = (e) => {
        setUserForm({...userForm, [e.target.id]: e.target.value});
    }

    const signUpUser = async (e) =>{
        e.preventDefault();
        fetch( `${import.meta.env.VITE_SERVER_URL}api/v1/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm),
        } ).then( async request => {
            const response = await request.json();
            if( request.status === 201 ) {
                alert( 'User created successfully' );
                localStorage.setItem('auth_key', response.token);
                setUserForm({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    confirmPassword: '',
                })
                navigate('/');
            } else {
                alert('Something went wrong');
            }
            
        } ).catch((e)=>{
            console.log(e);
        })   
    }


  return (
    <form className="mt-8" onSubmit={signUpUser} method="post">
    <div className="mb-5">
      <label
        className="block text-sm font-semibold mb-1"
        htmlFor="email"
      >
        Email ID<span className='text-red-500'>*</span> :
      </label>
      <input
        className="px-4 py-2 rounded-xl border w-full"
        type="email"
        name="email"
        id="email"
        value={userForm.email}
        onChange={handleFieldChange}
        placeholder="Enter your Email ID"
        required
      />
    </div>
    <div className="mb-5">
      <label
        className="block text-sm font-semibold mb-1"
        htmlFor="firstName"
      >
        First Name:
      </label>
      <input
        className="px-4 py-2 rounded-xl border w-full"
        type="text"
        name="firstName"
        id="firstName"
        onChange={handleFieldChange}
        value={userForm.firstName}
        placeholder="Enter your First Name"
        required
      />
    </div>
    <div className="mb-5">
      <label
        className="block text-sm font-semibold mb-1"
        htmlFor="lastName"
      >
        Last Name:
      </label>
      <input
        className="px-4 py-2 rounded-xl border w-full"
        type="text"
        name="lastName"
        id="lastName"
        onChange={handleFieldChange}
        value={userForm.lastName}
        placeholder="Enter your Last Name"
        required
      />
    </div>
    <div className="mb-5">
      <label
        className="block text-sm font-semibold mb-1"
        htmlFor="password"
      >
        Password<span className='text-red-500'>*</span> :
      </label>
      <input
        className="px-4 py-2 rounded-xl border w-full"
        type="password"
        name="password"
        id="password"
        onChange={handleFieldChange}
        value={userForm.password}
        placeholder="Enter your password"
        required
      />
    </div>
    <div className="mb-5">
      <label
        className="block text-sm font-semibold mb-1"
        htmlFor="comfirmPassword"
      >
        Confirm Password<span className='text-red-500'>*</span> :
      </label>
      <input
        className="px-4 py-2 rounded-xl border w-full"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        onChange={handleFieldChange}
        value={userForm.confirmPassword}
        placeholder="Enter your password"
        required
      />
    </div>

    <button
      className="block m-auto px-20 text-white font-bold mt-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 py-2 rounded-lg "
      type="submit"
    >
      Sign In
    </button>
  </form>
  )
}

export default SignUp