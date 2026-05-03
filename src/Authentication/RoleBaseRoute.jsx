// RoleBasedRoute.js - সম্পূর্ণ পরিবর্তন করুন

import { useContext, useEffect } from 'react';
import { Authcontext } from './Context/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
    const { user, userRole, loading } = useContext(Authcontext);
    const location = useLocation();

    // loading বা userRole না থাকলে লোডিং দেখান
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-infinity text-[#fa4c4c] loading-xl w-[50px]"></span>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // ইউজার লগইন না থাকলে
    if (!user) {
        return <Navigate state={{ from: location }} to="/login" replace />;
    }

    // রোল না থাকলে (এটি হওয়া উচিত না, কিন্তু নিরাপত্তার জন্য)
    if (!userRole) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-infinity text-[#fa4c4c] loading-xl w-[50px]"></span>
                    <p className="mt-4 text-gray-600">Setting up your account...</p>
                </div>
            </div>
        );
    }

    // রোল চেক করুন (case-insensitive)
    const normalizedUserRole = userRole.toLowerCase();
    const hasAccess = allowedRoles.some(
        role => role.toLowerCase() === normalizedUserRole
    );

    if (!hasAccess) {
        console.log(`Access Denied - User: ${user.email}, Role: ${userRole}, Required: ${allowedRoles.join(', ')}`);

        // রোল অনুযায়ী রিডাইরেক্ট
        let redirectPath = '/dashboard';
        if (normalizedUserRole === 'donor') {
            redirectPath = '/dashboard/donation-requests';
        } else if (normalizedUserRole === 'volunteer') {
            redirectPath = '/dashboard/assigned-donation-requests';
        }

        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default RoleBasedRoute;