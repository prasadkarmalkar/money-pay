import React, { useEffect, useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { UserContext } from '../../utils/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

function SideNav() {

	const navigate = useNavigate();
	const { user, setUser } = React.useContext(UserContext);
	const [ isDark, setDark ] = useState(false);
	const location = useLocation();

	const handleDarkChange = (e) => {
		setDark(!isDark);
	}

	useEffect( () => {
		document.body.classList.toggle( 'dark' );
	}, [isDark] );


	const handleLogOut = () => {
        localStorage.removeItem('auth_key');
        setUser(null);
        navigate('/login');
    }

	return (
	<div className='bg-white min-h-screen fixed py-14 min-w-52 rounded-tr-3xl rounded-br-3xl dark:bg-slate-900 dark:text-slate-100'>
		<div className='text-center text-2xl font-bold'>
			MoneyPay
		</div>
		<nav className='mt-10'>
			<Link to={'/'} className={`flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-6 z-10 relative ${location.pathname === '/' && 'justify-between text-white bg-black dark:bg-white dark:text-slate-700 '}`}><IoHomeOutline className='text-2xl '/> <h5 className='flex-1'>Home</h5> {location.pathname === '/' && <span className='text-end'><IoIosArrowForward /></span>}</Link>
			<Link to={'/profile'} className={`flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-2 z-10 relative ${location.pathname === '/profile' && 'justify-between text-white bg-black dark:bg-white dark:text-slate-700 '}`}><FaRegUser  className='text-2xl'/> <h5 className='flex-1'>Profile</h5> {location.pathname === '/profile' && <span className='text-end'><IoIosArrowForward /></span>}</Link>
			<Link to={'/history'} className={`flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-2 z-10 relative ${location.pathname === '/history' && 'justify-between text-white bg-black dark:bg-white dark:text-slate-700 '}`}><LuHistory  className='text-2xl'/> <h5 className='flex-1'>History</h5> {location.pathname === '/history' && <span className='text-end'><IoIosArrowForward /></span>}</Link>
			<div onClick={handleLogOut} className='flex items-center gap-2 font-bold p-2 rounded-xl cursor-pointer  ml-4 w-full my-2 z-10 relative'><RiLogoutCircleLine  className='text-2xl'/> Logout</div>
			<label class="my-2  ml-4 p-2 inline-flex items-center cursor-pointer">
  				<input type="checkbox" value={isDark} onChange={handleDarkChange} class="sr-only peer" />
  				<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  				<span class="ms-3 text-sm font-bold">{isDark ? 'Dark' : 'Light'}</span>
			</label>
		</nav>
	</div>
  )
}

export default SideNav