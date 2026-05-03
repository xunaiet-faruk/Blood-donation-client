import { useContext, useEffect, useState } from 'react';
import { Authcontext } from './Context/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
    const { user, userRole, loading } = useContext(Authcontext);
    const location = useLocation();
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
      
        if (!loading) {
            const timer = setTimeout(() => {
                setCheckingRole(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (loading || (user && !userRole && checkingRole)) {
        console.log("RoleBasedRoute - Waiting for role:", { loading, userRole });
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-infinity text-[#fa4c4c] loading-xl w-[50px]"></span>
                    <p className="mt-4 text-gray-600">Checking permissions...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        console.log("RoleBasedRoute - No user, redirecting to login");
        return <Navigate state={{ from: location }} to="/login" replace />;
    }

    const hasAccess = allowedRoles.some(role =>
        role.toLowerCase() === userRole?.toLowerCase()
    );

    if (!hasAccess) {
        console.log(`RoleBasedRoute - Access denied. User role: ${userRole}, Allowed: ${allowedRoles}`);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-red-50 rounded-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                    <p className="text-gray-700">You don't have permission to access this page.</p>
                    <p className="text-sm text-gray-500 mt-2">Your role: {userRole || 'Unknown'}</p>
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="mt-4 px-4 py-2 bg-[#B32346] text-white rounded-lg"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    console.log("RoleBasedRoute - Access granted for role:", userRole);
    return children;
};

export default RoleBasedRoute;