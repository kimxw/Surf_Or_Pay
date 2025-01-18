import React from 'react';
import { authentication } from "../firebase/configuration";
import { onAuthStateChanged } from 'firebase/auth';


const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, initializeUser);
    return unsubscribe;
  }, [])

  async function initializeUser(user) {
    if(user) {
      setCurrentUser({... user});
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{currentUser, userLoggedIn, loading}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
export default AuthContext;