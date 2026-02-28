import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

// Floating blood drop
const FloatingDrop = ({ size, left, delay }) => (
    <motion.div
        className="absolute bg-[#d1224d] rounded-full"
        style={{
            width: size,
            height: size,
            left: left,
            bottom: '-30px', 
            zIndex: 0,
        }}
        animate={{
            y: [0, -800],       
            x: [0, 10, -10, 0],
            opacity: [0, 0.5, 1, 0.7, 0],
            scale: [0.8, 1, 0.8],
        }}
        transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: delay,
            repeatType: 'loop',
        }}
    />
);

const Banner = () => {
    return (
        <div className="relative overflow-hidden flex items-center">
            {/* Floating Blood Drops */}
            <FloatingDrop size={8} left="10%" delay={0} />
            <FloatingDrop size={12} left="25%" delay={1} />
            <FloatingDrop size={6} left="40%" delay={2} />
            <FloatingDrop size={10} left="60%" delay={1.5} />
            <FloatingDrop size={8} left="80%" delay={0.5} />
            <FloatingDrop size={10} left="70%" delay={0.7} />

            {/* Original Banner Content */}
            <div className='container mx-auto  relative z-10'>
                <div className='flex flex-col lg:flex-row items-center gap-12'>

                    {/* Banner Image */}
                    <motion.div className='flex-1 flex justify-center lg:justify-start order-1 lg:order-1'>
                        <img
                            src="/Banner.png"
                            alt="Blood Donation Banner"
                            className='max-w-full h-auto object-contain'
                        />
                    </motion.div>

                    {/* Banner Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.10 }}
                        className='flex-1 space-y-6 order-2 lg:order-2 text-center lg:text-left'
                    >
                        <h1 className='text-5xl lg:text-6xl font-bold text-[#0B2B3C] leading-tight'>
                            Save Lives, <br />
                            <span className='text-[#B32346]'>Donate Blood Today</span>
                        </h1>

                        <motion.p
                            className='text-gray-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            Every drop counts! Your blood donation can save up to 3 lives.
                            Join our community of heroes and make a difference today.
                        </motion.p>

                        {/* Animated Stats */}
                        <motion.div
                            className='flex justify-center lg:justify-start gap-8 mt-4'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <div className='text-center'>
                                <h2 className='text-3xl font-bold text-[#B32346]'>
                                    <CountUp start={0} end={1200} duration={2.8} separator="," />
                                </h2>
                                <p className='text-gray-500 mr-5'>Donors</p>
                            </div>
                            <div className='text-center'>
                                <h2 className='text-3xl font-bold text-[#B32346]'>
                                    <CountUp start={0} end={3400} duration={2.8} separator="," />
                                </h2>
                                <p className='text-gray-500'>Lives Saved</p>
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.button
                            className="relative overflow-hidden px-10 py-4 rounded-full text-white font-bold text-lg
                         bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] 
                         shadow-lg cursor-pointer transition-transform duration-200 mt-6"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-10 rounded-full pointer-events-none"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ transformOrigin: "left" }}
                            />
                            <span className="relative z-10">Donate Now</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Banner;