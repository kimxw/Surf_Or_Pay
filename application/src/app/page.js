'use client'; 

import React from 'react';
import '@/styles/button.css'; 
import Link from 'next/link';


export default function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{ backgroundImage: 'url(/oceanbg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-8xl font-extrabold animate-surf pb-10">Surf or Pay</div>

      <div className="flex space-x-4 mt-4">
        {/* Wrap the button with Link to navigate to the login page */}
        <Link href="/Screens/Login">
          <button className="button-27" role="button">
            Log in
          </button>
        </Link>
        <Link href="/Screens/MyOcean">
          <button className="button-27" role="button">
            Sign up
          </button>
        </Link>
        
      </div>
    </div>
  );
}
