import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center  p-5">

         
            <motion.img
                src="/404.png"
                alt="Error 404"
                className="w-80 md:w-96 mb-8"
              
            />

            {/* Error Text */}
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-[#B32346] mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Oops! Page Not Found
            </motion.h1>

            <motion.p
                className="text-gray-600 mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                The page you are looking for might have been removed or is temporarily unavailable.
            </motion.p>

            {/* Back Button - Go One Step Back */}
            <motion.button
                onClick={() => navigate(-1)} 
                className="px-6 py-3 cursor-pointer bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] text-white font-bold rounded-lg shadow-lg flex items-center gap-2 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    className="absolute inset-0 bg-white opacity-10 rounded-lg pointer-events-none"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                />
                <span className="relative z-10">Back</span>
            </motion.button>
        </div>
    );
};

export default Error;