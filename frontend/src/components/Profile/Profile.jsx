import React, { useContext } from 'react';
import { UserContext } from '../../utils/userContext';

function Profile() {
	const { user } = useContext(UserContext);

	return (
		<div className='flex-1 bg-white m-5 rounded-3xl p-5 md:p-10 md:ml-56 min-h-screen dark:bg-gray-900 dark:text-white'>
			<div className=''>
				<h1 className='text-xl font-bold'>Profile</h1>
				<div className='mt-5 mb-5'>
					<label
						className='block text-sm font-semibold mb-1'
						htmlFor='email'
					>
						Email ID:
					</label>
					<input
						className={`px-4 py-2 rounded-xl border w-full `}
						type='email'
						name='email'
						id='email'
						placeholder='Enter your Email ID'
						disabled
						value={user.email}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						className='block text-sm font-semibold mb-1'
						htmlFor='firstName'
					>
						First Name:
					</label>
					<input
						className='px-4 py-2 rounded-xl border w-full'
						type='text'
						name='firstName'
						id='firstName'
						placeholder='Enter your First Name'
						disabled
						value={user.firstName}
						required
					/>
				</div>
				<div className='mb-5'>
					<label
						className='block text-sm font-semibold mb-1'
						htmlFor='lastName'
					>
						Last Name:
					</label>
					<input
						className='px-4 py-2 rounded-xl border w-full'
						type='text'
						name='lastName'
						id='lastName'
						placeholder='Enter your Last Name'
						disabled
						value={user.lastName}
						required
					/>
				</div>
			</div>
		</div>
	);
}

export default Profile;
