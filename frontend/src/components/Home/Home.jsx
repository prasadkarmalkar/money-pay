import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { UserContext } from '../../utils/userContext';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import PayModal from './PayModal';

function Home() {
		const {user, setUser } = useContext(UserContext);
		const [fetchingUser, setFetchingUser] = useState(false);
		const [balance, setBalance] = useState(false);
		const navigate = useNavigate();
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
		<div className="flex-1 flex gap-4 items-center md:px-4 justify-between dark:bg-slate-700 dark:text-slate-100 ml-56 min-h-screen">
			<div className=" w-72 p-5 rounded-3xl shadow-md bg-white dark:bg-slate-900">
				<div className="flex">
					<h4 className="flex-1 text-xl font-semibold">Balance</h4>
					<button className="border p-2 rounded-md mr-2">
						<FaRupeeSign />
					</button>
					<button className="border p-2 rounded-md">
						<BsCurrencyDollar />
					</button>
				</div>
				<div className="mt-3">
					<h1 className="text-4xl font-semibold">$ {balance}</h1>
				</div>
				<div className="mt-5">
					<div className="flex gap-4 font-semibold">
						<div className="flex items-center gap-3">
							<GoArrowUpRight className="bg-green-500 text-white p-0.5 rounded-sm" />
							+$ 250.00
						</div>
						<div className="flex items-center gap-3">
							<GoArrowDownLeft className="bg-red-500 text-white p-0.5 rounded-sm" />
							-$ 250.00
						</div>
					</div>
				</div>
			</div>
			<PayModal balance={balance} />
		</div>
	);
}

export default Home;
