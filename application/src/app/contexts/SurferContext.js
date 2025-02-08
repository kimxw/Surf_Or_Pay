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

        const fetchUsername = async (email) => {
          try {
            const docRef = doc(db, "Users", email);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
              return docSnapshot.data()?.username || "User";
            } else {
              console.log("User not found for email:", email);
              return "User";
            }
          } catch (error) {
            console.error("Error fetching username:", error);
            return "User";
          }
        };
        
        const unsubscribeTasks = onSnapshot(taskQuery, async (querySnapshot) => {
          const tasks = [];
          const taskIds = [];
        
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            taskIds.push(docSnapshot.id);
        
            // Fetch the friend's username asynchronously
            const username = await fetchUsername(data.friendUsername);
        
            // Push the task with the fetched username
            tasks.push({
              friendUsername: username,
              desc: data.desc,
              credits: data.credits,
              deadline: data.deadline,
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
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
            const username = await fetchUsername(data.email);
            forfeits.push({
              friendUsername: username,
              desc: data.desc,
              credits: data.credits,
              deadline: data.deadline,
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
          }
  
          console.log("Forfeit IDs to be set:", forfeitIds);
          console.log("Forfeits to be set:", forfeits);
          setForfeit(forfeits);
          setForfeitId(forfeitIds); 
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

  const handleVerify = async (taskId) => {
    const taskDoc = doc(db, "Surfer", taskId);
    await updateDoc(taskDoc, { completionStatus: "Completed", verificationStatus: "Verified"});
  };

  return (
    <SurferContext.Provider value={{ task, friends, loading, deleteTask, completed, taskId, forfeit, forfeitId, handleVerify}}>
      {children}
    </SurferContext.Provider>
  );
}