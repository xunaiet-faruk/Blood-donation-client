import React, { use } from 'react';
import { Authcontext } from '../Authentication/Context/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';

const Privateroute = ({ children }) => {
    const { user, loading } =use(Authcontext)
        const location = useLocation();
    if(loading){
        return <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-xl text-[#B32346]"></span>
        </div>
    }
    if(user){
        return children;
    }
    return <Navigate state={{from : location}} to="/login" replace></Navigate>  
};

export default Privateroute;