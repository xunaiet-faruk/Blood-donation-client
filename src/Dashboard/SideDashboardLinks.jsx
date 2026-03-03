import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserAlt, FaUsers, FaBars, FaHandHoldingHeart, FaClipboardList, FaPlusCircle, FaCog, FaTimes } from "react-icons/fa";
import { Authcontext } from "../Authentication/Context/Authcontext";
import Useaxios from "../Hooks/Useaxios";


const SideDashboardLinks = () => {
    const [open, setOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(Authcontext);
    const axios = Useaxios();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    
                    const response = await axios.get(`/register/${user.email}`);
                    console.log("User data from MongoDB:", response.data);
                    setUserRole(response.data.role);
                    console.log(response.data);
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

  
   

    const allNavItems = [
        { name: "Home", path: "/", icon: <FaHome /> },

        // Admin dashboard links
        { name: "Dashboard", path: "/dashboard", icon: <FaUserAlt /> },
        { name: "All Users", path: "/dashboard/allusers", icon: <FaUsers /> },
        { name: "All Blood Donation Requests", path: "/dashboard/all-blood-donation-request", icon: <FaClipboardList /> },

        // Volunteer dashboard links
        { name: "Assigned Donation Requests", path: "/dashboard/all-blood-donation-request", icon: <FaHandHoldingHeart /> },

        // Donor dashboard links
        { name: "Profile", path: "/dashboard/profile", icon: <FaUserAlt /> },
        { name: "Donation Requests", path: "/dashboard/donation-requests", icon: <FaClipboardList /> },
        { name: "Create Donation Request", path: "/dashboard/create-donation-request", icon: <FaPlusCircle /> },
    ];

    const navItems = allNavItems.filter(item => {
        // Home সবাই দেখবে
        if (item.path === "/") return true;

        // যদি user না থাকে বা role না থাকে, তাহলে শুধু Home দেখাবে
        if (!user || !userRole) return false;

        // Admin role এর জন্য
        if (userRole === "admin") {
            return [
                "/dashboard",
                "/dashboard/allusers",
                "/dashboard/all-blood-donation-request"
            ].includes(item.path);
        }

        // Volunteer role এর জন্য
        if (userRole === "volunteer") {
            return [
                "/dashboard",
                "/dashboard/all-blood-donation-request"
            ].includes(item.path);
        }

        // Donor role এর জন্য 
        if (userRole === "donor") {
            return [
                "/dashboard/profile",
                "/dashboard/donation-requests",
                "/dashboard/create-donation-request"
            ].includes(item.path);
        }

        return false;
    });

    
    if (loading) {
        return (
            <div className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B32346]"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
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
            {user && navItems.length > 0 && (
                <div className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 flex-col">
                    <h2 className="text-2xl font-bold text-[#B32346] mb-8">
                        {userRole === "donor" ? "Donor Menu" :
                            userRole === "admin" ? "Admin Menu" :
                                userRole === "volunteer" ? "Volunteer Menu" : "Menu"}
                    </h2>
                    <NavLinks navItems={navItems} />
                </div>
            )}

            {/* Mobile Drawer */}
            <AnimatePresence>
                {open && user && navItems.length > 0 && (
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
                            className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 p-6"
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

                            <NavLinks navItems={navItems} closeDrawer={() => setOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const NavLinks = ({ navItems, closeDrawer }) => {
    return (
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
    );
};

export default SideDashboardLinks;