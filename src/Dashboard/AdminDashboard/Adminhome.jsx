import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Authcontext } from "../../Authentication/Context/Authcontext";
import Useaxios from "../../Hooks/Useaxios";
import VolunteerContent from "../VolunteerDashboard/VolunteerContent";
import DonorContent from "../DonarDashboard/DonorContent";
import WelcomeSectionAdmin from "./WelcomeSectionAdmin";
import AdminDashbordOverview from "./AdminDashbordOverview";
import AdminanalysisChart from "./AdminanalysisChart";
import { FaTint, FaCalendarAlt, FaUser } from "react-icons/fa";
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
           
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const AdminContent = ({ stats, requests, user }) => {
    const primaryColor = "#B32346";

    return (
        <>
            <WelcomeSectionAdmin stats={stats} />
            <AdminDashbordOverview stats={stats} startCountUp={true} />

            {/* Recent requests */}
            <motion.div className="mt-6 ml-5 flex items-center gap-3">
                <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-8 bg-gradient-to-b from-[#B32346] to-transparent rounded-full"
                />
                <p className="text-gray-500 text-lg">
                    <span className="font-semibold text-[#B32346]">3 most recent</span> donation requests
                </p>
            </motion.div>

            {/* Recent Donation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {requests.map((req) => (
                    <motion.div
                        key={req._id}
                        whileHover={{ scale: 1.05, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="backdrop-blur-lg bg-white/70 border border-white/30 rounded-2xl shadow-lg p-6 border-l-4 border-[#B32346] hover:shadow-2xl transition-all"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-3">

                            <div className="flex items-center gap-2">
                                <FaUser className="text-[#B32346] text-lg" />
                                <h2 className="text-lg font-semibold">{req.recipientName}</h2>
                            </div>

                            {/* Status Badge */}
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full font-medium">
                                {req.status}
                            </span>

                        </div>

                        {/* Blood Group */}
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <FaTint className="text-red-500 animate-pulse" />
                            <p>
                                Blood Group:
                                <span className="font-semibold ml-1">
                                    {req?.bloodGroup || "N/A"}
                                </span>
                            </p>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <p>
                                Date:
                                <span className="font-semibold ml-1">
                                    {req?.donationDate || "N/A"}
                                </span>
                            </p>
                        </div>

                        {/* Extra text */}
                        <p className="text-sm text-gray-500 mt-3">
                            Donate blood and save lives ❤️
                        </p>

                    </motion.div>
                ))}
            </div>

            <AdminanalysisChart stats={stats} />
        </>
    );
};

const Adminhome = () => {
    const [requests, setRequests] = useState([]);
    const { user, userRole } = use(Authcontext);
    const [showCongrats, setShowCongrats] = useState(false);
    const [startCountUp, setStartCountUp] = useState(false);
    const axios = Useaxios();
    const [stats, setStats] = useState({
        totalDonors: 0,
        totalRequests: 0,
        pending: 0,
        inprogress: 0,
        done: 0,
        canceled: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/blood-request");
                const allRequests = res.data;
                setStats({
                    totalDonors: new Set(allRequests.map(r => r.email)).size,
                    totalRequests: allRequests.length,
                    pending: allRequests.filter(r => r.status === "pending").length,
                    inprogress: allRequests.filter(r => r.status === "inprogress").length,
                    done: allRequests.filter(r => r.status === "done").length,
                    canceled: allRequests.filter(r => r.status === "canceled").length
                });
            } catch (error) {
                console.error("Error fetching blood requests:", error);
            }
        };
        fetchStats();
    }, [axios]);

    useEffect(() => {
        axios.get("/blood-request")
            .then((res) => {
                const sortedRequests = res.data.sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
                setRequests(sortedRequests.slice(0, 3));
            })
            .catch((err) => console.error("Failed to load data:", err));
    }, [axios]);

    // Role-based content rendering
    const renderContent = () => {
        switch (userRole) {
            case 'admin':
                return <AdminContent stats={stats} requests={requests} user={user} />;  
            case 'volunteer':
                return <VolunteerContent stats={stats} user={user} />;  
            case 'donor':
                return <DonorContent stats={stats} user={user} />;      
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Congratulations Popup (আগের মতই থাকবে) */}
            {showCongrats && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                    {/* আপনার popup content */}
                </motion.div>
            )}

            {renderContent()}
        </div>
    );
};

export default Adminhome;