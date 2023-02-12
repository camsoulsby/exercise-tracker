import React, { useState, useContext, createContext, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";

interface AuthContextProps {
  currentUser: any;
  signup: any;
  login: any;
  logout: any;
  resetPassword: any;
  updateUserEmail: any;
  updateUserPassword: any;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  signup: null,
  login: null,
  logout: null,
  resetPassword: null,
  updateUserEmail: null,
  updateUserPassword: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string ) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserEmail(email: string) {
    return updateEmail(currentUser, email)

  }

  function updateUserPassword(password: string) {
    return updatePassword(currentUser, password);
  }





  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
