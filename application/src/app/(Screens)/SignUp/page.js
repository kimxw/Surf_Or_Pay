'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authentication, db } from "@/app/firebase/configuration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { useAuth } from "@/app/contexts/AuthContext";

import '@/styles/fonts.css'; 

export function SignUpPage() {
  return (
    <div className="bg-[#ffffff] flex items-center justify-center min-h-screen bg-black py-10">

      <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-md mx-4" style={{borderRadius:'20px'}}>
        <SignUpComponent />
      </div>
    </div>
  );
}

function SignUpComponent() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);
  const { setLoggedInUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const ref = collection(db, "Users");

  const handleSignUp = async () => {
    setIsSigningUp(true);
    setErrorMessage(""); // Reset error messages
  
    try {
      // Step 1: Check if the username already exists in Firestore
      const usernameQuery = query(collection(db, "Users"), where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
  
      if (!querySnapshot.empty) {
        setErrorMessage("Username is already taken. Please choose another.");
        setIsSigningUp(false);
        return; // Stop execution if username exists
      }
  
      // Step 2: Proceed with account creation
      const res = await createUserWithEmailAndPassword(authentication, email, password);
  
      // Step 3: Store user data in Firestore
      await setDoc(doc(db, "Users", email), { username });
  
      console.log("User successfully created!");
      setLoggedInUser(res.user);
      router.push("/MyOcean");
    } catch (error) {
      console.error("Error signing up: ", error);
      setErrorMessage(error.message || "An error occurred during signup.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <section className="bg-white grid text-center items-center p-8">
      <div>
        <h3 className="lucky-guy text-3xl text-[#273a67] mb-2">sign up form</h3>
        <p className="text-gray-600 mb-5 text-base">Enter your email and password to sign up</p>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-1">
            <label htmlFor="username" className="block font-medium text-gray-900 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-medium text-gray-900 mb-2">
              Email
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
            type="button" // Corrected type to "button"
            className="w-full bg-[#273a67] text-white p-3 rounded-lg mt-6"
            onClick={handleSignUp}
            disabled={isSigningUp}
          >
            {isSigningUp ? 'Signing Up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignUpPage;