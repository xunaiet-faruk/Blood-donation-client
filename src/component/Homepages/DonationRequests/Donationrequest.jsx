import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Useaxios from "../../../Hooks/Useaxios";
import { Authcontext } from "../../../Authentication/Context/Authcontext";
import Swal from "sweetalert2";
import DonationEdit from "./DonationEdit";
import DonationView from "./DonationView";

const statusColor = (status) => {
    switch (status) {
        case "pending":
            return "bg-yellow-200 text-yellow-800";
        case "inprogress":
            return "bg-blue-200 text-blue-800";
        case "done":
            return "bg-green-200 text-green-800";
        case "canceled":
            return "bg-red-200 text-red-800";
        default:
            return "bg-gray-200 text-gray-800";
    }
};

const MyDonationRequests = () => {
    const axios = Useaxios()
    const { user } = use(Authcontext)
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRequest, setEditingRequest] = useState(null);
    const [viewingRequest, setViewingRequest] = useState(null);
    const requestsPerPage = 5;

    useEffect(() => {
        axios.get(`/blood-request/${user?.email}`)
            .then(res => {
                setRequests(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error("Error fetching requests:", err);
            });
    }, [user?.email, axios]);


    //Delete data 
    const handleDeleteRequest = async (id) => {
        try {
            const response = await axios.delete(
                `/blood-request/${id}?email=${user.email}&role=${user.role}`
            );

          
            if (response.data.deletedCount > 0) {
                setRequests(requests.filter(res => res._id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Donation request deleted successfully",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } else if (response.data.message) {
              
                Swal.fire({
                    title: "Cannot Delete",
                    text: response.data.message,
                    icon: "warning",
                    timer: 2500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error",
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    // Edit function data 

    const handleEditRequest = (req) => {
        
        if (user.role === "donor" && req.status !== "pending") {
            Swal.fire({ title: "Cannot Edit", text: "You can only edit your pending requests.", icon: "warning", timer: 2500, showConfirmButton: false });
            return;
        }
        setEditingRequest(req);
    }

    const handleSaveEdit = async (updatedData) => {
        try{
            const response =await axios.put(`/blood-request/${editingRequest._id}`,{
                ...updatedData,
                userEmail: user.email,
                userRole: user.role
            })
            setRequests(requests.map(r => r._id === editingRequest._id ? response.data.data || { ...r, ...updatedData } : r));
            setEditingRequest(null);
            Swal.fire({ title: "Updated!", text: "Donation request updated successfully", icon: "success", timer: 2000, showConfirmButton: false });
        } catch (error) {
            Swal.fire({ title: "Error!", text: error.response?.data?.message || "Could not update request", icon: "error", showConfirmButton: true });
        }
        
    }

    const handleCancel = () => {
        setEditingRequest(null); 
    };


const handleViewDetails = (id) => {
   const ressponse =requests.find(info => info._id ===id)
   setViewingRequest(ressponse)
}



    // Filtered requests
    const filteredRequests =
        filter === "all" ? requests : requests.filter((r) => r.status === filter);

    // Pagination
    const indexOfLast = currentPage * requestsPerPage;
    const indexOfFirst = indexOfLast - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    return (
        <div className="p-6 lg:p-10 min-h-screen relative">
            {/* Background animation */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute -top-32 -left-32 w-96 h-96 bg-[#B32346]/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#B32346]/10 rounded-full blur-3xl"
            />

            {/* Title & Filter */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4"
            >
                <h1 className="text-3xl font-bold text-[#B32346]">
                    My Donation Requests
                </h1>
                <div className="flex gap-3 items-center">
                    <span className="font-medium">Filter by Status:</span>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </motion.div>

            {/* Requests Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Recipient</th>
                            <th className="p-3 text-left">Location</th>
                            <th className="p-3 text-left">Hospital</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-left">Blood Group</th>
                            <th className="p-3 text-left">Date & Time</th>
                            <th className="p-3 text-left">Message</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {currentRequests.length > 0 ? (
                                currentRequests.map((req, index) => (
                                    <motion.tr
                                        key={req._id || req.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3">{req.recipientName || req.recipient?.name || req.name || "N/A"}</td>
                                        <td className="p-3">{req.location || req.city || req.district || "N/A"}</td>
                                        <td className="p-3">{req.hospital || req.hospitalName || "N/A"}</td>
                                        <td className="p-3">{req.address || req.fullAddress || "N/A"}</td>
                                        <td className="p-3">{req.bloodGroup || req.bloodType || req.blood || "N/A"}</td>
                                        <td className="p-3">
                                            {req.donationDate || req.date || req.requestDate} {req.donationTime || req.time || ""}
                                        </td>
                                        <td className="p-3">{req.message || req.notes || req.additionalNotes || "-"}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor(
                                                    req.status
                                                )}`}
                                            >
                                                {req.status ? req.status.toUpperCase() : "PENDING"}
                                            </span>
                                        </td>

                                        <td className="p-3 flex justify-center gap-2">
                                            {/* View icon */}
                                            <div className="relative group">
                                                <button
                                                    onClick={() => handleViewDetails(req._id)}
                                                    className="p-2 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 transition"
                                                >
                                                    <FaEye />
                                                </button>
                                                <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-gray-800 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                    <FaInfoCircle />
                                                    View Details
                                                </span>
                                            </div>

                                            {/* Action buttons */}
                                            {req.status === "inprogress" ? (
                                                <>
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => handleMarkAsDone(req)}
                                                            className="px-2 py-1 rounded bg-green-200 text-green-800 text-sm hover:bg-green-300 transition"
                                                        >
                                                            Done
                                                        </button>
                                                        <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-green-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                            <FaCheckCircle />
                                                            Mark as Done
                                                        </span>
                                                    </div>
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => handleCancelRequest(req._id)}
                                                            className="px-2 py-1 rounded bg-red-200 text-red-800 text-sm hover:bg-red-300 transition"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-red-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                            <FaTimesCircle />
                                                            Cancel Request
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => handleEditRequest(req._id)}
                                                            className="p-2 cursor-pointer rounded-full bg-blue-200 hover:bg-blue-300 transition"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <span className="absolute  bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-blue-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                                <FaPencilAlt className="cursor-pointer"/>
                                                            Edit Request
                                                        </span>
                                                    </div>
                                                    <div className="relative group">
                                                        <button
                                                            onClick={() => handleDeleteRequest(req._id)}
                                                            className="p-2 cursor-pointer hover:text-white rounded-full bg-red-200 hover:bg-red-600  transition"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                        <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-red-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                            <FaTrashAlt />
                                                            Delete Request
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-8 text-gray-500">
                                        No donation requests found
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>



                <DonationEdit editingRequest={editingRequest} handleSaveEdit={handleSaveEdit} handleCancel={handleCancel}/>
                <DonationView viewingRequest={viewingRequest} setViewingRequest={setViewingRequest}/>
            </div>

            {/* Pagination */}
            {filteredRequests.length > 0 && (
                <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;