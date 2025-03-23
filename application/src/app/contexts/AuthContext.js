"use client";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUsername = async () => {
      if (!loggedInUser?.email) return;

      console.log("Fetching username for:", loggedInUser.email);

      try {
        const docRef = doc(db, "Users", loggedInUser.email);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const fetchedUsername = docSnapshot.data()?.username ?? "User";
          setUsername(fetchedUsername);
        } else {
          console.log("User not found in Firestore:", loggedInUser.email);
          setUsername("User");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("User");
      }
    };

    fetchUsername();
  }, [loggedInUser]);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
export default AuthContext;
