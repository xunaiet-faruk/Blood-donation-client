import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaTrash, FaTint, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaEdit } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Useaxios from '../../Hooks/Useaxios';
import Swal from 'sweetalert2';

// Status color function
const statusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
        case "inprogress":
            return "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
        case "done":
            return "bg-green-100 text-green-800 border-l-4 border-green-500";
        case "canceled":
            return "bg-red-100 text-red-800 border-l-4 border-red-500";
        default:
            return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
};

// Blood group color mapping
const bloodGroupColor = (group) => {
    const colors = {
        'A+': 'bg-red-100 text-red-800',
        'A-': 'bg-red-50 text-red-700',
        'B+': 'bg-blue-100 text-blue-800',
        'B-': 'bg-blue-50 text-blue-700',
        'AB+': 'bg-purple-100 text-purple-800',
        'AB-': 'bg-purple-50 text-purple-700',
        'O+': 'bg-green-100 text-green-800',
        'O-': 'bg-green-50 text-green-700',
    };
    return colors[group] || 'bg-gray-100 text-gray-800';
};

// Table animations
const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    },
    hover: {
        scale: 1.02,
        boxShadow: "0px 10px 30px rgba(179, 35, 70, 0.15)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.3
        }
    }
};

const AllBlooddonationRequest = () => {
    const axios = Useaxios();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterBloodGroup, setFilterBloodGroup] = useState('all');

    useEffect(() => {
        fetchRequests();
    }, [axios]);

    const fetchRequests = () => {
        setLoading(true);
        axios.get('/blood-request')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching requests:", err);
                setLoading(false);
            });
    };

    // Status Change Function
    const handleStatusChange = async (id, currentStatus) => {
        try {
            // Available status options
            const statusOptions = ['pending', 'inprogress', 'done', 'canceled'];

            // Create status options for SweetAlert
            const statusMap = {
                pending: 'Pending',
                inprogress: 'In Progress',
                done: 'Done',
                canceled: 'Canceled'
            };

            const { value: selectedStatus } = await Swal.fire({
                title: 'Change Request Status',
                text: `Current Status: ${statusMap[currentStatus] || currentStatus}`,
                input: 'select',
                inputOptions: {
                    pending: 'Pending',
                    inprogress: 'In Progress',
                    done: 'Done',
                    canceled: 'Canceled'
                },
                inputPlaceholder: 'Select new status',
                inputValue: currentStatus,
                showCancelButton: true,
                confirmButtonColor: '#B32346',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Update Status',
                preConfirm: (status) => {
                    if (!status) {
                        Swal.showValidationMessage('Please select a status');
                    }
                    return status;
                }
            });

            if (selectedStatus && selectedStatus !== currentStatus) {
                // Show confirmation
                const confirmResult = await Swal.fire({
                    title: 'Confirm Status Change',
                    text: `Are you sure you want to change status to ${statusMap[selectedStatus]}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#B32346',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, change it!'
                });

                if (confirmResult.isConfirmed) {
                    // Make API call to update status
                    const response = await axios.put(`/users/${id}`, {
                        status: selectedStatus,
                        updatedAt: new Date().toISOString()
                    });

                    if (response.data.success || response.data.acknowledged) {
                        // Update local state
                        setRequests(requests.map(req =>
                            req._id === id
                                ? { ...req, status: selectedStatus }
                                : req
                        ));

                        Swal.fire({
                            title: "Success!",
                            text: `Status changed to ${statusMap[selectedStatus]} successfully`,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                }
            } else if (selectedStatus === currentStatus) {
                Swal.fire({
                    title: "No Change",
                    text: "Status is already set to " + statusMap[currentStatus],
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.log("Error:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    const handleView = (request) => {
        Swal.fire({
            title: request.recipientName,
            html: `
                <div class="text-left">
                    <p><strong>📍 Location:</strong> ${request.address || 'N/A'}</p>
                    <p><strong>🏥 Hospital:</strong> ${request.hospitalName || 'N/A'}</p>
                    <p><strong>🩸 Blood Group:</strong> ${request.bloodGroup}</p>
                    <p><strong>📅 Date:</strong> ${request.donationDate}</p>
                    <p><strong>⏰ Time:</strong> ${request.donationTime}</p>
                    <p><strong>📝 Message:</strong> ${request.message || 'No message'}</p>
                    <p><strong>📧 Email:</strong> ${request.email}</p>
                </div>
            `,
            icon: 'info',
            confirmButtonColor: '#B32346',
            confirmButtonText: 'Close'
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/blood-request/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0 || res.status === 200) {
                            setRequests(requests.filter(req => req._id !== id));
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Request has been deleted.',
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    });
            }
        });
    };

    // Filter requests
    const filteredRequests = requests.filter(req => {
        const matchesSearch =
            req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        const matchesBlood = filterBloodGroup === 'all' || req.bloodGroup === filterBloodGroup;

        return matchesSearch && matchesStatus && matchesBlood;
    });

    // Get unique blood groups for filter
    const bloodGroups = ['all', ...new Set(requests.map(req => req.bloodGroup))];

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen ">
            {/* Header Section with Animation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#B32346] mb-2">
                            Blood Donation Requests
                        </h1>
                        <p className="text-gray-600">
                            Total {filteredRequests.length} requests found
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="🔍 Search by name, location..."
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346] focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346]"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                            <option value="canceled">Canceled</option>
                        </select>

                        <select
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B32346]"
                            value={filterBloodGroup}
                            onChange={(e) => setFilterBloodGroup(e.target.value)}
                        >
                            {bloodGroups.map(group => (
                                <option key={group} value={group}>
                                    {group === 'all' ? 'All Blood Groups' : group}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Table Section */}
            <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            >
                {/* Table Header */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow-2xl ">
                        <thead className='bg-gray-100'>
                            <tr className="">
                                <th className="p-4 text-left font-bold">Recipient</th>
                                <th className="p-4 text-left font-bold">Location</th>
                                <th className="p-4 text-left font-bold">Blood Group</th>
                                <th className="p-4 text-left font-bold">Date & Time</th>
                                <th className="p-4 text-left font-bold">Status</th>
                                <th className="p-4 text-center font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="p-8">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B32346] border-t-transparent"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center text-gray-500"
                                            >
                                                <FaTint className="text-6xl mx-auto mb-4 text-gray-300" />
                                                <p className="text-xl">No blood requests found</p>
                                            </motion.div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRequests.map((req, index) => (
                                        <motion.tr
                                            key={req._id}
                                            variants={rowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            whileHover="hover"
                                            custom={index}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors group"
                                        >
                                            {/* Recipient */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                   
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{req.recipientName}</p>
                                                        <p className="text-sm text-gray-500">{req.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Location */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-[#B32346] text-sm" />
                                                    <span className="text-gray-700">{req.address || 'N/A'}</span>
                                                </div>
                                                {req.hospitalName && (
                                                    <p className="text-sm text-gray-500 mt-1">🏥 {req.hospitalName}</p>
                                                )}
                                            </td>

                                            {/* Blood Group */}
                                            <td className="p-4">
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${bloodGroupColor(req.bloodGroup)} flex items-center gap-2 w-fit`}>
                                                    <MdBloodtype className="text-lg" />
                                                    {req.bloodGroup}
                                                </span>
                                            </td>

                                            {/* Date & Time */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FaCalendarAlt className="text-[#B32346]" />
                                                    <span>{req.donationDate}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                                    <FaClock className="text-[#B32346]" />
                                                    <span>{req.donationTime}</span>
                                                </div>
                                            </td>

                                            {/* Status - Clickable for change */}
                                            <td className="p-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleStatusChange(req._id, req.status)}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${statusColor(req.status)} flex items-center gap-2`}
                                                >
                                                    <FaEdit className="text-sm" />
                                                    {req.status?.toUpperCase()}
                                                </motion.button>
                                            </td>

                                            {/* Actions */}
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleView(req)}
                                                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                                    >
                                                        <FaEye />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleDelete(req._id)}
                                                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                    >
                                                        <FaTrash />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>

         
        </div>
    );
};

export default AllBlooddonationRequest;