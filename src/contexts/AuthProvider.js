import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
// import {  } from '@firebase/auth';

export const AuthContext = createContext();
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  // SingUp
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // SignIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // SignIn with Phone Number
  const recaptcha = (styleId, obj) => {
    setLoading(true);
    return new RecaptchaVerifier(auth, styleId, obj);
  };

  const signInPhone = (phone, recaptchaVerifier) => {
    setLoading(true);
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  };
  // Update User
  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };
  // Observing
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user observing:", currentUser);
      setUser(currentUser);

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  // Sign Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    createUser,
    signIn,
    recaptcha,
    signInPhone,
    updateUser,
    user,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
