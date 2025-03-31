'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "@/app/firebase/configuration"; // Import authentication

import '@/styles/fonts.css';

export function LoginPage() {
  return (
    <div
        className="flex items-center justify-center min-h-screen py-10"
        style={{
          backgroundImage: "url('/login.png')", // Provide the path to your login.png image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
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
  const { setLoggedInUser } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    setIsSigningIn(true);
  
    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      setLoggedInUser(res.user); // Set the logged-in user state
      router.push("/MyOcean");
    } catch (err) {
      setErrorMessage("Incorrect Email/Password");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <section className="bg-white grid text-center items-center p-8">
      <div>
        <h3 className="lucky-guy text-3xl text-[#273a67] mb-2">log in</h3>
        <p className="text-gray-600 mb-5 text-base">Enter your email and password to log in</p>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            type="button" // Change the type to button
            className="w-full bg-[#273a67] text-white p-3 rounded-lg mt-6"
            onClick={handleSignIn}
            disabled={isSigningIn}
          >
            {isSigningIn ? 'Logging in...' : 'Log in'}
          </button>
          <h1 className="flex justify-center items-center mt-5 text-black w-full text-center">
            Don't have an account?
            <a href="/SignUp" className="text-[#4563a9] underline pl-1">Sign up</a>
          </h1>

        </form>
      </div>
    </section>
  );
}

export default LoginPage;

