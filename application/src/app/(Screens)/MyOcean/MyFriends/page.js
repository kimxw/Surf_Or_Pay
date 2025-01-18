"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import FriendsTable from "@/components/ui/friendsTable";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import '@/styles/fonts.css'; 

export default function MyFriends() {
  const links = [
    {
      label: "My Ocean",
      bgcolour: "#68c5c0",
      textcolour: "#357b78",
      href: "/MyOcean",
      icon: (
        <Image
          src="/icons/MyOceanIcon.svg"
          className="h-18 w-20 flex-shrink-0 rounded-xl"
          width={50}
          height={50}
          alt="Avatar"
        />
      ),
    },
    {
      label: "Surfer Mode",
      bgcolour: "#86caa8",
      textcolour: "#5a806d",
      href: "/MyOcean/SurferMode",
      icon: (
        <Image
          src="/icons/SurferModeIcon.svg"
          className="h-18 w-20 flex-shrink-0 rounded-xl"
          width={50}
          height={50}
          alt="Avatar"
        />
      ),
    },
    {
      label: "Shark Mode",
      bgcolour: "#2da09b",
      textcolour: "#245956",
      href: "/MyOcean/SharkMode",  
      icon: (
        <Image
          src="/icons/SharkModeIcon.svg"
          className="h-18 w-20 flex-shrink-0 rounded-xl"
          width={50}
          height={50}
          alt="Shark Mode"
        />
      ),
    },
    {
      label: "My Friends",
      bgcolour: "#aaa4d4",
      textcolour: "#6e6894",
      href: "/MyOcean/MyFriends",  
      icon: (
        <Image
          src="/icons/PeopleIcon.svg"
          className="h-18 w-20 flex-shrink-0 rounded-xl"
          width={50}
          height={50}
          alt="My Friends"
        />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-[#1E2D4F] dark:bg-[#1E2D4F] flex-1 max-w-screen mx-auto border border-[#1E2D4F] border-[#1E2D4F] overflow-hidden",
        "min-h-screen h-auto p-5" // Set the main container to full screen height
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-5 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium lucky-guy text-4xl text-[#8ab5d6] dark:[#8ab5d6] whitespace-pre"
      >
        Surf or Pay
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const friends = [
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "David", email: "david@example.com" },
    { username: "Eve", email: "eve@example.com" },
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "David", email: "david@example.com" },
    { username: "Eve", email: "eve@example.com" },
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "David", email: "david@example.com" },
    { username: "Eve", email: "eve@example.com" },
    
  ];
  

  return (
    <div className="flex flex-1 flex-col">

      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col gap-2 flex-1 w-full h-full bg-[url('/Background.png')]"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h1 className="lucky-guy text-4xl text-[#29597e] dark:[#29597e]">
          My Friends
        </h1>
        
        <div className="flex gap-2">

          {[...new Array(1)].map((_, idx) => (
            <div
            key={`first-array-${idx}`} // Use `idx` to generate a unique key
            className="h-20 w-1/2 rounded-lg flex items-center space-x-2"
          >
            
            <input
              id="username"
              type="username"
              name="username"
              placeholder="   Enter your friend's email address"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:box-shadow-[0_0_5px_rgba(81,_203,_238,_1)] text-black opacity-70"
            />
            <button
              type="button"
              className="bg-[#29597e] text-white p-0.5 rounded-lg flex-shrink-0 w-auto px-4 flex items-center space-x-2"
            >
              <img
                src="/icons/AddFriendIcon.svg"
                alt="Icon"
                className="h-10 m-0 w-auto" // Adjust size as needed
              />
              <span className="lucky-guy text-2xl text-[#c6e5fc]">Add</span>
            </button>
          </div>          
          ))}
        </div>
  
        <div className="flex gap-2 flex-1">
          {[...new Array(1)].map((_, idx) => (
            <div
              key={`second-array-${idx}`} // Use `idx` to generate a unique key
              className="h-full w-full rounded-lg bg-transparent opacity-75"
            >
              <FriendsTable friends={friends} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};
