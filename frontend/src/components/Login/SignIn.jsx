import React from 'react'

function SignIn() {
  return (
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
  </form>
  )
}

export default SignIn