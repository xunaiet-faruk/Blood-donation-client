// src/components/VolunteerDashboard/VolunteerContent.jsx
import React from 'react';
import { motion } from 'framer-motion';

const VolunteerContent = ({ stats, user }) => {
    const primaryColor = "#B32346";
    const secondaryColor = "#8B1E3A";

    return (
        <div className="p-6 space-y-8">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-8 border-[#B32346]"
            >
                <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
                        Welcome, {user?.displayName || "Volunteer"}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        You're making a difference in someone's life today.
                    </p>
                </motion.div>
            </motion.div>

            

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
            >
                <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                    >
                        <span className="text-2xl">🩸</span>
                        <span className="font-medium">View Assigned Requests</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition"
                    >
                        <span className="text-2xl">📞</span>
                        <span className="font-medium">Contact Recipients</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl"
            >
                <p className="text-lg italic text-gray-700">
                    "The best way to find yourself is to lose yourself in the service of others."
                </p>
                <p className="mt-2 font-semibold" style={{ color: primaryColor }}>
                    - Mahatma Gandhi
                </p>
            </motion.div>
        </div>
    );
};

export default VolunteerContent;