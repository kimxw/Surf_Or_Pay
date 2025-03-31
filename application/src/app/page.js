'use client';

import React from 'react';
import Image from 'next/image';
import '@/styles/button.css';
import '@/styles/fonts.css';
import Link from 'next/link';
import { TabsDemo } from '@/components/Tabs';

export default function Home() {
  return (

    <div className="relative flex flex-col justify-center items-center h-[230vh] pb-96">
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
      <div className="grid grid-rows-2 relative z-10 h-screen justify-center items-center w-screen">
        {/* Login Button */}
        <div className="flex justify-center items-center mt-[50vh]">        
          <div className="flex space-x-4 mt-4">
            <Link href="/Login">
              <button className="lucky-guy-button-text text-sm mb-4 bg-[#23598C] p-4 rounded-xl relative overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image that appears behind the text */}
                <div className="wave absolute bg-[#23598C] w-full h-0 bottom-0 left-0 transition-all duration-500 group-hover:h-full z-0">
                  <Image 
                    src="/supportUsButton.png" 
                    alt="Support Us" 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
                {/* Text */}
                <span className="relative z-10 text-white">Log In</span>
              </button>
            </Link>
            <Link href="https://buymeacoffee.com/">
              <button className="lucky-guy-button-text text-sm mb-4 bg-[#23598C] p-4 rounded-xl relative overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image that appears behind the text */}
                <div className="wave absolute bg-[#23598C] w-full h-0 bottom-0 left-0 transition-all duration-500 group-hover:h-full z-0">
                  <Image 
                    src="/supportUsButton.png" 
                    alt="Support Us" 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
                {/* Text */}
                <span className="relative z-10">🤍</span>
              </button>
            </Link>
          </div>
        </div>
    
        {/* Tabs Section */}
        <div className="mt-[110vw] flex flex-col justify-center items-center w-screen z-10">
          <TabsDemo />
          <p className="pt-10 lucky-guy text-center whitespace-pre-line text-[50px] text-white">
            STOP WASTING TIME! TAKE ACTION NOW  
          </p>
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



function Footer() {
  return (
    <div className="mt-[45vh] h-10 flex items-center justify-center mb-5">
      <Link href="https://buymeacoffee.com/">
        <button className="lucky-guy-button-text text-sm mb-4 bg-[#293c67] p-4 rounded-xl relative overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Image that appears behind the text */}
          <div className="wave absolute bg-[#18548c] w-full h-0 bottom-0 left-0 transition-all duration-500 group-hover:h-full z-0">
            <Image 
              src="/supportUsButton.png" 
              alt="Support Us" 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
          {/* Text */}
          <span className="relative z-10">Support Us💙</span>
        </button>
      </Link>
    </div>
  );
}
