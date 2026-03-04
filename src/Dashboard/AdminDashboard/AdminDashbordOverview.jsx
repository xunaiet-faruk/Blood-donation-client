// AdminDashbordOverview.jsx
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaClipboardList, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const cardVariants = {
    hover: {
        scale: 1.05,
        y: -5,
        boxShadow: "0px 20px 40px rgba(179, 35, 70, 0.2)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15
        }
    },
    initial: {
        scale: 1,
        y: 0,
        boxShadow: "0px 5px 15px rgba(179, 35, 70, 0.1)"
    },
};

const iconVariants = {
    hover: {
        rotate: [0, 10, -10, 0],
        scale: 1.2,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

const AdminDashbordOverview = ({ stats, startCountUp }) => {
    const cards = [
        {
            title: "Total Donors",
            count: stats.totalDonors,
            icon: <FaUsers size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#B32346] to-[#8B1A38]",
            iconBg: "bg-white/20",
        },
        {
            title: "Total Requests",
            count: stats.totalRequests,
            icon: <FaClipboardList size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#D93B5C] to-[#B32346]",
            iconBg: "bg-white/20",
        },
        {
            title: "Pending Requests",
            count: stats.pending,
            icon: <FaClock size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#fef08a] to-[#D97706]",
            iconBg: "bg-white/20",
        },
        {
            title: "In Progress",
            count: stats.inprogress,
            icon: <FaClipboardList size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#bfdbfe] to-[#2563EB]",
            iconBg: "bg-white/20",
        },
        {
            title: "Done",
            count: stats.done,
            icon: <FaCheckCircle size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#fecaca] to-[#059669]",
            iconBg: "bg-white/20",
        },
        {
            title: "Canceled",
            count: stats.canceled,
            icon: <FaTimesCircle size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#EF4444] to-[#DC2626]",
            iconBg: "bg-white/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className={`${card.gradient} p-6 rounded-2xl text-white flex items-center gap-4 cursor-pointer shadow-lg backdrop-blur-sm`}
                    layout
                >
                    <motion.div
                        variants={iconVariants}
                        className={`p-4 rounded-xl ${card.iconBg} backdrop-blur-sm`}
                    >
                        {card.icon}
                    </motion.div>
                    <div>
                        <p className="text-sm opacity-90 font-medium">{card.title}</p>
                        <h2 className="text-3xl font-bold">
                            {startCountUp ? (
                                <CountUp
                                    start={0}
                                    end={card.count}
                                    duration={2}
                                    separator=","
                                    delay={0.2}
                                />
                            ) : (
                                <span>0</span>
                            )}
                        </h2>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AdminDashbordOverview;