import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { CiUser } from "react-icons/ci";

function Navbar() {
  return (
    <nav className='flex justify-end gap-5 py-5 px-10'>
        <button className='text-3xl p-1 border border-black rounded-lg bg-white'>
            <IoIosNotifications />
        </button>
        <button className='text-3xl p-1 border border-black rounded-lg bg-white'>
          <CiUser />
        </button>
    </nav>
  )
}

export default Navbar