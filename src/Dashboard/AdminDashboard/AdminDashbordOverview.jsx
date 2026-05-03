import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
    FaUsers,
    FaClipboardList,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaHeartbeat,
    FaTint,
    FaHandHoldingHeart,
    FaSpinner,
    FaUserCheck,
    FaUserClock,
    FaUserTimes
} from "react-icons/fa";
import { GiDroplets, GiHealthNormal } from "react-icons/gi";

const cardVariants = {
    hover: (custom) => ({
        scale: 1.05,
        y: -8,
        boxShadow: "0px 25px 50px rgba(0,0,0,0.3)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
        }
    }),
    initial: {
        scale: 1,
        y: 0,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
    },
};

const iconVariants = {
    totalDonors: {
        hover: {
            scale: [1, 1.3, 1.2],
            rotate: [0, 360, 360],
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    },
    totalRequests: {
        hover: {
            scale: [1, 1.2, 1.1],
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    },
    pending: {
        hover: {
            scale: [1, 1.3, 1.2],
            rotate: [0, 15, -15, 0],
            transition: {
                duration: 0.7,
                ease: "easeInOut"
            }
        }
    },
    inprogress: {
        hover: {
            scale: [1, 1.2, 1.1],
            rotate: [0, 360, 360],
            transition: {
                duration: 1,
                ease: "linear"
            }
        }
    },
    done: {
        hover: {
            scale: [1, 1.4, 1.2, 1.3, 1.1],
            y: [0, -5, 0, -3, 0],
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    },
    canceled: {
        hover: {
            scale: [1, 1.2, 0.9, 1.1],
            rotate: [0, 10, -10, 5, -5, 0],
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    }
};


const backgroundVariants = {
    hover: (custom) => ({
        backgroundPosition: ["0% 0%", "100% 100%"],
        transition: {
            duration: 0.8,
            ease: "easeInOut"
        }
    })
};

const AdminDashbordOverview = ({ stats, startCountUp }) => {
    const cards = [
        {
            title: "Total Donors",
            count: stats.totalDonors,
            icon: <FaUsers size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#B32346] via-[#D93B5C] to-[#8B1A38] bg-size-200 bg-pos-0",
            iconBg: "bg-white/20 backdrop-blur-sm",
            iconAnimation: "totalDonors",
            borderGlow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-pink-500 before:to-red-500 before:opacity-0 before:transition-opacity hover:before:opacity-30",
            icon: <FaUsers size={28} className="text-white" />,
            lightEffect: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
        },
        {
            title: "Total Requests",
            count: stats.totalRequests,
            icon: <FaClipboardList size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#D93B5C] via-[#B32346] to-[#8B1A38] bg-size-200 bg-pos-0",
            iconBg: "bg-white/20 backdrop-blur-sm",
            iconAnimation: "totalRequests",
            borderGlow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:opacity-0 before:transition-opacity hover:before:opacity-30",
            lightEffect: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
        },
        {
            title: "Pending Requests",
            count: stats.pending,
            icon: <FaClock size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#FBBF24] via-[#F59E0B] to-[#D97706] bg-size-200 bg-pos-0",
            iconBg: "bg-white/20 backdrop-blur-sm",
            iconAnimation: "pending",
            borderGlow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-yellow-400 before:to-orange-500 before:opacity-0 before:transition-opacity hover:before:opacity-30",
            lightEffect: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
        },
        {
            title: "In Progress",
            count: stats.inprogress,
            icon: <GiDroplets size={32} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#2563EB] bg-size-200 bg-pos-0",
            iconBg: "bg-white/20 backdrop-blur-sm",
            iconAnimation: "inprogress",
            borderGlow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-blue-400 before:to-indigo-500 before:opacity-0 before:transition-opacity hover:before:opacity-30",
            lightEffect: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
        },
        {
            title: "Completed",
            count: stats.done,
            icon: <FaCheckCircle size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#34D399] via-[#10B981] to-[#059669] bg-size-200 bg-pos-0",
            iconBg: "bg-white/20 backdrop-blur-sm",
            iconAnimation: "done",
            borderGlow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-green-400 before:to-emerald-500 before:opacity-0 before:transition-opacity hover:before:opacity-30",
            lightEffect: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
        },
        {
            title: "Canceled",
            count: stats.canceled,
            icon: <FaTimesCircle size={28} className="text-white" />,
            gradient: "bg-gradient-to-br from-[#F87171] via-[#EF4444] to-[#DC2626] bg-size-200 bg-pos-0",
            iconBg: "bg-white/20 backdrop-blur-sm",
            iconAnimation: "canceled",
            borderGlow: "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-red-400 before:to-rose-500 before:opacity-0 before:transition-opacity hover:before:opacity-30",
            lightEffect: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000"
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    className={`${card.gradient} p-6 rounded-2xl text-white flex items-center gap-4 cursor-pointer shadow-lg backdrop-blur-sm relative overflow-hidden ${card.borderGlow} ${card.lightEffect}`}
                    style={{
                        backgroundSize: "200% 200%",
                    }}
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    layout
                >
                   
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                            background: [
                                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            ]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                 
                    <motion.div
                        variants={iconVariants[card.iconAnimation]}
                        className={`p-4 rounded-xl ${card.iconBg} backdrop-blur-sm relative z-10`}
                        whileHover="hover"
                    >
                        {card.icon}

                        <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-white/30"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>

                    <div className="relative z-10">
                        <p className="text-sm opacity-90 font-medium mb-1">{card.title}</p>
                        <h2 className="text-3xl font-bold">
                            {startCountUp ? (
                                <CountUp
                                    start={0}
                                    end={card.count}
                                    duration={2.5}
                                    separator=","
                                    delay={0.2}
                                    useEasing={true}
                                >
                                    {({ countUpRef, start }) => (
                                        <motion.span
                                            ref={countUpRef}
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                textShadow: [
                                                    "0 0 0px rgba(255,255,255,0)",
                                                    "0 0 10px rgba(255,255,255,0.5)",
                                                    "0 0 0px rgba(255,255,255,0)",
                                                ]
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                repeatDelay: 3
                                            }}
                                        />
                                    )}
                                </CountUp>
                            ) : (
                                <motion.span
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    0
                                </motion.span>
                            )}
                        </h2>
                    </div>

                    {/* ডেকোরেটিভ এলিমেন্ট */}
                    <motion.div
                        className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute -top-4 -left-4 w-16 h-16 bg-white/5 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default AdminDashbordOverview;