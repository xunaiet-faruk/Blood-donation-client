import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import SideDashboardLinks from "./SideDashboardLinks";

const DasboardLayout = () => {
    return (
        <div className="flex relative">
            {/* Sidebar */}
            <SideDashboardLinks />

            {/* Main content with floating animations */}
            <div className="flex-1 lg:ml-64 pt-16 lg:pt-6 p-6 bg-gray-50 relative overflow-hidden min-h-screen">
                {/* Floating animated circles */}
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute -top-32 -left-32 w-96 h-96 bg-[#B32346]/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#B32346]/10 rounded-full blur-3xl"
                />

                {/* Outlet renders the dashboard pages */}
                <Outlet />
            </div>
        </div>
    );
};

export default DasboardLayout;