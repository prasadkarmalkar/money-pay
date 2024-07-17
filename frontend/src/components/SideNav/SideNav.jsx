import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { UserContext } from '../../utils/userContext';
import { useNavigate } from 'react-router-dom';

function SideNav() {

	const navigate = useNavigate();
	const { user, setUser } = React.useContext(UserContext);


	const handleLogOut = () => {
        localStorage.removeItem('auth_key');
        setUser(null);
        navigate('/login');
    }

	return (
	<div className='bg-white h-screen py-14 min-w-52 rounded-tr-3xl rounded-br-3xl'>
		<div className='text-center text-2xl font-bold'>
			MoneyPay
		</div>
		<nav className='mt-10'>
			<div className='flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer text-white bg-black ml-4 w-full my-6 z-10 relative'><IoHomeOutline className='text-2xl '/> Home <span className='w-full text-end'>{'>'}</span></div>
			<div className='flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-2 z-10 relative'><FaRegUser  className='text-2xl'/> Profile</div>
			<div className='flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-2 z-10 relative'><LuHistory  className='text-2xl'/> History</div>
			<div onClick={handleLogOut} className='flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-2 z-10 relative'><RiLogoutCircleLine  className='text-2xl'/> Logout</div>
		</nav>
	</div>
  )
}

export default SideNav