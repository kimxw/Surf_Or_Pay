  "use client";
  import React, { useState, useEffect } from "react";
  import { doc, getDoc } from "firebase/firestore";
  import { db, authentication } from "../firebase/configuration";

  const AuthContext = React.createContext();

  export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [username, setUsername] = useState("Loading . . .");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = authentication.onAuthStateChanged((user) => {
        setLoggedInUser(user);
        setLoading(false); // finished checking auth state
      });

      return () => unsubscribe();
    }, []);

    useEffect(() => {
      const fetchUsername = async () => {
        if (!loggedInUser?.email) return;

        console.log("Fetching username for:", loggedInUser.email);

        try {
          const docRef = doc(db, "Users", loggedInUser.email);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const fetchedUsername = docSnapshot.data()?.username ?? "Loading...";
            setUsername(fetchedUsername);
          } else {
            console.log("User not found in Firestore:", loggedInUser.email);
            setUsername("Loading...");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
          setUsername("Loading...");
        }
      };

      fetchUsername();
    }, [loggedInUser]);

    return (
      <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, username }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => React.useContext(AuthContext);
  export default AuthContext;