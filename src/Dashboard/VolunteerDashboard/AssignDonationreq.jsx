import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEdit, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import Swal from 'sweetalert2';
import Useaxios from '../../Hooks/Useaxios';
import { Authcontext } from '../../Authentication/Context/Authcontext';

// Status color function
const statusColor = (status) => {
    switch (status?.toLowerCase()) {
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "inprogress":
            return "bg-blue-100 text-blue-800";
        case "done":
            return "bg-green-100 text-green-800";
        case "canceled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const AssignDonationreq = () => {
    const axios = Useaxios();
    const { user } = useContext(Authcontext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchAssignedRequests();
        }
    }, [user]);

    const fetchAssignedRequests = async () => {
        try {
            setLoading(true);
            // সব রিকোয়েস্ট এনে ফিল্টার করি ইমেইল দিয়ে
            const response = await axios.get('/blood-request');
            const filtered = response.data.filter(req =>
                req.assignedVolunteer?.volunteerEmail === user.email
            );
            setRequests(filtered);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error!", "Failed to fetch requests", "error");
        } finally {
            setLoading(false);
        }
    };

    // View Details
    const handleView = (req) => {
        Swal.fire({
            title: req.recipientName,
            html: `
                <div class="text-left">
                    <p><strong>📍 Location:</strong> ${req.address || 'N/A'}</p>
                    <p><strong>🏥 Hospital:</strong> ${req.hospitalName || 'N/A'}</p>
                    <p><strong>🩸 Blood Group:</strong> ${req.bloodGroup}</p>
                    <p><strong>📅 Date:</strong> ${req.donationDate}</p>
                    <p><strong>⏰ Time:</strong> ${req.donationTime}</p>
                    <p><strong>📝 Message:</strong> ${req.message || 'No message'}</p>
                    <p><strong>📧 Email:</strong> ${req.email}</p>
                </div>
            `,
            confirmButtonColor: '#B32346'
        });
    };

    // Update Status (Volunteer can change to: inprogress, done, canceled)
    const handleStatusChange = async (id, currentStatus) => {
        try {
            const statusMap = {
                inprogress: 'In Progress',
                done: 'Done',
                canceled: 'Canceled'
            };

            const { value: newStatus } = await Swal.fire({
                title: 'Update Status',
                text: `Current: ${currentStatus}`,
                input: 'select',
                inputOptions: {
                    inprogress: 'In Progress',
                    done: 'Done',
                    canceled: 'Canceled'
                },
                inputPlaceholder: 'Select status',
                showCancelButton: true,
                confirmButtonColor: '#B32346',
                preConfirm: (status) => {
                    if (!status) Swal.showValidationMessage('Select a status');
                    return status;
                }
            });

            if (newStatus && newStatus !== currentStatus) {
                const confirm = await Swal.fire({
                    title: 'Confirm',
                    text: `Change to ${statusMap[newStatus]}?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#B32346'
                });

                if (confirm.isConfirmed) {
                    await axios.put(`/users/${id}`, {
                        status: newStatus,
                        updatedAt: new Date().toISOString()
                    });

                    setRequests(requests.map(r =>
                        r._id === id ? { ...r, status: newStatus } : r
                    ));

                    Swal.fire("Success!", "Status updated", "success");
                }
            }
        } catch (error) {
            Swal.fire("Error!", "Update failed", "error");
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#B32346]">
                    My Assigned Donation Requests
                </h1>
                <p className="text-gray-600">Total: {requests.length} requests</p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Recipient</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Blood Group</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Date & Time</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10">
                                    Loading...
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No assigned requests found
                                </td>
                            </tr>
                        ) : (
                            requests.map((req, index) => (
                                <tr key={req._id} className="border-t hover:bg-gray-50">
                                    {/* Recipient */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium">{req.recipientName}</p>
                                            <p className="text-sm text-gray-500">{req.email}</p>
                                        </div>
                                    </td>

                                    {/* Blood Group */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${bloodGroupColor(req.bloodGroup)}`}>
                                            <MdBloodtype />
                                            {req.bloodGroup}
                                        </span>
                                    </td>

                                    {/* Location */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-[#B32346] text-sm" />
                                            <span>{req.address || 'N/A'}</span>
                                        </div>
                                        {req.hospitalName && (
                                            <p className="text-sm text-gray-500">🏥 {req.hospitalName}</p>
                                        )}
                                    </td>

                                    {/* Date & Time */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-[#B32346] text-sm" />
                                            <span>{req.donationDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaClock className="text-[#B32346] text-sm" />
                                            <span>{req.donationTime}</span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(req.status)}`}>
                                            {req.status?.toUpperCase()}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleView(req)}
                                                className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(req._id, req.status)}
                                                className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                                                title="Update Status"
                                            >
                                                <FaEdit />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Blood group color function
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

export default AssignDonationreq;