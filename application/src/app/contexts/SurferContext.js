"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";
import { useAuth } from "./AuthContext";

const SurferContext = createContext();

export const useSurfer = () => useContext(SurferContext);

export const SurferProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (!loggedInUser?.email) return;

    const fetchTasksAndFriends = async () => {
      try {
        // Query tasks
        const taskQuery = query(
          collection(db, "Surfer"),
          where("email", "==", loggedInUser.email),
          orderBy("deadline", "asc")
        );

        // Query friends
        const friendsQuery = query(
          collection(db, "friends"),
          where("email", "==", loggedInUser.email),
          orderBy("friend", "asc")
        );

        // Subscribe to task updates
        const unsubscribeTasks = onSnapshot(taskQuery, async (querySnapshot) => {
          const taskData = [];
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            const friendEmail = data.friendUsername;
        
            // Create a document reference
            const userDocRef = doc(db, "Users", friendEmail);
        
            // Fetch the document data asynchronously
            try {
              const userDoc = await getDoc(userDocRef);
        
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const name = userData.username;
        
                taskData.push({
                  friendUsername: name,
                  desc: data.desc,
                  credits: data.credits,
                  deadline: data.deadline,
                  completionStatus: data.completionStatus,
                  verificationStatus: data.verificationStatus,
                });
              } else {
                console.error(`No user found for email: ${friendEmail}`);
              }
            } catch (error) {
              console.error(`Error fetching user document for email: ${friendEmail}`, error);
            }
          }
        
          // Update state with fetched task data
          setTask(taskData);
        });
        

        setLoading(false);

        return () => {
          unsubscribeTasks();
          unsubscribeFriends();
        };
      } catch (error) {
        console.error("Error fetching tasks or friends:", error);
      }
    };

    const unsubscribe = fetchTasksAndFriends();
    return () => unsubscribe && unsubscribe();
  }, [loggedInUser]);

  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, "Surfer", taskId);
    await deleteDoc(taskDoc);
  };

  return (
    <SurferContext.Provider value={{ task, friends, loading, deleteTask }}>
      {children}
    </SurferContext.Provider>
  );
}