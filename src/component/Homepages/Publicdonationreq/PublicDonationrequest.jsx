import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaTint,
    FaUser,
    FaHospital,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaEnvelope,
    FaPhone,
    FaHeartbeat,
    FaExclamationTriangle,
    FaCheckCircle,
    FaHourglassHalf,
    FaUserMd,
    FaSyringe,
    FaAward,
    FaUsers,
    FaGlobeAsia,
    FaArrowRight,
    FaSearch,
    FaFilter,
    FaChevronRight,
    FaTimes
} from 'react-icons/fa';
import { MdBloodtype, MdEmergency, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { BiDroplet, BiHealth } from 'react-icons/bi';
import { BsFillHeartPulseFill, BsShieldCheck } from 'react-icons/bs';
import Useaxios from '../../../Hooks/Useaxios';

const PublicDonationrequest = () => {
    const axios = Useaxios();
    const [requestData, setRequestData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/blood-request');
                console.log("All Donation Requests:", response.data);
                setRequestData(response.data);
                setSearchResults(response.data); // সব ডাটা দেখাবে
            } catch (error) {
                console.error("Error fetching donation requests:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequestData();
    }, [axios]);

    // সার্চ ফাংশন - শুধু blood group দিয়ে সার্চ করবে
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults(requestData); // খালি থাকলে সব দেখাও
        } else {
            const filtered = requestData.filter(request =>
                request.bloodGroup?.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
        }
    };

    // সার্চ রিসেট
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults(requestData);
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
        hidden: {
            y: 50,
            opacity: 0,
            scale: 0.9
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const bannerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    // Get status color and icon
    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return { color: 'from-green-500 to-green-600', icon: FaCheckCircle, text: 'Completed' };
            case 'inprogress':
                return { color: 'from-yellow-500 to-yellow-600', icon: FaHourglassHalf, text: 'In Progress' };
            case 'pending':
                return { color: 'from-yellow-500 to-orange-600', icon: FaExclamationTriangle, text: 'Pending' };
            default:
                return { color: 'from-blue-500 to-blue-600', icon: FaHeartbeat, text: status || 'Active' };
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Loading Skeleton
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: item * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                    <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                    <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-300 rounded w-full"></div>
                            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen ">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-1/2 -right-1/2 w-96 h-96  rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -45, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-red-200 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Unique Banner Section */}
                <motion.div
                    variants={bannerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative mb-12 overflow-hidden rounded-3xl"
                >
                    {/* Main Banner */}
                    <div className="relative  bg-gray-100  rounded-3xl  overflow-hidden">
                        {/* Animated Pattern */}
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 opacity-10"
                        >
                            <div className="absolute inset-0" style={{
                                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E\")",
                                backgroundSize: "60px 60px"
                            }}></div>
                        </motion.div>

                      

                        <div className="relative px-6 py-12 md:px-12 md:py-16">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                                {/* Left Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="flex-1 text-center lg:text-left"
                                >
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                                    >
                                        <MdEmergency className="w-5 h-5 text-yellow-300" />
                                        <span className="text-gray-300 ">ALL BLOOD DONATION REQUESTS</span>
                                    </motion.div>

                                    <motion.h1
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B32346] mb-4"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        Find Blood Donors
                                    </motion.h1>

                                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                                        Search for blood groups and help save lives. Every donation counts!
                                    </p>

                                    {/* Stats Counter */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto lg:mx-0">
                                        {[
                                            { value: requestData.length, label: 'Total Requests', icon: FaUsers },
                                            { value: searchResults.length, label: 'Showing Now', icon: BsFillHeartPulseFill },
                                            { value: '500+', label: 'Donors', icon: FaUserMd },
                                            { value: '24/7', label: 'Emergency', icon: MdEmergency }
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="bg-[#B32346] backdrop-blur-sm rounded-xl p-4 text-center"
                                            >
                                                <stat.icon className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                                                <motion.div
                                                    className="text-2xl font-bold text-gray-300"
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                                                >
                                                    {stat.value}
                                                </motion.div>
                                                <div className="text-xs text-gray-300">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Right Content - 3D Blood Drop Animation */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                    className="flex-1 max-w-md"
                                >
                                    <motion.div
                                        animate={{
                                            rotate: [0, 5, -5, 0],
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="relative"
                                    >
                                        {/* Main Blood Drop */}
                                        <div className="relative">
                                            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-2xl flex items-center justify-center">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 0.8, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity
                                                    }}
                                                >
                                                    <FaTint className="w-24 h-24 text-white" />
                                                </motion.div>
                                            </div>

                                          
                                        </div>

                                        {/* Floating Icons */}
                                        <motion.div
                                            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute -top-10 -right-10"
                                        >
                                            <BsShieldCheck className="w-12 h-12 text-yellow-300" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="absolute -bottom-10 -left-10"
                                        >
                                            <BiHealth className="w-12 h-12  text-[#B32346] " />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar Only - No Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6"
                    >
                        {/* Toggle Search Button for Mobile */}
                        <div className="md:hidden mb-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSearch(!showSearch)}
                                className="w-full px-4 py-3 bg-white rounded-xl shadow-lg flex items-center justify-center gap-2 text-red-600 font-semibold"
                            >
                                <FaSearch className="w-5 h-5" />
                                {showSearch ? 'Hide Search' : 'Search Blood Groups'}
                            </motion.button>
                        </div>

                        {/* Search Bar */}
                        <motion.div
                            className={`bg-white rounded-2xl shadow-2xl p-4 transition-all duration-300 ${showSearch ? 'block' : 'hidden md:block'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Search Input */}
                                <div className="flex-1 relative">
                                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by blood group (e.g., A+, B-, O+)..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Search Info */}
                            {searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 text-sm text-gray-600"
                                >
                                    Found <span className="font-bold text-red-600">{searchResults.length}</span> requests for blood group "{searchQuery}"
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Results Count */}
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            Blood Donation Requests
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="w-2 h-2 bg-red-600 rounded-full"
                            />
                        </h2>
                        <div className="flex items-center gap-4">
                            <p className="text-gray-600">
                                Showing <span className="font-bold text-red-600">{searchResults.length}</span>
                                {' '}of <span className="font-bold">{requestData.length}</span> requests
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Donation Request Cards */}
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid container mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {searchResults.length > 0 ? (
                                searchResults.map((request, index) => {
                                    const statusInfo = getStatusInfo(request.status);
                                    const StatusIcon = statusInfo.icon;

                                    return (
                                        <motion.div
                                            key={request._id}
                                            variants={itemVariants}
                                            layout
                                            whileHover={{
                                                y: -10,
                                                scale: 1.02,
                                                transition: { type: "spring", stiffness: 300 }
                                            }}
                                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                                        >
                                            {/* Card Header with Blood Group */}
                                            <div className="relative h-32 bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732]  overflow-hidden">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        rotate: [0, 5, -5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 5,
                                                        repeat: Infinity
                                                    }}
                                                    className="absolute inset-0 opacity-20"
                                                >
                                                    <div className="absolute inset-0" style={{
                                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E\")",
                                                        backgroundSize: "40px 40px"
                                                    }}></div>
                                                </motion.div>

                                                {/* Blood Group Badge */}
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", delay: index * 0.1 }}
                                                    className="absolute -bottom-8 left-6"
                                                >
                                                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-red-100">
                                                        <span className="text-3xl font-bold text-red-600">{request.bloodGroup}</span>
                                                    </div>
                                                </motion.div>

                                                {/* Status Badge */}
                                                <motion.div
                                                    initial={{ x: 100, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.2 }}
                                                    className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${statusInfo.color} text-white text-xs font-semibold flex items-center gap-1 shadow-lg`}
                                                >
                                                    <StatusIcon className="w-3 h-3" />
                                                    {statusInfo.text}
                                                </motion.div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-6 pt-10">
                                                <motion.h3
                                                    className="text-xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {request.recipientName || 'Recipient Name Not Specified'}
                                                </motion.h3>

                                                <div className="space-y-3 mb-4">
                                                    <motion.div
                                                        className="flex items-center gap-3 text-gray-600"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <FaHospital className="w-4 h-4 text-red-500" />
                                                        <span className="text-sm">{request.hospitalName || 'Hospital Not Specified'}</span>
                                                    </motion.div>

                                                    <motion.div
                                                        className="flex items-center gap-3 text-gray-600"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                                                        <span className="text-sm">
                                                            {request.recipientDistrict || 'District Not Specified'}, {request.recipientUpazila || 'Upazila Not Specified'}
                                                        </span>
                                                    </motion.div>

                                                    <motion.div
                                                        className="flex items-center gap-3 text-gray-600"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <FaCalendarAlt className="w-4 h-4 text-red-500" />
                                                        <span className="text-sm">{formatDate(request.donationDate)}</span>
                                                    </motion.div>

                                                    <motion.div
                                                        className="flex items-center gap-3 text-gray-600"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <FaClock className="w-4 h-4 text-red-500" />
                                                        <span className="text-sm">{request.donationTime || 'Time Not Specified'}</span>
                                                    </motion.div>
                                                </div>

                                                {request.message && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="mb-4 p-3 bg-red-50 rounded-lg"
                                                    >
                                                        <p className="text-sm text-gray-600 italic">"{request.message}"</p>
                                                    </motion.div>
                                                )}

                                                {request.assignedVolunteer && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="mb-4 p-3 bg-green-50 rounded-lg"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <FaUserMd className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm font-semibold text-green-700">Assigned Volunteer</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 font-medium">{request.assignedVolunteer.volunteerName}</p>
                                                        <p className="text-xs text-gray-500">{request.assignedVolunteer.volunteerEmail}</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Assigned: {new Date(request.assignedVolunteer.assignedAt).toLocaleDateString()}
                                                        </p>
                                                    </motion.div>
                                                )}

                                                <motion.div
                                                    className="flex gap-2 mt-4"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex-1 px-4 py-2  bg-gradient-to-r from-[#B32346] via-[#A8174E] to-[#500732]  text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <FaHeartbeat className="w-4 h-4" />
                                                        Donate Now
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-50 transition-all duration-300"
                                                    >
                                                        Details
                                                    </motion.button>
                                                </motion.div>

                                                <motion.div
                                                    className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <FaEnvelope className="w-3 h-3" />
                                                        {request.email}
                                                    </span>
                                                    <span>ID: {request._id.slice(-6)}</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="col-span-full text-center py-16"
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <FaTint className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No Blood Group Found</h3>
                                    <p className="text-gray-500">No requests found for blood group "{searchQuery}"</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clearSearch}
                                        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700"
                                    >
                                        Show All Requests
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PublicDonationrequest;