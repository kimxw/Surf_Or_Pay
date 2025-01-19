'use client';

import React from 'react';
import Image from 'next/image';
import '@/styles/button.css';
import '@/styles/fonts.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="relative flex flex-col justify-center items-center h-screen"
      style={{
        backgroundImage: 'url(/Background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for tint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#325F64',
          opacity: 0.4, // Adjust opacity as needed
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative flex flex-col items-center z-10">
        <div className="lucky-guy animate-surf" style={{ fontSize: '10rem', lineHeight: '1.2' }}>
          Surf or Pay
        </div>

        <Image
          src="/icons/AppLogo.svg"
          className="h-50 w-50 flex-shrink-0 rounded-xl mt-6"
          width={300}
          height={300}
          alt="App Icon"
        />

        <div className="flex space-x-4 mt-4">
          <Link href="/Login">
            <button className="button-27" role="button">
              Log in
            </button>
          </Link>
          <Link href="/SignUp">
            <button className="button-27" role="button">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
