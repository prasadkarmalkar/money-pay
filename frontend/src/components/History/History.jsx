import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/userContext';

function History() {
    const {balance, history} = useContext(UserContext);

    return (
    <div className='flex-1 bg-white m-5 rounded-3xl p-10 ml-56 min-h-screen dark:bg-gray-900 dark:text-white'>
        <div className='flex justify-between'>
            <h1 className='text-xl font-bold'>Transaction History</h1>
            <p className='text-lg font-bold'>Balance: {balance} Rs.</p>
        </div>
        { history.map( hist => <div className='shadow-lg px-8 py-4 rounded-xl mt-5 border flex justify-between items-center dark:bg-gray-800 dark:border-gray-700'>
            <div>
                <p className='font-bold'>{hist.email}</p>
                <p className='text-sm text-gray-500'>{new Date(hist.date).toUTCString()}</p>
                <p className='text-sm mt-1 text-gray-500'>{hist.description}</p>
            </div>
            <div className={`${hist.amount > 0 ? 'text-green-500' : 'text-red-500'} text-xl font-bold`}>
                {hist.amount > 0 ? '+ ' + hist.amount : hist.amount}
            </div>
        </div>
    ) }
    </div>
  )
}

export default History