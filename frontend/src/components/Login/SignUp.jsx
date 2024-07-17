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
		const [formErrors, setFormErrors] = useState({
			email: null,
			passwordConfirm: null,
			error: null
		});
		const navigate = useNavigate();

		const handleFieldChange = (e) => {
			if ( 'confirmPassword' === e.target.id ) {
				if ( e.target.value === userForm.password ) {
					setFormErrors({
                        ...formErrors,
                        passwordConfirm: null
                    });
				} else {
					setFormErrors({
                        ...formErrors,
                        passwordConfirm: 'Passwords do not match'
                    });
				}
			}
			setUserForm({...userForm, [e.target.id]: e.target.value.trim()});
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
								});
								setFormErrors({
									email: null,
									error: null
								});
								navigate('/');
						} else if( request.status === 411 ) {
								setFormErrors({...formErrors, email: response.message});
						} else if ( request.status === 400 ) {
							setFormErrors({...formErrors, error: response.message});
						} else {
							setFormErrors({...formErrors, error: 'Something went wrong! Please try again.'});
						}
				} ).catch((e)=>{
						console.log(e);
						setFormErrors({...formErrors, error: 'Something went wrong! Please try again.'});
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
				className={`px-4 py-2 rounded-xl border w-full ${formErrors.email && 'outline-red-500 border border-red-500'}`}
				type="email"
				name="email"
				id="email"
				value={userForm.email}
				onChange={handleFieldChange}
				placeholder="Enter your Email ID"
				required
			/>
			{ formErrors.email && <div className='text-red-500 ml-3 text-sm'>{formErrors.email}</div> }
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
			{ formErrors.passwordConfirm && <div className='text-red-500 ml-3 text-sm'>{formErrors.passwordConfirm}</div> }
		</div>

		<button
			className="block m-auto px-20 text-white font-bold mt-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 py-2 rounded-lg "
			type="submit"
		>
			Sign Up
		</button>
	</form>
	)
}

export default SignUp