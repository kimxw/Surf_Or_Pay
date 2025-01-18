import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc, orderBy, increment, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const SurferProvider = ({ children }) => {
    const[tasks, setTasks] = React.useState([]);
}