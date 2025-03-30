"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/app/firebase/configuration";
import { useAuth } from "@/app/contexts/AuthContext";
import '@/styles/fonts.css';

export default function Profile() {
  const { loggedInUser } = useAuth();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loggedInUser?.email) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "Users", loggedInUser?.email),
      (doc) => {
        if (doc.exists()) {
          setUsername(doc.data()?.username || "User");
        } else {
          setUsername("User");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching username:", error);
        setUsername("User");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [loggedInUser]);

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


  return (
    <div
      className={cn(
        "flex flex-col md:flex-row main-purplish-blue-background flex-1 max-w-screen mx-auto border border-[#1E2D4F] overflow-hidden",
        "h-screen p-5"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div>
              <SidebarLink
                link={{
                  label: "Surf or Pay",
                  bgcolour: "transparent",
                  textcolour: "#8ab5d6",
                  href: "#",
                  icon: (
                    <Image
                      src="/icons/AppLogo.svg"
                      className="h-18 w-20 flex-shrink-0 rounded-xl"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
           <SidebarLink
              link={{
                label: username,
                bgcolour: "transparent",
                textcolour: "#8ab5d6",
                href: "/MyOcean/Profile",
                icon: (
                  <Image
                    src="/icons/UserIcon.svg"
                    className="h-20 w-20 flex-shrink-0 rounded-full"
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
      <ProfileDashboard username={username} email={loggedInUser.email} profilePic={"/icons/UserIcon.svg"} tasksCompleted={12} moneyOwed={120} moneyClaimed={120}/>
    </div>
  );
}

const ProfileDashboard = ({ username, email, profilePic, tasksCompleted, moneyOwed, moneyClaimed }) => { 
  return ( 
    <div className="flex flex-1 flex-col h-screen w-screen"> 
      <div 
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 border-neutral-700 flex flex-col gap-2 flex-1 bg-[url('/ProfilePageBG.svg')]"
        style={{ 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          height: '100%', // Ensure the container takes full height
          width: '100%', // Ensure the container takes full width
        }}
      > 
        <h1 className="lucky-guy text-6xl text-[#2C2451] mb-3">
            My Profile
        </h1>
        <div className="flex gap-2 justify-between items-start h-screen"> 
        
          {/* left container */}
          <div className="h-3/4 w-2/3 mr-8 flex flex-row border border-[#2C2451] border-8 rounded-xl overflow-hidden"> 
            {/* dark purple box */}
            <div className="h-full w-1/3 bg-[#52386F] flex flex-col justify-start items-center">
                <div className="h-60 w-60 flex-shrink-0 rounded-full bg-[#2C2451] m-4 justify-center items-start border border-[#2C2451] border-8">
                    <Image
                        src={profilePic}
                        className="h-60 w-60 flex-shrink-0 rounded-full pb-4"
                        width={50}
                        height={50}
                        alt="Avatar"
                    />
                </div>
                <button
                type="button"
                className="lucky-guy h-14 w-60 bg-[#2C2451] text-3xl text-[#C2CFE7] px-4 py-2 rounded-lg flex flex-row items-end">
                     <img
                        src="/icons/EditIcon.svg"
                        alt="EditIcon"
                        className="h-10 w-auto mr-4"/>
                    My Avatar
                </button>    
            </div>
            {/* light purple box */}
            <div className="lucky-guy text-5xl text-[#2C2451] p-8 h-full w-2/3 bg-[#C7CBF5C2]/75">
                My Info
                <span className="lucky-guy text-4xl text-[#2B3D67] mt-8 flex flex-col">
                    Username: 
                    <span className="font-sans font-bold text-[#345873] text-3xl mb-12 underline">{username}</span>

                    Email: 
                    <span className="font-sans font-bold text-[#345873] text-3xl mb-12 underline">{email}</span>
                </span>
                <button
                type="button"
                className="lucky-guy h-14 w-60 bg-[#2C2451] text-3xl text-[#C2CFE7] px-4 py-2 rounded-lg flex justify-center items-end">
                    Edit Profile
                </button> 
            </div>
          </div>
    
          {/* right container */}
          <div className="h-3/4 w-1/3 lucky-guy text-5xl text-[#3C5182] p-8 object-cover bg-[#97D0FA]/60 rounded-xl flex flex-col justify-start items-center">
            Analytics
            <div className="h-2/5 w-full mt-4 mb-12 rounded-xl bg-[#CFE8FB]/50">
                <span className="lucky-guy text-2xl text-[#2B3D67] m-4 flex flex-col">
                    Tasks Completed: {tasksCompleted}
                </span>
                <span className="lucky-guy text-2xl text-[#6D4339] m-4 flex flex-col">
                    Money Owed: ${moneyOwed}
                </span>
                <span className="lucky-guy text-2xl text-[#2A5842] m-4 flex flex-col">
                    Money Claimed: ${moneyClaimed}
                </span>
            </div>
            Achievements
            <div className="h-1/5 w-full mt-4 mb-4 rounded-xl bg-[#CFE8FB]/50">
                <span className="lucky-guy text-2xl text-[#2B3D67]/70 m-4 flex justify-center items center">
                    Coming Soon...!
                </span>
            </div>
          </div>
        </div> 
      </div> 
    </div> 
  ); 
};


