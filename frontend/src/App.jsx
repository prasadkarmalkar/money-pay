import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SideNav from "./components/SideNav/SideNav";

function App() {
	return (
		<div className="bg-gray-200 flex">
			<SideNav />
			<Home />
		</div>
	);
}

export default App;
