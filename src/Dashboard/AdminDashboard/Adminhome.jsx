import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Authcontext } from "../../Authentication/Context/Authcontext";
import AdminDashbordOverview from "./AdminDashbordOverview";
import Useaxios from "../../Hooks/Useaxios";
import AdminanalysisChart from "./AdminanalysisChart";

const statusColor = (status) => {
    switch (status) {
        case "pending":
            return "bg-yellow-200 text-yellow-800";
        case "inprogress":
            return "bg-blue-200 text-blue-800";
        case "done":
            return "bg-green-200 text-green-800";
        case "canceled":
            return "bg-red-200 text-red-800";
        default:
            return "bg-gray-200 text-gray-800";
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0 },
    hover: { scale: 1.05, rotate: 1, y: -5 },
};

const Adminhome = () => {
    const [requests, setRequests] = useState([]);
    const { user } = use(Authcontext);
    const [showCongrats, setShowCongrats] = useState(false); // Initially false
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
                const res = await axios.get("http://localhost:5000/blood-request");
                const allRequests = res.data;
                const totalRequests = allRequests.length;
                const pending = allRequests.filter(r => r.status === "pending").length;
                const inprogress = allRequests.filter(r => r.status === "inprogress").length;
                const done = allRequests.filter(r => r.status === "done").length;
                const canceled = allRequests.filter(r => r.status === "canceled").length;
                const donorsSet = new Set(allRequests.map(r => r.email));
                const totalDonors = donorsSet.size;

                setStats({
                    totalDonors,
                    totalRequests,
                    pending,
                    inprogress,
                    done,
                    canceled
                });

            } catch (error) {
                console.error("Error fetching blood requests:", error);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        // Check if user has seen the congratulation message before
        const hasSeenCongrats = localStorage.getItem(`hasSeenCongrats_${user?.email}`);

        if (!hasSeenCongrats && user) {
            // If user hasn't seen it, show the animation
            setShowCongrats(true);

            // Set timer to hide animation
            const timer = setTimeout(() => {
                setShowCongrats(false);
                setStartCountUp(true);
                // Store in localStorage that user has seen it
                localStorage.setItem(`hasSeenCongrats_${user?.email}`, 'true');
            }, 1800);

            return () => clearTimeout(timer);
        } else {
            // If user has seen it before, directly start countup
            setStartCountUp(true);
        }
    }, [user]);

    useEffect(() => {
        fetch("/Recentdonation.json")
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.error("Failed to load data:", err));
    }, []);

    return (
        <div>
            {/* Pass startCountUp prop to AdminDashbordOverview */}
            <AdminDashbordOverview stats={stats} startCountUp={startCountUp} />

            <div className="p-6 lg:p-10">
                {showCongrats && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                    >
                        <motion.svg
                            className="absolute w-[600px] h-[600px] opacity-20"
                            viewBox="0 0 200 200"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            <circle cx="100" cy="100" r="40" fill="#B32346" />
                            <g stroke="#B32346" strokeWidth="3">
                                {[...Array(24)].map((_, i) => (
                                    <line
                                        key={i}
                                        x1="100"
                                        y1="10"
                                        x2="100"
                                        y2="0"
                                        transform={`rotate(${i * 15} 100 100)`}
                                    />
                                ))}
                            </g>
                        </motion.svg>

                        {/* Main Content */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="text-center"
                        >
                            <motion.h1
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-5xl lg:text-6xl font-extrabold text-[#B32346]"
                            >
                                🎉 Congratulations
                            </motion.h1>

                            <p className="mt-4 text-xl text-gray-600">
                                Welcome back {user?.displayName || "Hero"} 💖
                            </p>
                        </motion.div>

                        {/* Floating Confetti */}
                        {[...Array(20)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute w-3 h-3 rounded-full bg-[#B32346]"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight,
                                    opacity: 1,
                                }}
                                animate={{
                                    y: -100,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 2,
                                    delay: Math.random(),
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 text-center lg:text-left"
                >
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#B32346] mb-2">
                        Welcome, {user?.displayName || "User"}!
                    </h1>
                    <p className="text-gray-600">
                        Here are your 3 most recent donation requests.
                    </p>
                </motion.div>

                {/* Recent Donation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((req, index) => (
                        <motion.div
                            key={req.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 10,
                                delay: index * 0.2,
                            }}
                            className="bg-white rounded-xl shadow-md p-5 cursor-pointer"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold">{req.recipientName}</h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                                        req.status
                                    )}`}
                                >
                                    {req.status.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-gray-500 mb-1">
                                <strong>Location:</strong> {req.location}
                            </p>
                            <p className="text-gray-500 mb-1">
                                <strong>Blood Group:</strong> {req.bloodGroup}
                            </p>
                            <p className="text-gray-500 mb-1">
                                <strong>Date:</strong> {req.donationDate}
                            </p>
                            <p className="text-gray-500">
                                <strong>Time:</strong> {req.donationTime}
                            </p>

                            <div className="mt-4 flex justify-between">
                                <button className="bg-[#B32346] text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">
                                    View
                                </button>
                                {req.status === "inprogress" && (
                                    <div className="flex gap-2">
                                        <button className="bg-green-200 text-green-800 px-3 py-1 rounded-lg text-sm hover:bg-green-300 transition">
                                            Done
                                        </button>
                                        <button className="bg-red-200 text-red-800 px-3 py-1 rounded-lg text-sm hover:bg-red-300 transition">
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AdminanalysisChart stats={stats} />
        </div>
    );
};

export default Adminhome;