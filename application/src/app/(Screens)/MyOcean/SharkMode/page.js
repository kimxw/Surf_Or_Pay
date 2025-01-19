"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import ForfeitTable from "@/components/ui/forfeitTable";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import "@/styles/fonts.css";
import { useAuth } from "@/app/contexts/AuthContext";
import { useSurfer } from "@/app/contexts/SurferContext";
import { db } from "@/app/firebase/configuration";

export default function SharkMode() {
  const { loggedInUser } = useAuth();
  const { task, loading, friends } = useSurfer();

  const [taskDescription, setTaskDescription] = useState("");
  const [sharkEmail, setSharkEmail] = useState("");
  const [forfeit, setForfeit] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTasks = async () => {
    try {
      const isFriend = friends.some(friend => friend.email === sharkEmail);
      if (!isFriend) {
        throw new Error("The specified friend is not in your friends list.");
      }
      
      await addDoc(collection(db, "Surfer"), {
        email: loggedInUser?.email,
        friendUsername: sharkEmail,
        desc: taskDescription,
        credits: parseFloat(forfeit),
        deadline: deadline,
        completionStatus: "Incomplete",
        verificationStatus: "Submit",
      });
      console.log("Task added successfully!");
      setTaskDescription("");
      setSharkEmail("");
      setForfeit("");
      setDeadline("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
    setTaskDescription("");
    setShark("");
    setForfeit("");
    setDeadline("");
  };



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

  const forfeits = [
    {
      friendUsername: "Alice Tan",
      desc: "Complete report on market trends.",
      credits: "$5.00",
      deadline: "2025-01-25",
      completionStatus: "Incomplete",
      verificationStatus: "Submit",
    },
    {
      friendUsername: "Bob Builder",
      desc: "Prepare presentation for client meeting.",
      credits: "$3.00",
      deadline: "2025-01-20",
      completionStatus: "Overdue",
      verificationStatus: "Submit",
    },
    {
      friendUsername: "David Hsu",
      desc: "Review code for the latest features.",
      credits: "$2.00",
      deadline: "2025-01-30",
      completionStatus: "Complete",
      verificationStatus: "Pending",
    },
    {
      friendUsername: "Eve Well",
      desc: "Organize team lunch event.",
      credits: "$1.00",
      deadline: "2025-01-23",
      completionStatus: "Complete",
      verificationStatus: "Verified",
    },
    {
      friendUsername: "Charlie Chan",
      desc: "Update the project roadmap.",
      credits: "$4.00",
      deadline: "2025-01-22",
      completionStatus: "Complete",
      verificationStatus: "Verified",
    },
  ];


  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-[#1E2D4F] dark:bg-[#1E2D4F] flex-1 max-w-screen mx-auto border border-[#1E2D4F] dark:border-[#1E2D4F] overflow-hidden",
        "h-screen p-5" // Set the main container to full screen height
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
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
                  src="/icons/AddFriendIcon.svg"
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
      <div className="relative flex flex-1 flex-col">
        <div
          className="p-2 md:p-10 rounded-tl-2xl border-transparent flex flex-col gap-2 flex-1 w-full h-full bg-[url('/Background.png')]"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        >
                    
            <h1 className="lucky-guy text-4xl text-[#29597e] mb-3">
              Shark Mode - Forfeit
            </h1>

          <div className="flex gap-2 flex-1">
            <div className="h-full w-full rounded-lg bg-transparent opacity-75">
              <ForfeitTable forfeits={forfeits} />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="absolute inset-0 flex rounded-tl-2xl items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg shadow-lg relative mb-36">
              <h2 className="text-xl font-bold mb-4 text-center text-black">
                Promise your task!
              </h2>
              <div className="mb-3">
                <input
                  id="taskDescription"
                  type="text"
                  name="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Task Description"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div className="flex gap-x-4">
                <input
                  id="shark"
                  type="text"
                  name="shark"
                  value={sharkEmail}
                  onChange={(e) => setSharkEmail(e.target.value)}
                  placeholder="SharkEmail"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <input
                  id="forfeitAmount"
                  type="number"
                  name="forfeitAmount"
                  value={forfeit}
                  onChange={(e) => setForfeit(e.target.value)}
                  placeholder="Forfeit amount ($)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div className="mb-6">
                <input
                  id="deadline"
                  type="datetime-local"
                  name="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleAddTasks}
                  className="bg-[#29597e] text-white px-4 py-2 rounded-lg"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="bg-[#ca4949] text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Logo = () => { 
  return ( 
    <Link 
      href="#" 
      className="font-normal flex space-x-5 items-center text-sm text-black py-1 relative z-20" 
    > 
      <div> 
        <Image 
          src="/icons/AppLogo.svg" 
          className="h-18 w-20 flex-shrink-0 rounded-xl" 
          width={50} 
          height={50} 
          alt="Avatar" 
        /> 
      </div> 
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
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20" 
    > 
    <div> 
        <Image 
          src="/icons/AppLogo.svg" 
          className="h-18 w-20 flex-shrink-0 rounded-xl" 
          width={50} 
          height={50} 
          alt="Avatar" 
        /> 
      </div>    
    </Link> 
  ); 
};


// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col">
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col gap-2 flex-1 w-full h-full bg-[url('/Background.png')]"
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex gap-2">
          {[...new Array(4)].map((_, idx) => (
            <div
              key={`first-array-${idx}`} // Use `idx` to generate a unique key
              className="h-20 w-full rounded-lg bg-gray-100 opacity-40"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, idx) => (
            <div
              key={`second-array-${idx}`} // Use `idx` to generate a unique key
              className="h-full w-full rounded-lg bg-gray-100 opacity-40"
            ></div>
          ))}
        </div>
    </div>

    </div>
  );
};
