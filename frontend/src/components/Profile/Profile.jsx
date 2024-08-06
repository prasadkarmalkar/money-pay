import React, { useContext } from 'react';
import { UserContext } from '../../utils/userContext';

function Profile() {
	const {user } = useContext(UserContext);

	return (
		<div className='flex-1 bg-white m-5 rounded-3xl p-10 ml-56 min-h-screen dark:bg-gray-900 dark:text-white'>
			<div className='flex justify-between'>
				<h1 className='text-xl font-bold'>Profile</h1>
			</div>
		</div>
	);
}

export default Profile;
