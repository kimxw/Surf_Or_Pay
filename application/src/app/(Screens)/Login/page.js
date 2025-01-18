'use client'

import { useState } from "react";
import { handleSignIn, handleSignUp } from "@/app/firebase/auth";
import { useAuth } from "@/app/contexts/AuthContext";


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
  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await handleSignIn(email, password);
      console.log('Login successful!');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to log in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                size="lg"
                placeholder="********"
                type={passwordShown ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordShown ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}" </p>
          )}
          <button
            type="Login"
            className="w-full bg-black text-white p-3 rounded-lg mt-6 style={on-click: handleSubmit()}"
            onClick={handleSubmit}
            disabled={isSigningIn}
            >
                {isSigningIn ? 'Signing in...' : 'Sign in'}
            </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
