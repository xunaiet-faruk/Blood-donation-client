// src/components/DonorDashboard/DonorContent.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTint, FaCalendarAlt, FaUserMd, FaClock, FaMapMarkerAlt, FaArrowRight, FaGift, FaShieldAlt, FaAward } from 'react-icons/fa';

const DonorContent = ({ stats, user }) => {
    const navigate = useNavigate();
    const primaryColor = "#B32346";
    const secondaryColor = "#8B1E3A";

    // Tips Data
    const tips = [
        {
            id: 1,
            text: "Stay Hydrated",
            desc: "Drink plenty of water before donation",
            icon: "💧",
            color: "blue",
            glow: "shadow-blue-200"
        },
        {
            id: 2,
            text: "Good Sleep",
            desc: "Get 8 hours of sleep",
            icon: "😴",
            color: "purple",
            glow: "shadow-purple-200"
        },
        {
            id: 3,
            text: "Iron-rich Foods",
            desc: "Eat spinach, beans, and nuts",
            icon: "🥬",
            color: "green",
            glow: "shadow-green-200"
        },
        {
            id: 4,
            text: "Bring ID Card",
            desc: "Don't forget your identification",
            icon: "🪪",
            color: "orange",
            glow: "shadow-orange-200"
        }
    ];

    // Tip Colors Mapping
    const tipColors = {
        blue: {
            bg: "bg-blue-50",
            text: "text-blue-600",
            border: "border-blue-200",
            icon: "bg-blue-100",
            hover: "hover:bg-blue-100"
        },
        purple: {
            bg: "bg-purple-50",
            text: "text-purple-600",
            border: "border-purple-200",
            icon: "bg-purple-100",
            hover: "hover:bg-purple-100"
        },
        green: {
            bg: "bg-green-50",
            text: "text-green-600",
            border: "border-green-200",
            icon: "bg-green-100",
            hover: "hover:bg-green-100"
        },
        orange: {
            bg: "bg-orange-50",
            text: "text-orange-600",
            border: "border-orange-200",
            icon: "bg-orange-100",
            hover: "hover:bg-orange-100"
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const floatAnimation = {
        initial: { y: 0 },
        animate: {
            y: [-5, 5, -5],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const pulseAnimation = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const rotateAnimation = {
        initial: { rotate: 0 },
        animate: {
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const glowAnimation = {
        initial: { boxShadow: "0 0 0 rgba(179, 35, 70, 0)" },
        animate: {
            boxShadow: [
                "0 0 0 rgba(179, 35, 70, 0)",
                "0 0 20px rgba(179, 35, 70, 0.3)",
                "0 0 0 rgba(179, 35, 70, 0)"
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="p-4 lg:p-8 min-h-screen  relative overflow-hidden">
            {/* Animated Background Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#B32346] opacity-5"
                    style={{
                        width: `${50 + i * 30}px`,
                        height: `${50 + i * 30}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Header with Animated Underline */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative mb-8"
            >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                    Donor Dashboard
                </h1>
                <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#B32346] to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "150px" }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-gray-500 mt-4"
                >
                    Welcome back, <span className="font-semibold text-[#B32346]">{user?.displayName || "Hero"}</span>! Ready to save lives?
                </motion.p>
            </motion.div>

            {/* Welcome Card with 3D Effect */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden relative group cursor-pointer"
                    style={{ boxShadow: "0 20px 40px -15px rgba(179, 35, 70, 0.2)" }}
                >
                    {/* Shine Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />

                    <div className="p-8 relative">
                        {/* Floating Hearts */}
                        <motion.div
                            variants={floatAnimation}
                            animate="animate"
                            className="absolute top-4 right-4 text-4xl opacity-10"
                        >
                            ❤️
                        </motion.div>

                        <div className="flex items-center gap-4 mb-6">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B32346] to-[#8B1E3A] flex items-center justify-center shadow-lg"
                            >
                                <FaHeart className="text-4xl text-white" />
                            </motion.div>
                            <div>
                                <motion.h2
                                    animate={pulseAnimation.animate}
                                    className="text-3xl font-bold text-gray-800"
                                >
                                    Thank You!
                                </motion.h2>
                                <p className="text-gray-500">Your generosity saves lives</p>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Every drop of your blood can save up to three lives.
                            Your contribution brings hope to families and smiles to faces.
                        </p>

                        {/* Impact Badge */}
                        <motion.div
                            variants={glowAnimation}
                            animate="animate"
                            className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-[#B32346] to-[#8B1E3A] text-white px-6 py-3 rounded-xl"
                        >
                            <FaAward className="text-xl" />
                            <span className="font-semibold">247 lives saved this month</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quick Actions Card */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden"
                >
                    <motion.div
                        animate={rotateAnimation.animate}
                        className="absolute -right-10 -top-10 w-40 h-40 bg-[#B32346] opacity-5 rounded-full"
                    />

                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FaGift className="text-[#B32346]" />
                        Quick Actions
                    </h3>

                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                        >
                            <span className="flex items-center gap-3">
                                <FaTint className="text-[#B32346]" />
                                <span>View Donation History</span>
                            </span>
                            <FaArrowRight className="text-gray-400 group-hover:text-[#B32346] group-hover:translate-x-1 transition" />
                        </motion.button>

                        <motion.button
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                        >
                            <span className="flex items-center gap-3">
                                <FaCalendarAlt className="text-[#B32346]" />
                                <span>Schedule Appointment</span>
                            </span>
                            <FaArrowRight className="text-gray-400 group-hover:text-[#B32346] group-hover:translate-x-1 transition" />
                        </motion.button>

                        <motion.button
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                        >
                            <span className="flex items-center gap-3">
                                <FaShieldAlt className="text-[#B32346]" />
                                <span>Health Guidelines</span>
                            </span>
                            <FaArrowRight className="text-gray-400 group-hover:text-[#B32346] group-hover:translate-x-1 transition" />
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Tips Section with Animated Cards */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="bg-white rounded-3xl shadow-xl p-8 mb-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Donation Tips
                    </h2>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                                className="w-2 h-2 bg-[#B32346] rounded-full"
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tips.map((tip, idx) => {
                        const colors = tipColors[tip.color];
                        return (
                            <motion.div
                                key={tip.id}
                                initial={{ opacity: 0, y: 30, rotateY: 30 }}
                                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                transition={{
                                    delay: 0.6 + idx * 0.1,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{
                                    scale: 1.08,
                                    rotate: 2,
                                    boxShadow: "0 20px 30px -10px rgba(179, 35, 70, 0.2)"
                                }}
                                className={`${colors.bg} rounded-2xl p-6 border ${colors.border} cursor-pointer group relative overflow-hidden`}
                            >
                                {/* Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />

                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center text-3xl mb-4`}
                                    >
                                        {tip.icon}
                                    </motion.div>

                                    <h3 className={`font-bold ${colors.text} mb-2`}>
                                        {tip.text}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {tip.desc}
                                    </p>

                                    {/* Progress Dot */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: idx * 0.3
                                        }}
                                        className={`absolute bottom-4 right-4 w-2 h-2 rounded-full ${colors.text} bg-current`}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* CTA Button with Awesome Animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center relative"
            >
                {/* Background Rings */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="w-64 h-64 rounded-full border-2 border-[#B32346] opacity-20" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <div className="w-80 h-80 rounded-full border-2 border-[#B32346] opacity-10" />
                </motion.div>

                {/* Main Button */}
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 30px 40px -15px rgba(179, 35, 70, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard/create-donation-request')}
                    className="relative px-12 py-6 rounded-2xl text-white font-bold text-xl shadow-2xl group overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, #B32346)`,
                        backgroundSize: "200% 200%"
                    }}
                >
                    {/* Animated Gradient Background */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                `linear-gradient(225deg, ${primaryColor}, ${secondaryColor})`,
                                `linear-gradient(315deg, ${primaryColor}, ${secondaryColor})`,
                                `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Shine Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center gap-4">
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            🩸
                        </motion.span>

                        Create New Donation Request

                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </span>

                    {/* Floating Particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.span
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            animate={{
                                y: [0, -30, 0],
                                x: [0, (i % 2 === 0 ? 20 : -20), 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                            style={{
                                left: `${20 + i * 10}%`,
                                top: '50%'
                            }}
                        />
                    ))}
                </motion.button>

                {/* Supporting Text */}
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-6 text-gray-500"
                >
                    Click to create a new donation request and save lives! ✨
                </motion.p>
            </motion.div>

            {/* Floating Achievement Badge */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="fixed bottom-6 left-6 z-50"
                whileHover={{ scale: 1.1 }}
            >
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        y: [0, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-white rounded-full shadow-2xl p-3 pr-5 flex items-center gap-3 border-2 border-[#B32346]"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white">
                        🏆
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-800">Gold Donor</p>
                        <p className="text-xs text-gray-500">12 donations</p>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DonorContent;