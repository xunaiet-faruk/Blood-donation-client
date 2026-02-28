import React from 'react';
import { motion } from "framer-motion";
const PrimaryButton = ({ text, icon, onClick, type = "button" }) => {
    return (
        <div>
            <motion.button
                type={type}
                onClick={onClick}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-bold 
                 bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] 
                 shadow-lg relative overflow-hidden cursor-pointer transition-transform duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Hover Overlay Effect */}
                <motion.div
                    className="absolute inset-0 bg-white opacity-10 rounded-lg pointer-events-none "
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                />

                {/* Icon + Text */}
                {icon && <span className="text-lg">{icon}</span>}
                <span className="relative z-10">{text}</span>
            </motion.button>
        </div>
    );
};

export default PrimaryButton;