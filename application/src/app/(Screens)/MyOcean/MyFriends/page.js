"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import FriendsTable from "@/components/ui/friendsTable";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { db } from "@/app/firebase/configuration";
import { useFriends } from "@/app/contexts/FriendContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { collection, query, where, getDocs, addDoc, doc, getDoc, onSnapshot } from "firebase/firestore";

import '@/styles/fonts.css'; 

export default function MyFriends() {
  const { loggedInUser } = useAuth();
  const { friend } = useFriends();
  const [friendList, setFriendList] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

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


  const handleAddFriend = async (friendEmail) => {
    if (!loggedInUser?.email) return;

    try {
      const userDoc = await getDoc(doc(db, "Users", friendEmail));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const friendUsername = userData.username;

        await addDoc(collection(db, "friends"), {
          email: loggedInUser?.email,
          friend: friendEmail,
          friendUsername: friendUsername
        });

        await addDoc(collection(db, "friends"), {
          email: friendEmail,
          friend: loggedInUser?.email,
          friendUsername: username
        });

        alert("Friend added successfully!");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("Failed to add friend. Please try again.");
    }
  };

  const getUserDataByEmail = async (email) => {
    try {
      const userDoc = await getDoc(doc(db, "Users", email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          username: userData.username,
          email: email,
        };
      } else {
        console.warn(`No user found with email: ${email}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching user data for ${email}:`, error);
      return null;
    }
  };

  useEffect(() => {
    if (!loggedInUser?.email) return;

    const unsubscribe = onSnapshot(
      doc(db, "Users", loggedInUser?.email),
      (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUsername(userData?.username);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching username:", error);
        setUsername("sleep time");
        setLoading(false);
      }
    );

    const fetchFriendData = async () => {
      setLoading(true);
      const updatedFriendList = [];
      for (const f of friend) {
        const friendData = await getUserDataByEmail(f);
        if (friendData) {
          updatedFriendList.push(friendData);
        }
      }
      setFriendList(updatedFriendList);
      setLoading(false);
    };

    fetchFriendData();

    return () => unsubscribe();
  }, [loggedInUser, friend]);

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

  const Dashboard = ({ friendList }) => {
    const friends = friendList;

    return (
      <div className="flex flex-1 flex-col">
        <div
          className="p-2 md:p-10 rounded-tl-2xl border-transparent flex flex-col gap-2 flex-1 w-full h-full bg-[url('/Background.png')]"
          style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h1 className="lucky-guy text-4xl text-[#29597e] dark:[#29597e]">
            My Friends
          </h1>
          
          <div className="flex gap-2">
            <div className="h-20 w-1/2 rounded-lg flex items-center space-x-2">
              <input
                id="username"
                type="email"
                name="username"
                placeholder="Enter your friend's email address"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black opacity-70"
              />
              <button
                type="button"
                onClick={() => {
                  const inputValue = document.getElementById('username').value;
                  setNewFriend(inputValue);
                  handleAddFriend(inputValue);
                }}
                className="bg-[#29597e] text-white p-0.5 rounded-lg flex-shrink-0 w-auto px-4 flex items-center space-x-2"
              >
                <img
                  src="/icons/AddFriendIcon.svg"
                  alt="Add Friend"
                  className="h-10 m-0 w-auto"
                />
                <span className="lucky-guy text-2xl text-[#c6e5fc]">Add</span>
              </button>
            </div>          
          </div>
    
          <div className="flex gap-2 flex-1">
            <div className="h-full w-full rounded-lg bg-transparent opacity-75">
              <FriendsTable friends={friends} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-[#1E2D4F] dark:bg-[#1E2D4F] flex-1 max-w-screen mx-auto border border-[#1E2D4F] dark:border-[#1E2D4F] overflow-hidden",
        "h-screen p-5" // Set the main container to full screen height
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
      <Dashboard friendList={friendList} />
    </div>
  );
}