import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
    FaPaperPlane,
    FaUser,
    FaComment,
    FaHeadset,
    FaHeart,
    FaTint,
    FaShieldAlt,
    FaAmbulance,
    FaCheckCircle
} from 'react-icons/fa';
import { MdBloodtype, MdEmergency, MdMessage } from 'react-icons/md';
import { BiDroplet } from 'react-icons/bi';
import { BsFillHeartPulseFill } from 'react-icons/bs';
import PrimaryButton from '../../../shared/PrimaryButton';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 2000);
    };

    // Animation variants
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
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="min-h-screen  overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Floating Blood Drops */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            rotate: [0, 15, -15, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    >
                        <BiDroplet className="w-12 h-12 text-red-400/20" />
                    </motion.div>
                ))}

                {/* Pulse Rings */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.3, 0.2, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                    className="absolute -top-20 -right-20 w-64 h-64rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.3, 0.2, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: 1,
                        ease: "easeOut"
                    }}
                    className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        animate={floatingAnimation}
                        className='flex justify-center items-center'
                    >
                        <FaHeadset className="w-5 h-5" />
                        <PrimaryButton text={"Get In Touch"}/>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        animate={pulseAnimation}
                    >
                        <span className="bg-[#B32346] bg-clip-text text-transparent">
                            Contact Us
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Have questions about blood donation? Need emergency blood support?
                        We're here 24/7 to help save lives together.
                    </motion.p>
                </motion.div>

                {/* Emergency Contact Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <div className="bg-gray-100 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="relative px-6 py-8 md:py-10">
                            {/* Animated Background Pattern */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-10"
                            >
                                <div className="absolute inset-0" style={{
                                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E\")",
                                    backgroundSize: "40px 40px"
                                }}></div>
                            </motion.div>

                            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="bg-white/20 p-4 rounded-full"
                                    >
                                        <MdEmergency className="w-10 h-10 text-yellow-300" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold  mb-1">Emergency Need Blood?</h3>
                                        <p className="text-gray-400">24/7 Emergency Blood Support Available</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <motion.a
                                        href="tel:+880123456789"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-white text-[#B32346] px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <FaPhone className="w-5 h-5" />
                                        +880 1234 567 890
                                    </motion.a>
                                    <motion.a
                                        href="tel:+880987654321"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-red-400 transition-all"
                                    >
                                        <FaAmbulance className="w-5 h-5" />
                                        Emergency
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Info Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                    {[
                        { icon: FaMapMarkerAlt, title: 'Visit Us', info: '123 Blood Donation Center, Dhaka, Bangladesh', color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
                        { icon: FaPhone, title: 'Call Us', info: '+880 1234 567 890\n+880 9876 543 210', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
                        { icon: FaEnvelope, title: 'Email Us', info: 'info@blooddonation.com\nsupport@blooddonation.com', color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
                        { icon: FaClock, title: 'Working Hours', info: '24/7 Emergency Support\nMon-Fri: 9AM - 6PM', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`${item.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} text-white mb-4`}
                            >
                                <item.icon className="w-6 h-6" />
                            </motion.div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm whitespace-pre-line">{item.info}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Contact Section */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative overflow-hidden"
                    >
                        {/* Form Background Animation */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                opacity: [0.05, 0.1, 0.05]
                            }}
                            transition={{ duration: 15, repeat: Infinity }}
                            className="absolute inset-0"
                            style={{
                                background: "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
                            }}
                        />

                        <div className="relative">
                            <motion.h2
                                className="text-2xl font-bold text-gray-800 mb-2"
                                animate={pulseAnimation}
                            >
                                Send Us a Message
                            </motion.h2>
                            <p className="text-gray-600 mb-6">
                                We'll get back to you as soon as possible
                            </p>

                            {/* Success Message */}
                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                                    >
                                        <FaCheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-green-700">Message sent successfully! We'll contact you soon.</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <MdMessage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="Blood Donation Inquiry"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Message
                                    </label>
                                    <div className="relative">
                                        <FaComment className="absolute left-4 top-6 transform -translate-y-1/2 text-gray-400" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="Tell us how we can help..."
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Map & Social Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Map */}
                        <div className="bg-white rounded-3xl shadow-2xl p-6 overflow-hidden">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-600" />
                                Our Location
                            </h3>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="rounded-xl overflow-hidden h-64 bg-gray-200 relative"
                            >
                                {/* Google Maps Embed - Replace with your actual map */}
                                <iframe
                                    title="location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223924372!2d90.27923772210494!3d23.78088745617476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </motion.div>
                        </div>

                        {/* Social Connect */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732] rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-10"
                            >
                                <div className="absolute inset-0" style={{
                                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E\")",
                                    backgroundSize: "40px 40px"
                                }}></div>
                            </motion.div>

                            <div className="relative">
                                <motion.h3
                                    className="text-2xl font-bold mb-4"
                                    animate={pulseAnimation}
                                >
                                    Connect With Us
                                </motion.h3>
                                <p className="text-white/90 mb-6">
                                    Follow us on social media for updates on blood donation camps and emergency alerts
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { icon: FaFacebook, color: 'bg-blue-600', hover: 'hover:bg-blue-700', link: 'https://facebook.com' },
                                        { icon: FaTwitter, color: 'bg-blue-400', hover: 'hover:bg-blue-500', link: 'https://twitter.com' },
                                        { icon: FaLinkedin, color: 'bg-blue-700', hover: 'hover:bg-blue-800', link: 'https://linkedin.com' },
                                        { icon: FaInstagram, color: 'bg-pink-600', hover: 'hover:bg-pink-700', link: 'https://instagram.com' },
                                        { icon: FaYoutube, color: 'bg-red-600', hover: 'hover:bg-red-700', link: 'https://youtube.com' }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`${social.color} ${social.hover} p-4 rounded-xl shadow-lg transition-all duration-300`}
                                        >
                                            <social.icon className="w-6 h-6" />
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Donation Stats */}
                                <motion.div
                                    className="mt-8 grid grid-cols-3 gap-4"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {[
                                        { icon: FaHeart, value: '10K+', label: 'Lives Saved' },
                                        { icon: FaTint, value: '5K+', label: 'Donations' },
                                        { icon: FaShieldAlt, value: '100%', label: 'Safe' }
                                    ].map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="text-center"
                                        >
                                            <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                                            <div className="text-xl font-bold">{stat.value}</div>
                                            <div className="text-xs text-white/80">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Quick Support */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-red-100 p-3 rounded-xl"
                            >
                                <FaHeadset className="w-8 h-8 text-[#B32346]" />
                            </motion.div>
                            <div>
                                <h4 className="font-bold text-gray-800">Need Quick Support?</h4>
                                <p className="text-sm text-gray-600">Our team is available 24/7 for emergency assistance</p>
                                <motion.a
                                    href="tel:+880123456789"
                                    whileHover={{ x: 5 }}
                                    className="text-[#B32346] font-semibold text-sm flex items-center gap-1 mt-2"
                                >
                                    Call Now <FaPhone className="w-3 h-3" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

               
            </div>
        </div>
    );
};

export default Contact;