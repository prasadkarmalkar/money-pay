import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/userContext';
import { BsCurrencyRupee } from 'react-icons/bs';

function History() {
    const {balance, history} = useContext(UserContext);

    return (
    <div className='flex-1 bg-white md:m-5 rounded-3xl p-5 md:p-10 md:ml-56 min-h-screen dark:bg-gray-900 dark:text-white'>
        <div className='flex justify-between'>
            <h1 className='text-xl font-bold'>Transaction History</h1>
            <p className='text-lg font-bold flex items-center'>Balance:  <BsCurrencyRupee /> {balance} </p>
        </div>
        { history.map( hist => <div className='shadow-lg px-4 py-2 md:px-8 md:py-4 rounded-xl mt-5 border flex justify-between items-center dark:bg-gray-800 dark:border-gray-700'>
            <div>
                <p className='font-bold text-sm md:text-base'>{hist.email}</p>
                <p className='text-xs md:text-sm text-gray-500'>{new Date(hist.date).toUTCString()}</p>
                <p className='text-sm mt-1 text-gray-500'>{hist.description}</p>
            </div>
            <div className={` ${hist.amount > 0 ? 'text-green-500' : 'text-red-500'} text-xl font-bold flex items-center flex-nowrap`}>
             <BsCurrencyRupee /> {hist.amount > 0 ?<div>+ {hist.amount}</div>: hist.amount}
            </div>
        </div>
    ) }
    </div>
  )
}

export default History