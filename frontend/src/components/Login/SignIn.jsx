import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignIn() {

	const navigate = useNavigate();
	const [userForm, setUserForm] = useState({
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState({
		error: null
	});

	const handleFieldChange = (e) => {
		setUserForm({...userForm, [e.target.id]: e.target.value.trim()});
	}

	const handleUserLogin = (e) => {
		e.preventDefault();
		fetch( `${import.meta.env.VITE_SERVER_URL}api/v1/user/login`, {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify(userForm),
		} ).then( async request => {
			const response = await request.json();
			if( request.status === 200 ) {
				alert( 'Login successful' );
				localStorage.setItem('auth_key', response.token);
				setUserForm({
					email: '',
					password: '',
				});
				setFormErrors({
					error: null
				});
				navigate('/');
			} else {
				setFormErrors({...formErrors, error: 'Invalid credentials! Please try again.'});
			}
		} ).catch((e)=>{
			console.log(e);
			setFormErrors({...formErrors, error: 'Something went wrong! Please try again.'});
		})
	}
  return (
	<form className="mt-8" onSubmit={handleUserLogin} action="" method="post">
	<div className="mb-5">
	  <label
		className="block text-sm font-semibold mb-1"
		htmlFor="email"
	  >
		Email:
	  </label>
	  <input
		className="px-4 py-2 rounded-xl border w-full"
		type="email"
		name="email"
		id="email"
		onChange={handleFieldChange}
		placeholder="Enter your email"
		value={userForm.email}
		required
	  />
	</div>
	<div className="mb-5">
	  <label
		className="block text-sm font-semibold mb-1"
		htmlFor="password"
	  >
		Password:
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

	<button
	  className="block m-auto px-20 text-white font-bold mt-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 py-2 rounded-lg "
	  type="submit"
	>
	  Sign In
	</button>

	{ formErrors.error && <div className='text-red-500 text-center mt-5'>{formErrors.error}</div>}
  </form>
  )
}

export default SignIn