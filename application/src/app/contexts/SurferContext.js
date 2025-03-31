"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/configuration";
import { useAuth } from "./AuthContext";
import moment from "moment";

const SurferContext = createContext();

export const useSurfer = () => useContext(SurferContext);

export const SurferProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState([]);
  const [friends, setFriends] = useState([]);
  const [forfeit, setForfeit] = useState([]);
  const [forfeitId, setForfeitId] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser, username } = useAuth();

  useEffect(() => {
    if (!loggedInUser?.email || username == "User") return;

    const fetchTasksAndFriends = async () => {
      try {
        const taskQuery = query(
          collection(db, "Surfers"),
          where("user", "==", username),
          orderBy("deadline", "asc")
        );

        const sharkQuery = query(
          collection(db, "Surfers"),
          where("friendUsername", "==", username),
          orderBy("deadline", "asc")
        );
        
        const unsubscribeTasks = onSnapshot(taskQuery, async (querySnapshot) => {
          const tasks = [];
          const taskIds = [];
        
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            taskIds.push(docSnapshot.id);
        
            // Fetch the friend's username asynchronously
            const username = await fetchUsername(data.friendUsername);

            const formattedDeadline = moment(data.deadline).format("D MMM h:mm A"); 
        
            // Push the task with the fetched username
            tasks.push({
              friendUsername: data.friendUsername,
              desc: data.desc,
              credits: data.credits,
              deadline: formattedDeadline,
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
          }
        
          console.log("Task IDs:", taskIds);
          console.log("Task Data:", tasks);
          console.log(tasks, "tasks");
          setTaskId(taskIds);
          setTask(tasks);
        });

        const unsubscribeForfeits = onSnapshot(sharkQuery, async (querySnapshot) => {
          const forfeits = [];
          const forfeitIds = [];
  
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            forfeitIds.push(docSnapshot.id);
            
            const username = await fetchUsername(data.friendUsername);

            const formattedDeadline = moment(data.deadline).format("D MMM h:mm A"); 

            forfeits.push({
              friendUsername: data.user,
              desc: data.desc,
              credits: data.credits,
              deadline: formattedDeadline, 
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
          }
  
          console.log("Forfeit IDs to be set:", forfeitIds);
          console.log("Forfeits to be set:", forfeits);
          setForfeit(forfeits);
          setForfeitId(forfeitIds); 
        });
        
        const unsubscribeEvents = onSnapshot(taskQuery, async (querySnapshot) => {
          const events = [];
        
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();

            events.push({
              start: moment(data.deadline).toDate(),
              end: moment(data.deadline).toDate(), 
              title: data.desc
            });
          }
        
          console.log("events to be set:", events);
          setEvents(events);
        });

        setLoading(false);

        return () => {
          unsubscribeTasks();
          unsubscribeFriends();
          unsubscribeForfeits();
          unsubscribeEvents();
        };
      } catch (error) {
        console.error("Error fetching tasks or friends:", error);
      }
    };

    const unsubscribe = fetchTasksAndFriends();
    return () => unsubscribe && unsubscribe();
  }, [loggedInUser, username]);

  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, "Surfers", taskId);
    await deleteDoc(taskDoc);
  };

  const completed = async (taskId) => {
    const taskDoc = doc(db, "Surfers", taskId);
    await updateDoc(taskDoc, { completionStatus: "Completed", verificationStatus: "Pending"});
  };

  const handleVerify = async (taskId) => {
    const taskDoc = doc(db, "Surfers", taskId);
    await updateDoc(taskDoc, { completionStatus: "Completed", verificationStatus: "Verified"});
  };

  return (
    <SurferContext.Provider value={{ task, loading, deleteTask, completed, taskId, forfeit, forfeitId, handleVerify, events}}>
      {children}
    </SurferContext.Provider>
  );
}