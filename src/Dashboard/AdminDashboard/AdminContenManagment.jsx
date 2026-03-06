import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import Useaxios from '../../Hooks/Useaxios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Animation for cards
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
        scale: 1.02,
        boxShadow: "0px 10px 30px rgba(179, 35, 70, 0.15)",
        transition: { type: "spring", stiffness: 300 }
    }
};

const AdminContenManagment = () => {
    const axios = Useaxios();
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/content');
            setContents(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'Delete?',
            text: `Are you sure you want to delete "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/content/${id}`);
                    setContents(contents.filter(item => item._id !== id));
                    Swal.fire('Deleted!', '', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'Something went wrong', 'error');
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#B32346]">My Content</h1>

                <Link to="/dashboard/content-write">
                    <button className="bg-[#B32346] text-white px-4 py-2 rounded-lg hover:bg-[#8B1A38] transition flex items-center gap-2">
                        <FaPlus /> Add New Content
                    </button>
                </Link>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : contents.length === 0 ? (
                    <p className="text-center text-gray-500">No content yet</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contents.map((item) => (
                            <motion.div
                                key={item._id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                className="bg-white rounded-xl shadow-md overflow-hidden"
                            >
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                            {item.category}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <p className="text-xs text-gray-400 mb-4">
                                        Date : {item.date}
                                    </p>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(item._id, item.title)}
                                        className="text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContenManagment;