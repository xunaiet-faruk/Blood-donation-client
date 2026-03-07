import React, { use } from 'react';
import { Link,  NavLink } from 'react-router-dom';
import './Navbar.css'
import PrimaryButton from './PrimaryButton';
import { Authcontext } from '../Authentication/Context/Authcontext';
import { FaUser } from 'react-icons/fa';
const Navbar = () => {
    const { user, logout } = use(Authcontext)

    const handleLogout = () => {
        logout()
            .then(() => {       
            })
    }          

    const menuItems = <>
    
    <NavLink to={'/'}>
        Home
    </NavLink>
        <NavLink to={'/blog'}>
            Blog
    </NavLink>
        <NavLink to={'/publicSeeDonor'}>
            Donation Requests
    </NavLink>
        <NavLink to={'/searchDonor'}>
            Funding Donors
    </NavLink>
    
    </>
    return (
        <div>
            <div className="navbar bg-base-100  ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                           {menuItems}
                        </ul>
                    </div>
                    <Link to={"/"}>
                    <img src="/logo.png" alt="Logo" className="w-15" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal px-1 gap-4">
                       {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn m-1 bg-white border-0 rounded-full p-0"
                            >
                                <img
                                    src={
                                        user?.photoURL ||
                                        user?.providerData?.[0]?.photoURL ||
                                        user?.reloadUserInfo?.photoUrl ||
                                        '/default-avatar.png'
                                    }
                                    alt="User Avatar"
                                    className="w-16 rounded-full"
                                />
                            </div>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">
                                <li>
                                    <button
                                        className="text-red-700 hover:bg-[#B32346] hover:text-white"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                                <li>


                                    <Link to="/dashboard" className="hover:bg-[#B32346] hover:text-white">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to={"/login"}>
                            <PrimaryButton text={"Sign In"} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;