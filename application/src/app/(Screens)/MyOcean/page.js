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
import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendar from "../../../components/ui/calendar";

export default function MyOcean() {
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
                href: "#",
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
      <Dashboard />
    </div>
  );
}

const Dashboard = () => { 
  return ( 
    <div className="flex flex-1 flex-col h-screen w-screen"> 
      <div 
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 border-neutral-700 flex flex-col gap-2 flex-1 bg-[url('/Background.png')]"
        style={{ 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          height: '100%', // Ensure the container takes full height
          width: '100%', // Ensure the container takes full width
        }}
      > 
        <h1 className="lucky-guy text-4xl text-[#29597e] mb-3">
            My Ocean - Dashboard
        </h1>
        <div className="flex gap-2 justify-center items-start"> 
        
          {/* left container */}
          <div className="h-95 w-1/2">
            <Calendar></Calendar>
          </div>
    
          {/* right container */}
          <div className="h-20 w-1/2 object-cover">
            <img 
              src="/icons/MyOceanDisplay.gif" 
              alt="Gif display"
              className="h-200 w-400 object-contain" // Ensure the image scales to fit
            />
          </div>
        </div> 
      </div> 
    </div> 
  ); 
};


