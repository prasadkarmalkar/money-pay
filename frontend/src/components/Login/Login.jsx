import React from "react";
import {useState} from "react";
function Login() {
	const [isLogin, setIsLogin] = useState( true );
	
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl w-full max-w-screen-sm">
        <h1 className="text-center font-bold text-2xl">MoneyPay</h1>
		{isLogin ? 
        <form className="mt-8" action="" method="post">
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="username"
		  >
			Username:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="text"
			name="username"
			id="username"
			placeholder="Enter your username"
			required
		  />
		</div>
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="username"
		  >
			Password:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="password"
			name="password"
			id="password"
			placeholder="Enter your password"
			required
		  />
		</div>

		<button
		  className="block m-auto px-20 text-white font-bold mt-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 py-2 rounded-lg "
		  type="submit"
		>
		  Sign In
		</button>
	  </form> :
        <form className="mt-8" action="" method="post">
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="emailId"
		  >
			Email ID:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="email"
			name="emailId"
			id="emailId"
			placeholder="Enter your Email ID"
			required
		  />
		</div>
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="firstName"
		  >
			First Name:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="text"
			name="firstName"
			id="firstName"
			placeholder="Enter your First Name"
			required
		  />
		</div>
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="lastName"
		  >
			Last Name:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="text"
			name="lastName"
			id="lastName"
			placeholder="Enter your Last Name"
			required
		  />
		</div>
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="password"
		  >
			Password:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="password"
			name="password"
			id="password"
			placeholder="Enter your password"
			required
		  />
		</div>
		<div className="mb-5">
		  <label
			className="block text-sm font-semibold mb-1"
			htmlFor="comfirmPassword"
		  >
			Confirm Password:
		  </label>
		  <input
			className="px-4 py-2 rounded-xl border w-full"
			type="password"
			name="comfirmPassword"
			id="comfirmPassword"
			placeholder="Enter your password"
			required
		  />
		</div>

		<button
		  className="block m-auto px-20 text-white font-bold mt-10 bg-gradient-to-r from-fuchsia-600 to-pink-600 py-2 rounded-lg "
		  type="submit"
		>
		  Sign In
		</button>
	  </form>
		}


        <p className="text-center mt-10 font-semibold">
          { isLogin ? "New user ? Create an account " : "Already have an account ? Login " }
          <span className="text-blue-500 cursor-pointer" onClick={()=>setIsLogin(!isLogin)}>here</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
