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
import PinnedSubheaderList from "@/components/ui/pinnedSubheaderList";

export default function MyOcean() {
  const { loggedInUser } = useAuth();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser?.email) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "Users", loggedInUser.email),
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
                label: username,
                href: "#",
                icon: (
                  <Image
                    src=""
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
