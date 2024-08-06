import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/userContext';
import { Outlet, useNavigate } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';

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
	return (
		<div className="bg-gray-200 dark:bg-gray-700 flex">
			<SideNav />
			<Outlet />
		</div>
	)
}

export default HomeContainer