import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { UserContext } from '../../utils/userContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const {user, setUser } = useContext(UserContext);
    const [fetchingUser, setFetchingUser] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const auth_key = localStorage.getItem('auth_key');
        console.log(auth_key);
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
            console.log( 'navigating to login' );
            setUser(null);
            navigate('/login');
        }
    }, []);
  return (
    <div className="flex items-start">
      <div className=" w-96 p-5 rounded-3xl border shadow-md bg-white">
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
          <h1 className="text-4xl font-semibold">$ 2,800.00</h1>
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
      <div className=" w-full p-10 rounded-3xl border shadow-md mt-16 max-w-[650px] bg-white">
        <div className=" w-full max-w-96 mx-auto shadow-lg rounded-3xl p-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 -mt-16">
          <p className="text-center tracking-widest font-semibold">
            4562 0254 2541 9874
          </p>
          <h3 className="mt-5 font-semibold text-2xl">$ 8,453.00</h3>
        </div>

        <h4 className="text-center font-semibold text-xl mt-14">
          Transactions
        </h4>
        <div></div>
        <div className="mt-5">
          <label htmlFor="payto">Pay to</label>
          <input
            className="block w-full rounded-xl px-10 py-2 bg-gray-200"
            type="email"
            name="payto"
            id="payto"
          />
          <p className="text-xs text-center">
            Please enter the valid Wallet ID or email address
          </p>
        </div>
        <div className="flex gap-5 mt-5	justify-between">
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              className="block w-full rounded-xl px-2 py-2 bg-gray-200"
              type="number"
              name="amount"
              id="amount"
            />
          </div>
          <div>
            <label htmlFor="reason">Reason</label>
            <input
              className="block w-full rounded-xl px-2 py-2 bg-gray-200"
              type="text"
              name="reason"
              id="reason"
            />
          </div>
        </div>
        <button className="mt-5 flex justify-center rounded-lg p-1 items-center gap-2 text-lg text-center w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 font-semibold">
          <IoIosSend /> Send
        </button>
      </div>
    </div>
  );
}

export default Home;
