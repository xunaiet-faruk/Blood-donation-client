import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
    FaHome, FaUserAlt, FaUsers, FaBars, FaHandHoldingHeart,
    FaClipboardList, FaPlusCircle, FaCog, FaTimes, FaPenNib, FaSignOutAlt,
    FaArrowLeft, FaDoorOpen
} from "react-icons/fa";
import { Authcontext } from "../Authentication/Context/Authcontext";
import Useaxios from "../Hooks/Useaxios";
import { MdManageAccounts } from "react-icons/md";

const SideDashboardLinks = () => {
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(Authcontext);
    const axios = Useaxios();

    const handleLogout = () => {
        logout()
            .then(() => console.log("Logged out"))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    const response = await axios.get(`/register/${user.email}`);
                    setUserRole(response.data.role);
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUserRole(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setUserRole(null);
            }
        };

        fetchUserRole();
    }, [user, axios]);

    const getNavItems = () => {
        const allItems = [
            { name: "Dashboard", path: "/dashboard", icon: <FaHome />, roles: ['admin'] },
            { name: "Profile", path: "/dashboard/profile", icon: <FaUserAlt />, roles: ['admin', 'volunteer', 'donor'] },
            { name: "All Users", path: "/dashboard/allusers", icon: <FaUsers />, roles: ['admin'] },
            { name: "All Blood Requests", path: "/dashboard/all-blood-donation-request", icon: <FaClipboardList />, roles: ['admin'] },
            { name: "Content Write", path: "/dashboard/content-write", icon: <FaPenNib />, roles: ['admin'] },
            { name: "Content Management", path: "/dashboard/Content-Management", icon: <MdManageAccounts />, roles: ['admin'] },
            { name: "Assigned Requests", path: "/dashboard/assigned-donation-requests", icon: <FaHandHoldingHeart />, roles: ['volunteer'] },
            { name: "Donation Requests", path: "/dashboard/donation-requests", icon: <FaClipboardList />, roles: ['donor'] },
            { name: "Create Request", path: "/dashboard/create-donation-request", icon: <FaPlusCircle />, roles: ['donor'] },
        ];
        return userRole ? allItems.filter(item => item.roles.includes(userRole)) : [];
    };

    const navItems = getNavItems();

    const NavLinks = ({ navItems, closeDrawer }) => {
        return (
            <div className="flex flex-col h-full">
                <div className="space-y-3">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.03, x: 5 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <NavLink
                                to={item.path}
                                onClick={closeDrawer}
                                end={item.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-[#B32346] text-white shadow-md"
                                        : "text-gray-700 hover:bg-gray-200"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-auto pt-6 space-y-3 border-t border-gray-200">
                    {/* Home Button - Redesigned */}
                    <motion.div
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <NavLink
                            to="/"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`
                            }
                        >
                            <span className="text-lg bg-blue-100 p-1.5 rounded-lg group-hover:bg-blue-200 transition">
                                <FaHome className="text-blue-600" />
                            </span>
                            <span className="font-medium">Home</span>
                            <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                Exit
                            </span>
                        </NavLink>
                    </motion.div>

                    {/* Logout Button - Redesigned */}
                    <motion.div
                        whileHover={{ scale: 1.02, x: 3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <button
                            onClick={() => {
                                handleLogout();
                                if (closeDrawer) closeDrawer();
                            }}
                            className="flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 text-gray-700 hover:bg-red-50 group relative overflow-hidden"
                        >
                            {/* Animated background effect */}
                            <motion.span
                                className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 transition-opacity"
                                initial={false}
                                whileHover={{ scale: 1.5 }}
                            />

                            <span className="text-lg bg-red-100 p-1.5 rounded-lg group-hover:bg-red-200 transition relative z-10">
                                <FaSignOutAlt className="text-red-600 group-hover:rotate-12 transition-transform" />
                            </span>

                            <span className="font-medium relative z-10">Logout</span>

                            {/* Small indicator */}
                            <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full group-hover:bg-red-200 transition relative z-10">
                                <FaDoorOpen className="inline mr-1 text-xs" />
                                Exit
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B32346]"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!user || navItems.length === 0) {
        return (
            <div className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 flex-col items-center justify-center">
                <p className="text-gray-500">No menu items available</p>
            </div>
        );
    }

    return (
        <>
            {/* Topbar for mobile */}
            <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-2xl fixed w-full z-40">
                <button onClick={() => setOpen(true)} className="text-2xl text-[#B32346]">
                    <FaBars />
                </button>
                <h1 className="font-bold text-lg text-[#B32346]">Dashboard</h1>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 flex-col">
                <h2 className="text-2xl font-bold text-[#B32346] mb-8">
                    {userRole === "donor" ? "Donor Menu" :
                        userRole === "admin" ? "Admin Menu" :
                            userRole === "volunteer" ? "Volunteer Menu" : "Menu"}
                </h2>
                <NavLinks navItems={navItems} />
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black backdrop-blur-sm z-40"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 p-6 overflow-y-auto flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-[#B32346]">
                                    {userRole === "donor" ? "Donor Menu" :
                                        userRole === "admin" ? "Admin Menu" :
                                            userRole === "volunteer" ? "Volunteer Menu" : "Menu"}
                                </h2>
                                <button onClick={() => setOpen(false)} className="text-xl">
                                    <FaTimes />
                                </button>
                            </div>

                            {/* NavLinks includes redesigned Home and Logout inside already */}
                            <NavLinks navItems={navItems} closeDrawer={() => setOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default SideDashboardLinks;