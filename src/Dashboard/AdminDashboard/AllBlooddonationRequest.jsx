import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEye, FaTrash, FaTint, FaMapMarkerAlt, FaCalendarAlt,
    FaClock, FaEdit, FaUserPlus, FaUser, FaTimesCircle
} from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
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
    }, []);

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
                Swal.fire({
                    title: "Error!",
                    text: "Failed to fetch blood requests",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            });
    };

    // Status Change Function
    const handleStatusChange = async (id, currentStatus) => {
        try {
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
                    const response = await axios.put(`/users/${id}`, {
                        status: selectedStatus,
                        updatedAt: new Date().toISOString()
                    });

                    if (response.data.success || response.data.acknowledged) {
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
                    ${request.assignedVolunteer ? `
                        <p><strong>👤 Assigned Volunteer:</strong> ${request.assignedVolunteer.volunteerName}</p>
                        <p><strong>📅 Assigned Date:</strong> ${new Date(request.assignedVolunteer.assignedAt).toLocaleDateString()}</p>
                    ` : ''}
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

    // Volunteer assign function
    const handleAssignVolunteer = async (request) => {
        try {
            // Loading state
            Swal.fire({
                title: 'Loading volunteers...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Fetch active volunteers
            const response = await axios.get('/users/volunteers');
            const volunteers = response.data.data;

            Swal.close();

            if (!volunteers || volunteers.length === 0) {
                Swal.fire({
                    title: 'No Volunteers Found',
                    text: 'There are no active volunteers available to assign.',
                    icon: 'warning',
                    confirmButtonColor: '#B32346'
                });
                return;
            }

            // Create select options for volunteers
            const volunteerOptions = volunteers.reduce((acc, volunteer) => {
                acc[volunteer._id] = `${volunteer.name} (${volunteer.email})`;
                return acc;
            }, {});

            // Show volunteer selection dialog
            const { value: selectedVolunteerId } = await Swal.fire({
                title: 'Assign Volunteer',
                text: `Select a volunteer for ${request.recipientName}'s blood request`,
                input: 'select',
                inputOptions: volunteerOptions,
                inputPlaceholder: 'Choose a volunteer',
                showCancelButton: true,
                confirmButtonColor: '#B32346',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Assign',
                preConfirm: (volunteerId) => {
                    if (!volunteerId) {
                        Swal.showValidationMessage('Please select a volunteer');
                    }
                    return volunteerId;
                }
            });

            if (selectedVolunteerId) {
                // Find selected volunteer details
                const selectedVolunteer = volunteers.find(v => v._id === selectedVolunteerId);

                // Show confirmation
                const confirmResult = await Swal.fire({
                    title: 'Confirm Assignment',
                    text: `Are you sure you want to assign ${selectedVolunteer.name} to this request?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#B32346',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, assign!'
                });

                if (confirmResult.isConfirmed) {
                 
                    Swal.fire({
                        title: 'Assigning volunteer...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                   
                    const assignResponse = await axios.put(`/blood-request/${request._id}/assign-volunteer`, {
                        volunteerId: selectedVolunteer._id,
                        volunteerName: selectedVolunteer.name,
                        volunteerEmail: selectedVolunteer.email
                    });

                    if (assignResponse.data.success) {
                     
                        setRequests(requests.map(req =>
                            req._id === request._id
                                ? { ...req, assignedVolunteer: assignResponse.data.data.assignedVolunteer }
                                : req
                        ));

                        Swal.fire({
                            title: 'Success!',
                            text: `Volunteer assigned successfully`,
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                }
            }
        } catch (error) {
            console.error("Error assigning volunteer:", error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to assign volunteer',
                icon: 'error',
                confirmButtonColor: '#B32346'
            });
        }
    };

    // Volunteer unassign function
    const handleUnassignVolunteer = async (request) => {
        if (!request.assignedVolunteer) return;

        const result = await Swal.fire({
            title: 'Unassign Volunteer?',
            text: `Are you sure you want to unassign ${request.assignedVolunteer.volunteerName} from this request?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, unassign!'
        });

        if (result.isConfirmed) {
            try {
                await axios.put(`/blood-request/${request._id}/unassign-volunteer`);

                // Update local state
                setRequests(requests.map(req =>
                    req._id === request._id
                        ? { ...req, assignedVolunteer: undefined }
                        : req
                ));

                Swal.fire({
                    title: 'Unassigned!',
                    text: 'Volunteer has been unassigned.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to unassign volunteer',
                    icon: 'error',
                    confirmButtonColor: '#B32346'
                });
            }
        }
    };

    // Filter requests
    const filteredRequests = requests.filter(req => {
        const matchesSearch =
            req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.assignedVolunteer?.volunteerName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
        const matchesBlood = filterBloodGroup === 'all' || req.bloodGroup === filterBloodGroup;

        return matchesSearch && matchesStatus && matchesBlood;
    });

    // Get unique blood groups for filter
    const bloodGroups = ['all', ...new Set(requests.map(req => req.bloodGroup))];

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
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
                            placeholder="🔍 Search by name, location, volunteer..."
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className="p-4 text-left font-bold">Recipient</th>
                                <th className="p-4 text-left font-bold">Location</th>
                                <th className="p-4 text-left font-bold">Blood Group</th>
                                <th className="p-4 text-left font-bold">Date & Time</th>
                                <th className="p-4 text-left font-bold">Assigned Volunteer</th>
                                <th className="p-4 text-left font-bold">Status</th>
                                <th className="p-4 text-center font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-8">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B32346] border-t-transparent"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-8">
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
                                                <div>
                                                    <p className="font-semibold text-gray-800">{req.recipientName}</p>
                                                    <p className="text-sm text-gray-500">{req.email}</p>
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

                                            {/* Assigned Volunteer */}
                                            <td className="p-4">
                                                {req.assignedVolunteer ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                            <FaUser className="text-purple-600 text-sm" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{req.assignedVolunteer.volunteerName}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(req.assignedVolunteer.assignedAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            onClick={() => handleUnassignVolunteer(req)}
                                                            className="ml-2 text-red-500 hover:text-red-700"
                                                            title="Unassign Volunteer"
                                                        >
                                                            <FaTimesCircle className="text-sm" />
                                                        </motion.button>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Not assigned</span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="p-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleStatusChange(req._id, req.status)}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${statusColor(req.status)} flex items-center gap-2`}
                                                    title="Click to change status"
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
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleAssignVolunteer(req)}
                                                        className={`p-2 rounded-full ${req.assignedVolunteer
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-purple-100 text-purple-600'
                                                            } hover:opacity-80 transition-colors`}
                                                        title={req.assignedVolunteer ? 'Change Volunteer' : 'Assign Volunteer'}
                                                    >
                                                        <FaUserPlus />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleDelete(req._id)}
                                                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                                        title="Delete Request"
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