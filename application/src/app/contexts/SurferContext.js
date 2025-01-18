"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, getDoc, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebase/configuration';
import { useAuth } from './AuthContext';

const SurferContext = createContext();

export const useSurfer = () => useContext(SurferContext);

export const SurferProvider = ({ children }) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedInUser } = useAuth();
  
    useEffect(() => {
        if (!loggedInUser?.email) return;

        const fetchTasks = async() => {
            try {
                const q = query(collection(db, "Surfer"), where("email", "==", loggedInUser?.email),orderBy("deadline", "asc"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const taskData = [];
                    querySnapshot.forEach((doc) => {
                      const data = doc.data();
                      taskData.push({
                        friendUsername: data.friendUsername,
                        desc: data.desc,
                        credits: data.credits, 
                        deadline: data.deadline, 
                        completionStatus: data.completionStatus,
                        verificationStatus: data.verificationStatus
                      });
                    });
                    setTask(taskData);
                    setLoading(false);
                });

                return unsubscribe;
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        const unsubscribe = fetchTasks();
        return () => unsubscribe && unsubscribe();
    }, [loggedInUser]);
    
    const deleteTask = async (taskId) => {
        const taskDoc = doc(db, "Surfer", taskId);
        await deleteDoc(taskDoc);
    };

    return (
        <SurferContext.Provider value={{ task, loading, deleteTask }}>
          {children}
        </SurferContext.Provider>
      );

};