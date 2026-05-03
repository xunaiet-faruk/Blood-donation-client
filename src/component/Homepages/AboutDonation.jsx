import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserMd, FaClock, FaTint } from "react-icons/fa";

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            type: "spring",
            stiffness: 120,
        },
    }),
};

const AboutDonation = () => {
    const cards = [
        { icon: <FaClock />, title: "90 Days", desc: "Safe Donation Interval" },
        { icon: <FaHeartbeat />, title: "3 Lives", desc: "Saved Per Donation" },
        { icon: <FaTint />, title: "1 Unit", desc: "Separated Into Components" },
        { icon: <FaUserMd />, title: "2 Seconds", desc: "Someone Needs Blood" },
    ];

    return (
        <section className="relative my-20 py-12 bg-gradient-to-br rounded-3xl to-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B32346] mb-6">
                            Why Blood Donation Matters
                        </h2>

                        <p className="text-gray-600 text-base md:text-lg mb-8">
                            Blood donation is a powerful act of humanity.
                            A single contribution can create a ripple of hope,
                            healing, and survival for families in crisis.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Essential for surgeries and emergencies.",
                                "Donate safely every 90 days.",
                                "One bag can save up to three lives.",
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#B32346] text-white font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="text-gray-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - Cards */}
                    <div className="relative flex flex-col gap-5">
                        {cards.map((card, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.04, y: -5 }}
                                className="relative group bg-white/70 backdrop-blur-md border border-gray-100 shadow-md rounded-2xl px-6 py-5 transition duration-300"
                            >
                                <div className="flex items-center gap-4">

                                    {/* Always Pulsing Icon */}
                                    <motion.div
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.3, 
                                        }}
                                        className="w-12 h-12 flex items-center justify-center text-xl text-[#B32346] bg-[#B32346]/10 rounded-xl"
                                    >
                                        {card.icon}
                                    </motion.div>

                                    {/* Card Text */}
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0B2B3C] leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {card.desc}
                                        </p>
                                    </div>

                                </div>

                                {/* Subtle hover glow */}
                                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#B32346]/40 transition duration-300"></div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Background Floating Blobs */}
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
        </section>
    );
};

export default AboutDonation;