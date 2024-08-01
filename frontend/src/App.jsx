import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SideNav from "./components/SideNav/SideNav";
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import Login from "./components/Login/Login";
import { useState } from 'react';
import { UserContext } from "./utils/userContext";

const router = createBrowserRouter([
	{
		path: '/',
		element:
		<div className="bg-gray-200 dark:bg-slate-700 flex">
			<SideNav />
			<Home />
		</div>
	},
	{
		path: '/login',
		element: <Login />
	}
])

function App() {
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<RouterProvider router={router} />
        </UserContext.Provider>
	);
}

export default App;
