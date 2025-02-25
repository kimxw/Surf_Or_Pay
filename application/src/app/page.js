'use client';

import React from 'react';
import Image from 'next/image';
import '@/styles/button.css';
import '@/styles/fonts.css';
import Link from 'next/link';
import { TabsDemo } from '@/components/Tabs';

export default function Home() {
  return (

    <div className="relative flex flex-col justify-center items-center h-screen">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-[300vh] object-cover z-[-1] transform -translate-y-[10px]"
        autoPlay
        muted
        playsInline
      >
        <source src="/LandingPageBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Layer */}
      <div className="grid grid-rows-3 relative z-10 h-screen justify-center items-center w-screen">
        <div className="mt-[130vh] flex justify-center items-center">
          <Link href="/Login">
            <button className="lucky-guy-button-text text-sm animate-pop-up button-27" role="button">
              Log in
            </button>
          </Link>
        </div>

        <div className="mt-[340vh] justify-center items-center w-screen">
          <TabsDemo />
          {/* <h1 className="lucky-guy-button-text text-9xl mt-20 justify-center items-center pl-40">
              Stop wasting time! Take accountability today
          </h1> */}
        <div className="mt-[45vh] bg-[#16528a] h-10 flex items-center justify-center mb-5">
          <Link href="https://buymeacoffee.com/">
              <button className=" lucky-guy-button-text text-sm animate-pop-up mb-4 bg-[#293c67] p-5 rounded-xl" role="button">
                Support Us💙
              </button>
            </Link>
        </div>
        </div>

      </div>

    </div>




    // <div
    //   className="relative flex flex-col justify-center items-center h-screen"
    //   style={{
    //     backgroundImage: 'url(/Background.png)',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //   }}
    // >
      

    //   {/* Content */}
    //   <div className="relative flex flex-col items-center z-10">
    //     <div className="lucky-guy animate-surf" style={{ fontSize: '10rem', lineHeight: '1.2' }}>
    //       Surf or Pay
    //     </div>

    //     <Image
    //       src="/icons/AppLogo.svg"
    //       className="h-50 w-50 flex-shrink-0 rounded-xl mt-6"
    //       width={300}
    //       height={300}
    //       alt="App Icon"
    //     />

    //     <div className="flex space-x-4 mt-4">
    //       <Link href="/Login">
    //         <button className="button-27" role="button">
    //           Log in
    //         </button>
    //       </Link>
    //       <Link href="/SignUp">
    //         <button className="button-27" role="button">
    //           Sign up
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
