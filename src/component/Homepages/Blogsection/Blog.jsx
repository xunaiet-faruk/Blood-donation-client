import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaHeart,
    FaTint,
    FaUsers,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaClock,
    FaShareAlt,
    FaChevronRight,
    FaUserMd,
    FaNewspaper,
    FaEye,
    FaRegBookmark,
    FaBookmark,
    FaRegHeart,
    FaRegComment,
    FaFacebook,
    FaTwitter,
    FaBookOpen,
    FaSearch
} from 'react-icons/fa';
import { BiDroplet } from 'react-icons/bi';
import { MdEmergency } from 'react-icons/md';
import { BsFillHeartPulseFill } from 'react-icons/bs';
import Useaxios from '../../../Hooks/Useaxios';

// Statistics data
const stats = [
    {
        id: 1,
        title: "Registered Donors",
        value: "10,234",
        icon: FaUsers,
        color: "from-red-400 to-red-600"
    },
    {
        id: 2,
        title: "Successful Donations",
        value: "15,678",
        icon: BiDroplet,
        color: "from-blue-400 to-blue-600"
    },
    {
        id: 3,
        title: "Emergency Requests",
        value: "523",
        icon: MdEmergency,
        color: "from-green-400 to-green-600"
    },
    {
        id: 4,
        title: "Lives Saved",
        value: "45,678",
        icon: BsFillHeartPulseFill,
        color: "from-purple-400 to-purple-600"
    }
];

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedPosts, setLikedPosts] = useState({});
    const [savedPosts, setSavedPosts] = useState({});
    const [expandedPost, setExpandedPost] = useState(null);
    const axios = Useaxios();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
                damping: 12,
                mass: 1
            }
        }
    };

    const contentVariants = {
        collapsed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3 }
        },
        expanded: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Fetch blog posts from API
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/content');

                const formattedPosts = response.data.map((item, index) => {
                    let tags = [];
                    if (item.tags) {
                        if (Array.isArray(item.tags)) {
                            tags = item.tags;
                        } else if (typeof item.tags === 'string') {
                            tags = item.tags.split(',').map(tag => tag.trim());
                        }
                    } else {
                        tags = ["Blood Donation", "Health"];
                    }

                    return {
                        id: item._id || item.id || index + 1,
                        title: item.title || "Untitled Post",
                        excerpt: item.excerpt || item.description || "No description available",
                        content: item.content || item.fullContent || "Content not available",
                        image: item.image || item.imageUrl || `https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
                        author: item.author || item.authorName || "Anonymous",
                        authorAvatar: item.authorAvatar || item.avatar || `https://i.pravatar.cc/150?img=${index + 1}`,
                        authorBio: item.authorBio || item.bio || "Blood donation advocate",
                        date: item.date ? new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        category: item.category || item.blogCategory || "General",
                        readTime: item.readTime || item.readingTime || `${Math.floor(Math.random() * 8) + 3} min read`,
                        likes: item.likes || item.likeCount || Math.floor(Math.random() * 500) + 100,
                        shares: item.shares || item.shareCount || Math.floor(Math.random() * 200) + 20,
                        views: item.views || item.viewCount || Math.floor(Math.random() * 1000) + 500,
                        comments: item.comments || item.commentCount || Math.floor(Math.random() * 50) + 5,
                        location: item.location || item.area || "Bangladesh",
                        tags: tags
                    };
                });

                setBlogPosts(formattedPosts);
                setError(null);
            } catch (err) {
                console.error("Error fetching blog posts:", err);
                setError("Failed to load blog posts. Please try again later.");

                // Fallback data
                const fallbackPosts = [
                    {
                        id: 1,
                        title: "Save a Life Through Blood Donation: A Complete Guide",
                        excerpt: "Every 3 seconds someone needs blood. Your one unit of blood can save up to three lives. Learn how you can make a difference today.",
                        content: "Blood donation is a simple yet powerful way to save lives. Every day, thousands of people require blood transfusions due to accidents, surgeries, or medical conditions. By donating blood, you become part of a life-saving chain that connects donors with recipients. The process is safe, quick, and your body replenishes the donated blood within weeks.",
                        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        author: "Dr. Rafiqul Islam",
                        authorAvatar: "https://i.pravatar.cc/150?img=1",
                        authorBio: "Senior Hematologist with 15 years of experience",
                        date: "March 15, 2024",
                        category: "Awareness",
                        readTime: "5 min read",
                        likes: 234,
                        shares: 56,
                        views: 1234,
                        comments: 23,
                        location: "Dhaka",
                        tags: ["Blood Donation", "Life Saving", "Awareness"]
                    },
                    {
                        id: 2,
                        title: "Essential Tips: Before and After Blood Donation",
                        excerpt: "Follow these essential tips before and after blood donation to ensure a safe and healthy experience.",
                        content: "Proper preparation before blood donation ensures a smooth experience. Stay hydrated, eat iron-rich foods, and get adequate sleep. After donation, rest for 15 minutes, enjoy refreshments, and avoid strenuous activities for 24 hours. These simple steps help maintain your health while ensuring the donated blood is of the highest quality.",
                        image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        author: "Dr. Nasrin Sultana",
                        authorAvatar: "https://i.pravatar.cc/150?img=2",
                        authorBio: "Blood Bank Director and Specialist",
                        date: "March 12, 2024",
                        category: "Health Tips",
                        readTime: "4 min read",
                        likes: 189,
                        shares: 42,
                        views: 987,
                        comments: 15,
                        location: "Chittagong",
                        tags: ["Health Tips", "Preparation", "Recovery"]
                    },
                    {
                        id: 3,
                        title: "Blood Types and Compatibility: Complete Guide",
                        excerpt: "Understanding blood type compatibility is crucial for safe transfusions. Get all the facts about who can donate to whom.",
                        content: "Blood types are determined by the presence or absence of specific antigens. Type O negative is the universal donor, while AB positive is the universal recipient. Understanding compatibility is crucial for emergency transfusions. Learn about the Rh factor, cross-matching, and why some blood types are more common than others.",
                        image: "https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        author: "Prof. Dr. Zahid Hasan",
                        authorAvatar: "https://i.pravatar.cc/150?img=3",
                        authorBio: "Professor of Immunohematology",
                        date: "March 10, 2024",
                        category: "Educational",
                        readTime: "6 min read",
                        likes: 312,
                        shares: 89,
                        views: 1567,
                        comments: 34,
                        location: "Dhaka",
                        tags: ["Blood Types", "Compatibility", "Education"]
                    }
                ];
                setBlogPosts(fallbackPosts);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, [axios]);

    const handleLike = (postId) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleSave = (postId) => {
        setSavedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const toggleExpandPost = (postId) => {
        setExpandedPost(expandedPost === postId ? null : postId);
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="space-y-6">
            {[1, 2, 3].map((item) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-r from-gray-300 to-gray-400"></div>
                        <div className="flex-1 p-8">
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
                            <div className="flex gap-4">
                                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
            {/* Banner Section - Your Exact Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-gray-100"
            >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.2'/%3E%3C/svg%3E\")",
                        backgroundSize: "60px 60px"
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                <FaTint className="w-6 h-6 md:w-8 md:h-8 text-red-200" />
                                <span className="text-red-200 font-semibold tracking-wider text-sm md:text-base">BLOOD DONATION BLOG</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Learn Everything About <br />
                                <span className="text-[#B32346]">Blood Donation</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Get accurate information about blood donation, debunk common myths,
                                and get inspired by real stories from donors. Your one donation can save three lives.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <FaHeart className="w-5 h-5" />
                                    Donate Now
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <FaBookOpen className="w-5 h-5" />
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Right content - Stats cards */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0"
                        >
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    className={`bg-gradient-to-br ${stat.color} p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-sm text-center`}
                                >
                                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 mx-auto" />
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">{stat.value}</h3>
                                    <p className="text-xs sm:text-sm text-white/90">{stat.title}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Wave divider - Hidden on mobile */}
                <div className="hidden sm:block absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                        <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </motion.div>

            {/* Blog Posts Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Loading State */}
                {loading && <LoadingSkeleton />}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 0.5 }}
                            className="bg-red-50 text-red-600 p-8 rounded-2xl inline-block shadow-xl"
                        >
                            <FaNewspaper className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-lg font-semibold mb-2">⚠️ {error}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Try Again
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Blog Cards */}
                {!loading && !error && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                variants={itemVariants}
                                layout
                                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image Section */}
                                    <motion.div
                                        className="lg:w-2/5 relative overflow-hidden"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative h-64 lg:h-full min-h-[300px]">
                                            <motion.img
                                                src={post.image}
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Category Badge */}
                                            <motion.div
                                                className="absolute top-4 left-4"
                                                initial={{ x: -100 }}
                                                animate={{ x: 0 }}
                                                transition={{ type: "spring", delay: index * 0.1 }}
                                            >
                                                <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                                                    {post.category}
                                                </span>
                                            </motion.div>

                                            {/* Save Button */}
                                            <div className="absolute top-4 right-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleSave(post.id)}
                                                    className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${savedPosts[post.id]
                                                            ? "bg-red-600 text-white"
                                                            : "bg-white/90 text-gray-600 hover:bg-white"
                                                        }`}
                                                >
                                                    {savedPosts[post.id] ? <FaBookmark /> : <FaRegBookmark />}
                                                </motion.button>
                                            </div>

                                            {/* Location */}
                                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                                                <FaMapMarkerAlt className="w-4 h-4" />
                                                <span className="text-sm font-medium">{post.location}</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Content Section */}
                                    <div className="flex-1 p-6 lg:p-8">
                                        {/* Author Info */}
                                        <motion.div
                                            className="flex items-center gap-4 mb-6"
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                        >
                                            <motion.img
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                src={post.authorAvatar}
                                                alt={post.author}
                                                className="w-14 h-14 rounded-full border-4 border-red-100 shadow-lg"
                                            />
                                            <div>
                                                <h4 className="font-bold text-gray-800">{post.author}</h4>
                                                <p className="text-sm text-gray-500">{post.authorBio}</p>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                                    <FaCalendarAlt className="w-3 h-3" />
                                                    <span>{post.date}</span>
                                                    <FaClock className="w-3 h-3 ml-2" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <motion.h2
                                            className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors cursor-pointer"
                                            whileHover={{ x: 10 }}
                                            onClick={() => toggleExpandPost(post.id)}
                                        >
                                            {post.title}
                                        </motion.h2>

                                        {/* Excerpt/Content */}
                                        <motion.div
                                            variants={contentVariants}
                                            initial="collapsed"
                                            animate={expandedPost === post.id ? "expanded" : "collapsed"}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-600 leading-relaxed mb-4">
                                                {expandedPost === post.id ? post.content : post.excerpt}
                                            </p>
                                        </motion.div>

                                        {/* Read More Button */}
                                        <motion.button
                                            whileHover={{ x: 10 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleExpandPost(post.id)}
                                            className="text-red-600 font-semibold flex items-center gap-2 group mb-6"
                                        >
                                            {expandedPost === post.id ? "Show Less" : "Read More"}
                                            <FaChevronRight className={`w-4 h-4 transition-transform duration-300 ${expandedPost === post.id ? "rotate-90" : "group-hover:translate-x-2"
                                                }`} />
                                        </motion.button>

                                        {/* Tags */}
                                        <motion.div
                                            className="flex flex-wrap gap-2 mb-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 + 0.4 }}
                                        >
                                            {Array.isArray(post.tags) && post.tags.length > 0 ? (
                                                post.tags.map((tag, i) => (
                                                    <motion.span
                                                        key={i}
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                                                    >
                                                        #{tag}
                                                    </motion.span>
                                                ))
                                            ) : (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs rounded-full">
                                                    #BloodDonation
                                                </span>
                                            )}
                                        </motion.div>

                                        {/* Stats and Actions */}
                                        <motion.div
                                            className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-100"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 + 0.5 }}
                                        >
                                            <div className="flex items-center gap-6">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleLike(post.id)}
                                                    className={`flex items-center gap-2 transition-colors ${likedPosts[post.id] ? "text-red-600" : "text-gray-500 hover:text-red-600"
                                                        }`}
                                                >
                                                    <FaHeart className={`w-5 h-5 ${likedPosts[post.id] ? "fill-current" : ""}`} />
                                                    <span className="text-sm font-medium">{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                                                >
                                                    <FaRegComment className="w-5 h-5" />
                                                    <span className="text-sm font-medium">{post.comments}</span>
                                                </motion.button>

                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    className="flex items-center gap-2 text-gray-500"
                                                >
                                                    <FaEye className="w-5 h-5" />
                                                    <span className="text-sm font-medium">{post.views}</span>
                                                </motion.div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 15 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                                                >
                                                    <FaFacebook className="w-5 h-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 15 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                                                >
                                                    <FaTwitter className="w-5 h-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 15 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                                >
                                                    <FaShareAlt className="w-5 h-5" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Blog;