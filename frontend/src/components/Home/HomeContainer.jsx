import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/userContext';
import { Outlet, useNavigate } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import { IoReorderFour } from 'react-icons/io5';

function HomeContainer() {
	const {user, setUser, balance, setBalance, history, setHistory } = useContext(UserContext);
	const navigate = useNavigate();
	const [fetchingUser, setFetchingUser] = useState(false);
	useEffect(()=>{
			const auth_key = localStorage.getItem('auth_key');
			if( auth_key ) {
					if( !fetchingUser ) {
							setFetchingUser( true );
							fetch(`${import.meta.env.VITE_SERVER_URL}api/v1/user/currentUser`, {
									method: 'GET',
									headers: {
											'Content-Type': 'application/json',
											'Authorization': `Bearer ${localStorage.getItem('auth_key')}`
									}
							}).then(async(request) => {
									const response = await request.json();
									if(request.status === 200) {
											setUser(response.user);
											fetch( `${import.meta.env.VITE_SERVER_URL}api/v1/account/balance`, {
												headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_key')}` }
											} ).then( async(request) => {
												const response = await request.json();
												if( request.status === 200 ) {
													setBalance(response.balance);
													if( response.history ) {
														setHistory(response.history.reverse());
													}
												}
											})
									}else {
											localStorage.removeItem('auth_key');
											setUser(null);
											navigate('/login');
									}
									setFetchingUser( false );
							}).catch(e => {
									console.log(e);
									localStorage.removeItem('auth_key');
									setUser(null);
									navigate('/login');
									setFetchingUser( false );
							})
					}
			} else {
					setUser(null);
					navigate('/login');
			}
	}, []);

	const [showNav, setShowNav] = useState(false);
	return (
		<div className="bg-gray-200 dark:bg-gray-700 flex flex-col md:flex-row">
			<div className='flex justify-end text-3xl px-2 py-3 md:hidden'>
				<IoReorderFour onClick={()=> setShowNav(true)} className='dark:bg-gray-100 dark:text-gray-900 bg-gray-900 text-gray-100 p-1 rounded-sm' />
			</div>
			<SideNav showNav={showNav} setShowNav={setShowNav} />
			<Outlet />
		</div>
	)
}

export default HomeContainer