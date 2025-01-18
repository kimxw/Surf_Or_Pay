import React, {useState} from "react";
import { authentication } from "../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword, sendPasswordResetEmail} from "firebase/auth";

export const handleSignIn = async (email, password) => {
    return signInWithEmailAndPassword(authentication, email, password);
};

export const handleSignUp = async(email, password) => {
    return createUserWithEmailAndPassword(authentication, email, password);
};