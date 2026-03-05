import React, { use } from 'react';
import { Authcontext } from '../../Authentication/Context/Authcontext';
import { motion } from "framer-motion";

const WelcomeSectionAdmin = ({ stats }) => {
    const { user } = use(Authcontext)

    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative  w-full min-h-[300px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[300px] text-center lg:text-left  mt-5 rounded-2xl sm:rounded-3xl"
            >
                {/* Background decorative elements - scaled for full screen */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 bg-gradient-to-r from-[#B32346]/20 to-[#B32346]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 30, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-10 -right-10 w-72 sm:w-96 md:w-[450px] h-72 sm:h-96 md:h-[450px] bg-gradient-to-l from-[#B32346]/10 to-transparent rounded-full blur-3xl"
                />

                {/* Additional floating decorative elements for full screen */}
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, 20, 0],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/4 w-40 h-40 bg-[#B32346]/5 rounded-full blur-2xl hidden md:block"
                />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, -20, 0],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-[#D93B5C]/5 rounded-full blur-2xl hidden lg:block"
                />

                {/* Main content container - centered with max-width for better readability */}
                <div className="relative w-full h-full flex items-center justify-center lg:justify-center">
                    {/* Main welcome content with glass morphism */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 lg:py-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md shadow-2xl border border-white/30"
                    >
                        {/* Animated blood drop icons - repositioned for larger container */}
                        <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6 flex gap-1 sm:gap-2">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -12, 0],
                                        opacity: [0.5, 1, 0.5],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-[#B32346] text-xl sm:text-2xl md:text-3xl"
                                >
                                    💉
                                </motion.div>
                            ))}
                        </div>

                        {/* Welcome badge - adjusted for responsiveness */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="absolute -top-3 sm:-top-4 left-4 sm:left-6 bg-[#B32346] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
                        >
                            <motion.span
                                animate={{ opacity: [1, 0.8, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                👋 Welcome Back!
                            </motion.span>
                        </motion.div>

                        {/* Animated greeting text - responsive font sizes */}
                        <motion.div className="relative z-10">
                            <motion.h1
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: 0.2
                                }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3"
                            >
                                <span className="bg-gradient-to-r from-[#B32346] via-[#D93B5C] to-[#B32346] bg-clip-text text-transparent bg-size-200 animate-gradient">
                                    Welcome, Admin
                                </span>
                                <motion.span
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                    className="inline-block ml-2 text-3xl sm:text-4xl md:text-5xl"
                                >
                                    {user?.displayName?.charAt(0) || "U"}
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        ✨
                                    </motion.span>
                                </motion.span>
                            </motion.h1>

                            {/* Name with typing effect - responsive */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <motion.p
                                    animate={{
                                        textShadow: [
                                            "0 0 0px #B32346",
                                            "0 0 10px #B32346",
                                            "0 0 0px #B32346"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800"
                                >
                                    {user?.displayName || "Hero"}
                                    <motion.span
                                        animate={{ rotate: [0, 20, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="inline-block ml-2"
                                    >
                                        👑
                                    </motion.span>
                                </motion.p>
                            </motion.div>

                            {/* Stats highlight - responsive layout */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 bg-[#B32346]/10 px-3 sm:px-4 py-2 rounded-full w-full sm:w-auto justify-center sm:justify-start"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"
                                    />
                                    <span className="text-xs sm:text-sm font-medium text-gray-600">
                                        <span className="text-[#B32346] font-bold">{stats.totalRequests || 0}</span> Total Requests
                                    </span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 bg-[#B32346]/10 px-3 sm:px-4 py-2 rounded-full w-full sm:w-auto justify-center sm:justify-start"
                                >
                                    <motion.div
                                        animate={{
                                            backgroundColor: ["#F59E0B", "#FBBF24", "#F59E0B"]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                    />
                                    <span className="text-xs sm:text-sm font-medium text-gray-600">
                                        <span className="text-[#B32346] font-bold">{stats.pending || 0}</span> Pending
                                    </span>
                                </motion.div>

                                {/* Additional stat for larger screens */}
                                {stats.done > 0 && (
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="hidden md:flex items-center gap-2 bg-[#B32346]/10 px-4 py-2 rounded-full"
                                    >
                                        <motion.div
                                            animate={{
                                                backgroundColor: ["#10B981", "#34D399", "#10B981"]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-3 h-3 rounded-full"
                                        />
                                        <span className="text-sm font-medium text-gray-600">
                                            <span className="text-[#B32346] font-bold">{stats.done}</span> Completed
                                        </span>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Decorative pulse ring - scaled for larger container */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -inset-2 sm:-inset-3 border-2 border-[#B32346]/20 rounded-3xl sm:rounded-4xl"
                        />
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
};

export default WelcomeSectionAdmin;