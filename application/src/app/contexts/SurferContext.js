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
        
            tasks.push({
              friendUsername: data.friendUsername,
              desc: data.desc,
              credits: data.credits,
              deadline: data.deadline,
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
          }

          setTaskId(taskIds);
          setTask(tasks);
        });

        const unsubscribeForfeits = onSnapshot(sharkQuery, async (querySnapshot) => {
          const forfeits = [];
          const forfeitIds = [];
  
          for (const docSnapshot of querySnapshot.docs) {
            const data = docSnapshot.data();
            forfeitIds.push(docSnapshot.id);

            forfeits.push({
              friendUsername: data.user,
              desc: data.desc,
              credits: data.credits,
              deadline: data.deadline,
              completionStatus: data.completionStatus,
              verificationStatus: data.verificationStatus,
            });
          }

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
          unsubscribeForfeits();
          unsubscribeEvents();
        };
      } catch (error) {
        console.error("Error fetching tasks or friends:", error);
      }
    };

    const unsubscribe = fetchTasksAndFriends();
    return () => unsubscribe;
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

  useEffect(() => {
    if (!loggedInUser?.email || username === "User") return;
  
    const taskQuery = query(
      collection(db, "Surfers"),
      where("user", "==", username),
      orderBy("deadline", "asc")
    );
  
    const unsubscribeOverdueListener = onSnapshot(taskQuery, async (querySnapshot) => {
      const now = new Date();
  
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();
        const deadline = data.deadline.toDate?.() || new Date(data.deadline);
  
        if (data.completionStatus === "Incomplete" && deadline < now) {
          await updateDoc(doc(db, "Surfers", docSnapshot.id), {
            completionStatus: "Overdue"
          });
        }
      }
    });
  
    return () => unsubscribeOverdueListener();
  }, [loggedInUser, username]);
  
  return (
    <SurferContext.Provider value={{ task, loading, deleteTask, completed, taskId, forfeit, forfeitId, handleVerify, events}}>
      {children}
    </SurferContext.Provider>
  );
}