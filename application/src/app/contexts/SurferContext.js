"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";
import { useAuth } from "./AuthContext";

const SurferContext = createContext();

export const useSurfer = () => useContext(SurferContext);

export const SurferProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const [friends, setFriends] = useState([]);
  const [forfeit, setForfeit] = useState([]);
  const [forfeitId, setForfeitId] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (!loggedInUser?.email) return;

    const fetchTasksAndFriends = async () => {
      try {
        // Query tasks
        const taskQuery = query(
          collection(db, "Surfer"),
          where("email", "==", loggedInUser?.email),
          orderBy("deadline", "asc")
        );

        // Query friends
        const friendsQuery = query(
          collection(db, "friends"),
          where("email", "==", loggedInUser?.email),
          orderBy("friend", "asc")
        );

        const sharkQuery = query(
          collection(db, "Surfer"),
          where("friendUsername", "==", loggedInUser?.email),
          orderBy("deadline", "asc")
        );

        const unsubscribeTasks = onSnapshot(taskQuery, async (querySnapshot) => {
          const tasks = [];
          const taskIds = [];
  
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            taskIds.push(docSnapshot.id);
  
            // Fetch friend details
            const friendEmail = data.friendUsername;
            const userDocRef = doc(db, "Users", friendEmail);
            try {
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                tasks.push({
                  friendUsername: userData.username,
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
  
          console.log("Task IDs:", taskIds);
          console.log("Task Data:", tasks);
          setTaskId(taskIds);
          setTask(tasks);
        });
               

        const unsubscribeFriends = onSnapshot(friendsQuery, (querySnapshot) => {
          const friendsList = querySnapshot.docs.map((doc) => doc.data().friend);
          setFriends(friendsList);
          console.log("Friends List:", friendsList);
        });

        const unsubscribeForfeits = onSnapshot(sharkQuery, async (querySnapshot) => {
          const forfeits = [];
          const forfeitIds = [];
  
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            forfeitIds.push(docSnapshot.id);
            forfeits.push({
              friendUsername: data.email,
              desc: data.desc,
              credits: data.credits,
              deadline: data.deadline,
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
          }
  
          console.log("Forfeit IDs:", forfeitIds);
          console.log("Forfeit Data:", forfeits);
          setForfeit(forfeitIds);
          setForfeitId(forfeits); 
        });
        

        setLoading(false);

        return () => {
          unsubscribeTasks();
          unsubscribeFriends();
          unsubscribeForfeits();
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

  const completed = async (taskId) => {
    const taskDoc = doc(db, "Surfer", taskId);
    await updateDoc(taskDoc, { completionStatus: "Completed", verificationStatus: "Pending"});
  };

  return (
    <SurferContext.Provider value={{ task, friends, loading, deleteTask, completed, taskId, forfeit, forfeitId }}>
      {children}
    </SurferContext.Provider>
  );
}