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
    const { loggedInUser } = useAuth();
  
    useEffect(() => {
        if (!loggedInUser?.email) return;
    
        const q = query(collection(db, "friends"), where("email", "==", loggedInUser?.email), orderBy("friend", "asc"));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const friendData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                friendData.push(data.friend);
            });
            console.log(friendData, "my friends");
            setFriend(friendData);
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, [loggedInUser]);

    return (
        <FriendContext.Provider value={{ friend, loading}}>
          {children}
        </FriendContext.Provider>
      );

};