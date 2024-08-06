import React from "react";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-4 md:p-10 rounded-xl w-full max-w-screen-sm">
        <h1 className="text-center font-bold text-2xl">MoneyPay</h1>
        {isLogin ? (
			<SignIn />
        ) : (
			<SignUp />
        )}

        <p className="text-center mt-10 font-semibold">
          {isLogin
            ? "New user ? Create an account "
            : "Already have an account ? Login "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
