
import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Authcontext } from "../Authentication/Context/Authcontext";


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

const Dasboard = () => {
    const [requests, setRequests] = useState([]);
    const { user } = use(Authcontext);
    const [showCongrats, setShowCongrats] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCongrats(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        fetch("/Recentdonation.json")
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.error("Failed to load data:", err));
    }, []);
    return (
        <div>
            <div className="p-6 lg:p-10  min-h-screen">
                {showCongrats && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                    >
                        {/* Animated Background SVG Burst */}
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
        </div>
    );
};

export default Dasboard;