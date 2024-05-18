import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";

function Home() {
  return (
    <div className="flex justify-between">
      <div className=" w-96 p-5 rounded-3xl border shadow-md">
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
      <div className=" w-96 p-5 rounded-3xl border shadow-md mt-52">
        <div className="shadow-lg rounded-3xl p-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 -mt-16">
          <p className="text-center tracking-widest font-semibold">
            4562 0254 2541 9874
          </p>
          <h3 className="mt-5 font-semibold text-2xl">$ 8,453.00</h3>
        </div>

        <h4 className="text-center">Transactions</h4>
        <div></div>
        <div>
          <label htmlFor="payto">Pay to</label>
          <input type="email" name="payto" id="payto" />
        </div>
        <div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" id="amount" />
          </div>
		  <div>
            <label htmlFor="reason">Reason</label>
            <input type="text" name="reason" id="reason" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
