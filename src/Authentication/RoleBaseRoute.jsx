// Router/RoleBasedRoute.jsx
import { useContext } from 'react';
import { Authcontext } from './Context/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
    const { user, userRole, loading } = useContext(Authcontext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-infinity text-[#fa4c4c] loading-xl w-[50px]"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate state={{ from: location }} to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        // role না মিললে home page এ রিডাইরেক্ট করুন
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleBasedRoute;