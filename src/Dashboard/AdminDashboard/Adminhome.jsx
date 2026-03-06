// Dashboard/AdminDashboard/Adminhome.jsx
import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Authcontext } from "../../Authentication/Context/Authcontext";
import Useaxios from "../../Hooks/Useaxios";
import VolunteerContent from "../VolunteerDashboard/VolunteerContent";
import DonorContent from "../DonarDashboard/DonorContent";
import WelcomeSectionAdmin from "./WelcomeSectionAdmin";
import AdminDashbordOverview from "./AdminDashbordOverview";
import AdminanalysisChart from "./AdminanalysisChart";



// Admin Content - এটা এখানেই রাখুন (আলাদা ফাইলে নেবেন না)
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
                {requests.map((req, index) => (
                    <motion.div
                        key={req._id}
                        className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#B32346]"
                    >
                        <h2 className="text-lg font-semibold">{req.recipientName}</h2>
                        <p className="text-gray-500">Blood Group: {req?.bloodGroup || "N/A"}</p>
                        <p className="text-gray-500">Date: {req?.donationDate || "N/A"}</p>
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