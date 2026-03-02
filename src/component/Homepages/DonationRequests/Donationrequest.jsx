import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
                                    import {FaEye, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaPencilAlt, FaTrashAlt} from 'react-icons/fa';

// Function to get badge color based on status
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
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 5;

    useEffect(() => {
        fetch("/Recentdonation.json") // তোমার JSON ফাইল
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.error("Failed to load data:", err));
    }, []);

    // Filtered requests
    const filteredRequests =
        filter === "all" ? requests : requests.filter((r) => r.status === filter);

    // Pagination
    const indexOfLast = currentPage * requestsPerPage;
    const indexOfFirst = indexOfLast - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

    return (
        <div className="p-6 lg:p-10  min-h-screen relative">
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
                            {currentRequests.map((req, index) => (
                                <motion.tr
                                    key={req.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3">{req.recipientName}</td>
                                    <td className="p-3">{req.location}</td>
                                    <td className="p-3">{req.hospital || "N/A"}</td>
                                    <td className="p-3">{req.address || "N/A"}</td>
                                    <td className="p-3">{req.bloodGroup}</td>
                                    <td className="p-3">
                                        {req.donationDate} {req.donationTime}
                                    </td>
                                    <td className="p-3">{req.message || "-"}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor(
                                                req.status
                                            )}`}
                                        >
                                            {req.status.toUpperCase()}
                                        </span>
                                    </td>


                                    <td className="p-3 flex justify-center gap-2">
                                        {/* View icon */}
                                        <div className="relative group">
                                            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
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
                                                    <button className="px-2 py-1 rounded bg-green-200 text-green-800 text-sm hover:bg-green-300 transition">
                                                        Done
                                                    </button>
                                                    <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-green-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                        <FaCheckCircle />
                                                        Mark as Done
                                                    </span>
                                                </div>
                                                <div className="relative group">
                                                    <button className="px-2 py-1 rounded bg-red-200 text-red-800 text-sm hover:bg-red-300 transition">
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
                                                    <button className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition">
                                                        <FaEdit />
                                                    </button>
                                                    <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-blue-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                        <FaPencilAlt />
                                                        Edit Request
                                                    </span>
                                                </div>
                                                <div className="relative group">
                                                    <button className="p-2 rounded-full bg-red-200 hover:bg-red-300 transition">
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
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center gap-3">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyDonationRequests;