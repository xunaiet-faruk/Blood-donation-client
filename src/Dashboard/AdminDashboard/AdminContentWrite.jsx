import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaSave } from 'react-icons/fa';
import { MdDescription, MdTitle } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import Useaxios from '../../Hooks/Useaxios';

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
    hidden: { y: 20, opacity: 0 },
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

const formVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};

const AdminContentWrite = () => {
    const axios = Useaxios();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;
        const category = form.category.value;
        const tags = form.tags.value;
        const status = form.status.value;

     
        const contentData = {
            title,
            description,
            date,
            category,
            tags,
            status
        };

        try {
            // Simple POST request
            const response = await axios.post('/content', contentData);
            console.log('Response:', response.data);
            form.reset();
            form.date.value = new Date().toISOString().split('T')[0];

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="min-h-screen  p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background Animations */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.15, 0.1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -left-32 w-96 h-96 bg-[#B32346]/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#B32346]/10 rounded-full blur-3xl"
            />

            {/* Header */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-8 relative"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-bold text-[#B32346] mb-2"
                >
                    Create New Content
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="text-gray-600"
                >
                    Share your thoughts, news, and updates with your audience
                </motion.p>
            </motion.div>

            {/* Form */}
            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
            >
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30">
                    {/* Title Field */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <MdTitle className="text-[#B32346]" />
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter an attention-grabbing title"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346] focus:border-transparent transition"
                            required
                        />
                    </motion.div>

                    {/* Description Field */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <MdDescription className="text-[#B32346]" />
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows="6"
                            placeholder="Write your content here..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346] focus:border-transparent transition resize-none"
                            required
                        />
                    </motion.div>

                    {/* Date and Category Row */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                <BsCalendarDate className="text-[#B32346]" />
                                Publication Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346] focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                <FaTag className="text-[#B32346]" />
                                Category
                            </label>
                            <select
                                name="category"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346] focus:border-transparent transition"
                            >
                                <option value="news">News</option>
                                <option value="blog">Blog</option>
                                <option value="announcement">Announcement</option>
                                <option value="update">Update</option>
                                <option value="event">Event</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Tags Field */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FaTag className="text-[#B32346]" />
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="e.g., health, blood-donation, awareness"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346] focus:border-transparent transition"
                        />
                    </motion.div>

                    {/* Status Field */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            Status
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="status"
                                    value="draft"
                                    defaultChecked
                                    className="text-[#B32346]"
                                />
                                <span>Draft</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="status"
                                    value="published"
                                    className="text-[#B32346]"
                                />
                                <span>Published</span>
                            </label>
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full cursor-pointer px-6 py-4 bg-gradient-to-r from-[#B32346] to-[#8B1A38] text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 text-lg"
                        >
                            <FaSave />
                            Publish Content
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminContentWrite;