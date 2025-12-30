import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [errorInvalid, setErrorInvalid] = useState('');

  // create user with email&pass

  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login USER
  const singInuser = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login With Google Account
  const singInWithGoogle = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // SingOut or LogOut user
  const singOutUser = () => {
    setloading(true);
    return signOut(auth);
  };

  //Get Current User Info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      // console.log('in auth state change', currentUser);
      setUser(currentUser);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // forget password
  const forgetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };

  const authinfo = {
    createUser,
    user,
    loading,
    singInuser,
    singInWithGoogle,
    singOutUser,
    forgetPassword,
    errorInvalid,
    setErrorInvalid,
    setUser,
  };
  return <AuthContext value={authinfo}>{children}</AuthContext>;
};

export default AuthProvider;
