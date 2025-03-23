"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase/configuration';
import { useAuth } from './AuthContext';

const FriendContext = createContext();

export const useFriends = () => useContext(FriendContext);

export const FriendProvider = ({ children }) => {
    const [friend, setFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedInUser, username } = useAuth();
    console.log("Username used in query:", username);
  
    useEffect(() => {
        if (!loggedInUser?.email || username === "User") return;
    
        console.log("Fetching friends for:", username);
    
        const q = query(collection(db, "Friend"), where("user", "==", username), orderBy("friend", "asc"));
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const friendData = [];
            querySnapshot.forEach((doc) => {
                friendData.push(doc.data().friend);
            });
    
            console.log("Updated friend list:", friendData);
            setFriend(friendData);
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, [loggedInUser, username]);
    
    return (
        <FriendContext.Provider value={{ friend, loading}}>
          {children}
        </FriendContext.Provider>
      );

};