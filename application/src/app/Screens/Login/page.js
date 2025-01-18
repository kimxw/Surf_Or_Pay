'use client'

import { useState } from "react";

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black py-10">
      <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-md mx-4" style={{borderRadius:'20px'}}>
        <LoginComponent />
      </div>
    </div>
  );
}

function LoginComponent() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="bg-white grid text-center items-center p-8">
      <div>
        <h3 className="text-3xl text-gray-800 mb-2">Log in</h3>
        <p className="text-gray-600 mb-16 text-lg">Enter your email and password to log in</p>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email" className="block font-medium text-gray-900 mb-2">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                size="lg"
                placeholder="********"
                type={passwordShown ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisiblity}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordShown ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <button className="w-full bg-black text-white p-3 rounded-lg mt-6">Sign in</button>
          <div className="mt-4 text-right">
            <a href="#" className="text-[#000000] text-sm">
              Forgot password
            </a>
          </div>
          <p className="text-center text-gray-600 text-sm mt-4">
            Not registered?{" "}
            <a href="#" className="text-[#000000]">
              Create account
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
