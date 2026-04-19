import React from 'react';
import { motion } from 'framer-motion';

const missions = [
    {
        title: "Save Lives",
        description: "Every drop of blood you donate can save up to three lives. Join us to make a difference.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B32346]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
            </svg>
        )
    },
    {
        title: "Community Support",
        description: "We provide a platform for donors and recipients to connect and help each other.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B32346]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        )
    },
    {
        title: "Health Awareness",
        description: "Spreading awareness about the importance of blood donation and healthy lifestyle.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B32346]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-4H5v4h4zm6 0v-4h-4v4h4zm6 0v-4h-4v4h4z" />
            </svg>
        )
    },
    {
        title: "Emergency Response",
        description: "Quick response for urgent blood requests to save critical lives on time.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B32346]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18M3 12h18M3 16h18" />
            </svg>
        )
    },
    {
        title: "Volunteer Engagement",
        description: "Engaging volunteers to organize blood donation drives and awareness campaigns.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B32346]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2H6z" />
            </svg>
        )
    },
    {
        title: "Research & Education",
        description: "Supporting studies and educational programs about blood safety and donation.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B32346]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M12 4h9M4 8h16M4 16h16" />
            </svg>
        )
    },
];

const OurMission = () => {
    return (
        <section className="relative py-20 ">
            <div className="container mx-auto px-4">
              
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#B32346] mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        We are dedicated to saving lives, supporting the community, and spreading awareness about the importance of blood donation.
                    </p>
                </motion.div>

                {/* Mission Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {missions.map((mission, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative bg-white hover:shadow-[#B32346] border-l-2 border-[#d7214e]  shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                            style={{
                                borderRadius: "15px 50px", 
                            }}
                        >
                            {/* Decorative floating circle */}
                            <div className="absolute -top-5 -right-5 w-20 h-20 bg-[#B32346]  opacity-20 rounded-full"></div>

                            <div className="flex items-center space-x-4 mb-4">
                                {mission.icon}
                                <h3 className="text-xl font-bold text-[#0B2B3C]">{mission.title}</h3>
                            </div>
                            <p className="text-gray-600">{mission.description}</p>

                            {/* Small accent dots */}
                            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#B32346] opacity-20 rounded-full"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurMission;