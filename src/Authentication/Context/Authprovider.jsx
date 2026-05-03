import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Authcontext } from './Authcontext';
import Useaxios from '../../Hooks/Useaxios';

const Authprovider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const axios = Useaxios();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        setLoading(true);
        localStorage.removeItem('userRole'); 
        setUserRole(null);
        return signOut(auth);
    };

    const google = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const fetchUserRole = async (email) => {
        try {
            const response = await axios.get(`/register/${email}`);
            if (response.data) {
                const role = response.data.role || 'donor'; 
                setUserRole(role);
                localStorage.setItem('userRole', role); 
                console.log("User role fetched:", role);
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            setUserRole('donor'); 
        }
    };

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
            setUser(currentuser);

            if (currentuser?.email) {
                try {
                    const response = await axios.get(`/register/${currentuser.email}`);
                    if (response.data) {
                        const role = response.data.role || 'donor';
                        setUserRole(role);
                        localStorage.setItem('userRole', role);
                        console.log("User role set from backend:", role);
                    } else {
                        setUserRole('donor');
                        localStorage.setItem('userRole', 'donor');
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    const storedRole = localStorage.getItem('userRole');
                    if (storedRole) {
                        setUserRole(storedRole);
                    } else {
                        setUserRole('donor');
                    }
                }
            } else {
                setUserRole(null);
                localStorage.removeItem('userRole');
            }

            setLoading(false);
        });

        return unsubscribe;
    }, [axios]); 

    const updateUser = (name, photo, group, upazila, district) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
            group: group,
            upazila: upazila,
            district: district
        });
    };

    const userInfo = {
        user,
        userRole, 
        loading,
        signin,
        signup,
        logout,
        google,
        updateUser,
        fetchUserRole 
    };

    return (
        <Authcontext.Provider value={userInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;