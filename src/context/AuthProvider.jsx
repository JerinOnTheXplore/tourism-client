import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { createUserIfNotExists } from '../utils/CreateUserIfNotExists';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
    }
 
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
    }

   const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
    }

  const updateUserProfile = profileInfo => {
    return updateProfile(auth.currentUser, profileInfo);
    }

   const logOut = () => {
    setLoading(true);
    return signOut(auth);
    }

    const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);
            console.log('user in the auth state change', currentUser)
            setLoading(false);

            if (currentUser) {
        await createUserIfNotExists(currentUser); 
      }
        });

        return () => {
            unSubscribe();
        }
    }, [])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
    resetPassword,
  }

    return (
        <AuthContext value={authInfo}>
         {children}
        </AuthContext>
    );
};

export default AuthProvider;