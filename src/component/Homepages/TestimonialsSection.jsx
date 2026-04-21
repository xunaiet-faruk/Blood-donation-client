import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    FaHeart,
    FaHandHoldingHeart,
    FaQuoteLeft,
    FaQuoteRight,
    FaChevronCircleLeft,
    FaChevronCircleRight,
    FaRegClock,
    FaCheckCircle,
    FaHospital,
    FaUsers,
    FaAward,
    FaPlay,
    FaPause,
    FaTint  
} from 'react-icons/fa';



const TestimonialsSectionV2 = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

    const testimonials = [
        {
            id: 1,
            name: "Dr. James Wilson",
            role: "Emergency Physician",
            bloodType: "O-",
            donations: 45,
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
            text: "As an ER doctor, I've witnessed countless moments where blood donations made the difference between life and death. Every donor is a hero in my book. The selfless act of giving blood ripples through our community in ways most don't realize.",
            impact: "Saved over 135 lives",
            badge: "Medical Professional",
            date: "Active Donor since 2015"
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Thalassemia Warrior",
            bloodType: "B+",
            donations: 0,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
            text: "Regular blood transfusions keep me alive. To all the donors out there - you are my lifeline. Your generosity gives me the gift of life every month. I'm living proof that blood donation saves lives.",
            impact: "Requires monthly transfusions",
            badge: "Recipient",
            date: "Forever Grateful"
        },
        {
            id: 3,
            name: "Marcus Thompson",
            role: "Firefighter & Donor Ambassador",
            bloodType: "A+",
            donations: 28,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            text: "After responding to a major accident where blood supplies ran critically low, I made a promise to donate regularly. Now I organize donation drives at our fire station. Every drop truly counts when seconds matter most.",
            impact: "Organized 15+ donation drives",
            badge: "First Responder",
            date: "3 years of service"
        },
        {
            id: 4,
            name: "Emma Williams",
            role: "Cancer Survivor",
            bloodType: "AB+",
            donations: 0,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
            text: "During my chemotherapy, I needed multiple blood transfusions. Strangers saved my life, and now I'm cancer-free and can't wait to give back. Next month, I'll make my first donation as a healthy survivor!",
            impact: "Received 12 transfusions",
            badge: "Survivor Turned Donor",
            date: "Celebrating 2 years cancer-free"
        },
        {
            id: 5,
            name: "Carlos Mendez",
            role: "Blood Donation Record Holder",
            bloodType: "O+",
            donations: 102,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            text: "I started donating when I was 18, and now at 52, I've never missed a donation window. It's become my monthly ritual - 45 minutes of my time to potentially save three lives. Best decision I ever made.",
            impact: "102 donations and counting",
            badge: "Golden Donor",
            date: "34 years of giving"
        }
    ];

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 6000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, testimonials.length]);

    const handlePrev = () => {
        setIsPlaying(false);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsPlaying(true), 5000);
    };

    const handleNext = () => {
        setIsPlaying(false);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsPlaying(true), 5000);
    };

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Parallax Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                  

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B32346] mb-6">
                        Stories That{' '}
                        <span className="">
                            Inspire
                         
                        </span>
                    </h2>

                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                        Every donation tells a story of hope, courage, and community.
                        Here are the voices that drive our mission forward.
                    </p>
                </motion.div>

                {/* Main Testimonial Display */}
                <div className="relative">
                    {/* Background Card Effect */}
                    <div className="absolute inset-0  rounded-3xl blur-3xl" />

                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                                transition={{ duration: 0.6, type: "spring", damping: 20 }}
                                className="p-8 md:p-12"
                            >
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    {/* Left Side - Visual */}
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="relative"
                                    >
                                        <div className="relative inline-block">
                                            <motion.div
                                                className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full blur-2xl opacity-50"
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                }}
                                            />
                                            <img
                                                src={testimonials[activeIndex].image}
                                                alt={testimonials[activeIndex].name}
                                                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-2xl mx-auto"
                                            />
                                            <motion.div
                                                className="absolute -bottom-4 -right-4 bg-gradient-to-br  bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] rounded-full p-3 shadow-lg"
                                                whileHover={{ scale: 1.1, rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <FaHeart className="text-white text-2xl" />
                                            </motion.div>
                                        </div>

                                        {/* Badge */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.4, type: "spring" }}
                                            className="absolute top-0 left-0  bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                                        >
                                            {testimonials[activeIndex].badge}
                                        </motion.div>

                                        {/* Stats Cards */}
                                        <div className="mt-8 space-y-3">
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-black ">Blood Type</span>
                                                    <span className="text-[#B32346] font-bold text-xl">{testimonials[activeIndex].bloodType}</span>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="bg-white/20 rounded-lg p-3 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-black">Donations</span>
                                                    <span className="text-[#B32346] font-bold text-xl">{testimonials[activeIndex].donations}</span>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Right Side - Content */}
                                    <motion.div
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <FaQuoteLeft className="text-red-400/30 text-6xl mb-4" />

                                        <p className="text-[#B32346]  text-xl md:text-2xl leading-relaxed mb-6">
                                            "{testimonials[activeIndex].text}"
                                        </p>

                                        <FaQuoteRight className="text-red-400/30 text-6xl ml-auto mb-6" />

                                        <div className="border-t border-white/20 pt-6 mt-6">
                                            <h3 className="text-2xl font-bold text-black mb-1">
                                                {testimonials[activeIndex].name}
                                            </h3>
                                            <p className="text-red-300 font-semibold mb-2">
                                                {testimonials[activeIndex].role}
                                            </p>

                                            <div className="flex items-center gap-4 mb-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-green-500/20 text-black px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    <FaCheckCircle />
                                                    {testimonials[activeIndex].impact}
                                                </motion.div>
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <FaRegClock />
                                                    {testimonials[activeIndex].date}
                                                </div>
                                            </div>

                                            {/* Impact Progress Bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between text-sm text-gray-700 mb-2">
                                                    <span>Community Impact</span>
                                                    <span>{Math.min(100, (testimonials[activeIndex].donations / 100) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.min(100, (testimonials[activeIndex].donations / 100) * 100)}%` }}
                                                        transition={{ duration: 1, delay: 0.8 }}
                                                        className="bg-gradient-to-r from-red-500 to-red-700 h-full rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                            <button
                                onClick={handlePrev}
                                className="pointer-events-auto bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 group"
                            >
                                <FaChevronCircleLeft className="text-3xl group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="pointer-events-auto bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 group"
                            >
                                <FaChevronCircleRight className="text-3xl group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                      
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex justify-center gap-3 mt-8 flex-wrap">
                        {testimonials.map((testimonial, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => {
                                    setIsPlaying(false);
                                    setActiveIndex(idx);
                                    setTimeout(() => setIsPlaying(true), 5000);
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative transition-all duration-300 ${idx === activeIndex
                                    ? 'ring-4 ring-red-500 scale-110'
                                    : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className={`absolute inset-0 rounded-full ${idx === activeIndex ? 'bg-red-500/20' : ''
                                    }`} />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Impact Statistics Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-42 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { icon: FaHospital, value: "50,000+", label: "Lives Impacted", color: "from-blue-500 to-blue-700" },
                        { icon: FaUsers, value: "15,000+", label: "Active Donors", color: "from-green-500 to-green-700" },
                        { icon: FaTint, value: "25,000+", label: "Units Donated", color: "from-red-500 to-red-700" },
                        { icon: FaAward, value: "500+", label: "Awards Given", color: "from-yellow-500 to-orange-700" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white shadow-2xl backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
                        >
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                                <stat.icon className="text-white text-2xl" />
                            </div>
                            <h4 className="text-2xl md:text-3xl font-bold text-[#B32346]  mb-1">{stat.value}</h4>
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>


            </div>
        </section>
    );
};

export default TestimonialsSectionV2;