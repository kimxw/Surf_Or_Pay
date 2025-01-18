import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const FriendContext = createContext();

export const useFriends = () => useContext(FriendContext);

export const FriendProvider = ({ children }) => {
    const [friend, setFriend] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedInUser } = useAuth();
  
    useEffect(() => {
        if (!loggedInUser?.email) return;

        const fetchFriends = async() => {
            try {
                const q = query(collection(db, "friends"), where("email", "==", loggedInUser?.email),orderBy("friend", "asc"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const friendData = [];
                    querySnapshot.forEach((doc) => {
                      const data = doc.data();
                      friendData.push({
                        id: doc.id,
                        friend: data.friend,
                      });
                    });
                    setFriend(friendData);
                    setLoading(false);
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        const unsubscribe = fetchFriends();
        return () => unsubscribe && unsubscribe();
    }, [loggedInUser]);

    const searchFriend = async(friendEmail) => {
        try {
            const q = query(collection(db, "Users"), where("email", "==", friendEmail));
            const query = await getDoc(q);
    
            if(query != null){
                const data = doc.data();
                return data.friend;
            } else {
                console.log("No friend found with that email.");
                return null;
            }
        } catch (error) {
            console.error("Error searching for friend:", error);
            return null;
        }
    };
    
    const handleAddFriend = async (friendEmail) => {
        const { loggedInUser } = useAuth();
    
        try{
            const existingFriend = await searchFriend(friendEmail);
            if (!existingFriend) {
              alert("User not found.");
              return;
            }
        
            await addDoc(collection(db, "friends"), {
              email: loggedInUser?.email,
              friend: friendEmail,
            });

            await addDoc(collection(db, "friends"), {
                email: friendEmail,
                friend: email,
            });
        
            alert("Friend added successfully!");
        } catch (error) {
            console.error("Error adding friend:", error);
            alert("Failed to add friend. Please try again.");
        }
    };

    return (
        <FriendContext.Provider value={{ friend, loading, searchFriend, handleAddFriend }}>
          {children}
        </FriendContext.Provider>
      );

};