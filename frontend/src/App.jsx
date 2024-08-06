import "./App.css";
import Home from "./components/Home/Home";
import SideNav from "./components/SideNav/SideNav";
import {
	createBrowserRouter,
	Outlet,
	Route,
	RouterProvider,
	Routes
} from 'react-router-dom';
import Login from "./components/Login/Login";
import { useState } from 'react';
import { UserContext } from "./utils/userContext";
import Profile from './components/Profile/Profile';
import History from './components/History/History';
import HomeContainer from './components/Home/HomeContainer';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
		  <HomeContainer />
		),
		children: [
		  {
			path: '/',
			element: <Home />,
		  },
		  {
			path: '/profile',
			element: <Profile />,
		  },
		  {
			path: '/history',
			element: <History />,
		  },
		],
	},
	{
		path: '/login',
		element: <Login />
	}
])

function App() {
	const [user, setUser] = useState({});
	const [balance, setBalance] = useState(0);
	const [history, setHistory] = useState([]);

	return (
		<UserContext.Provider value={{ user, setUser, balance, setBalance, history, setHistory }}>
			<RouterProvider router={router} />
        </UserContext.Provider>
	);
}

export default App;
