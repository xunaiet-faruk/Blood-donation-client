import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Authcontext } from './Authcontext';

const Authprovider = ({children}) => {
    const provider = new GoogleAuthProvider();

 const [user,setUser] =useState(null)
    const [loading, setLoading] = useState(true);

    const signin =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signup =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }  
    
    const logout =()=>{
        setLoading(true)
        return signOut(auth)
    }   

    const google =() =>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
            setUser(currentuser)
            console.log("current user",currentuser);
            setLoading(false)
        })
        return unsubscribe;
    },[])

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo 
        })
   
    }

    const userInfo ={
        user,
        loading,
        signin,
        signup,
        logout,
        google,
        updateUser
    }
    return (
        <Authcontext.Provider value={userInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;