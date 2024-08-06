import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BsCurrencyDollar, BsCurrencyRupee } from "react-icons/bs";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { UserContext } from '../../utils/userContext';
import PayModal from './PayModal';

function Home() {
		const {balance} = useContext(UserContext);
		const [ currency, setCurrency ] = useState( 'INR' );
		const currencyIcon = currency === 'INR' ? <BsCurrencyRupee /> : <BsCurrencyDollar />; 
		const convertValue = useMemo(() => {
			if ( currency === 'USD' ) {
				return (balance/84).toFixed(2);
			}
			return balance;
		}, [balance, currency]);
	return (
		<div className="flex-1 flex gap-4 items-center md:px-4 justify-between dark:bg-gray-700 dark:text-gray-100 ml-56 min-h-screen">
			<div className=" w-72 p-5 rounded-3xl shadow-md bg-white dark:bg-gray-900">
				<div className="flex">
					<h4 className="flex-1 text-xl font-semibold">Balance</h4>
					<button onClick={()=>setCurrency('INR')} className={`border p-2 rounded-md mr-2 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 ${currency === 'INR' && 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'}`}>
						<BsCurrencyRupee />
					</button>
					<button onClick={()=>setCurrency('USD')} className={`border p-2 rounded-md hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 ${currency === 'USD' && 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'}`}>
						<BsCurrencyDollar />
					</button>
				</div>
				<div className="mt-3">
					<h1 className="text-4xl font-semibold flex items-center">{currencyIcon} {convertValue}</h1>
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
