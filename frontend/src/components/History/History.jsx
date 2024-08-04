import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../utils/userContext';

function History() {
    const {user, setUser } = useContext(UserContext);
    const [fetchingUser, setFetchingUser] = useState(false);
    const [balance, setBalance] = useState(false);
    const [userHistory, setUserHistory] = useState([]);

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
                                                    setUserHistory(response.history.reverse());
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
    <div className='flex-1 bg-white m-5 rounded-3xl p-10 ml-56 min-h-screen dark:bg-slate-900 dark:text-white'>
        <div className='flex justify-between'>
            <h1 className='text-xl font-bold'>Transaction History</h1>
            <p className='text-lg font-bold'>Balance: {balance} Rs.</p>
        </div>
        { userHistory.map( hist => <div className='shadow-lg px-8 py-4 rounded-xl mt-5 border flex justify-between items-center dark:bg-slate-800 dark:border-slate-700'>
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