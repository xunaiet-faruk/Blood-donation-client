// Authentication/Context/Authcontext.jsx
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
    const [userRole, setUserRole] = useState(null); // 🆕 role জন্য আলাদা state

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
        localStorage.removeItem('userRole'); // role remove করুন
        setUserRole(null);
        return signOut(auth);
    };

    const google = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    // 🔥 ইউজারের role MongoDB থেকে fetch করুন
    const fetchUserRole = async (email) => {
        try {
            const response = await axios.get(`/register/${email}`);
            if (response.data) {
                const role = response.data.role || 'donor'; // ডিফল্ট role donor
                setUserRole(role);
                localStorage.setItem('userRole', role); // localStorage এ সংরক্ষণ
                console.log("User role fetched:", role);
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            setUserRole('donor'); // error হলে donor সেট করুন
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
            setUser(currentuser);

            if (currentuser?.email) {
                // localStorage থেকে role চেক করুন
                const storedRole = localStorage.getItem('userRole');
                if (storedRole) {
                    setUserRole(storedRole);
                } else {
                    // না থাকলে MongoDB থেকে fetch করুন
                    await fetchUserRole(currentuser.email);
                }
            } else {
                setUserRole(null);
            }

            console.log("current user", currentuser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

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
        userRole, // 🆕 role এক্সপোর্ট করুন
        loading,
        signin,
        signup,
        logout,
        google,
        updateUser,
        fetchUserRole // 🆕 role fetch ফাংশন
    };

    return (
        <Authcontext.Provider value={userInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;