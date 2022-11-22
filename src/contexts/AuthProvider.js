import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

// SingUp
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
// SignIn
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
// Update User
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
// Observing
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            setUser(currentUser);
            
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
// Sign Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        createUser,
        signIn,
        updateUser,
        user,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;