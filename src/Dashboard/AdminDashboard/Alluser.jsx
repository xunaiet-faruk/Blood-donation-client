import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaUser, FaLock, FaUnlock } from "react-icons/fa";

// Function to get badge color based on status
const statusColor = (status) => {
    switch (status) {
        case "active":
            return "bg-green-200 text-green-800";
        case "blocked":
            return "bg-red-200 text-red-800";
        default:
            return "bg-gray-200 text-gray-800";
    }
};

// Fake Users Data
const fakeUsers = [
    {
        id: 1,
        avatar: "https://i.pravatar.cc/150?img=1",
        name: "John Doe",
        email: "john@example.com",
        role: "donor",
        status: "active",
    },
    {
        id: 2,
        avatar: "https://i.pravatar.cc/150?img=2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "volunteer",
        status: "active",
    },
    {
        id: 3,
        avatar: "https://i.pravatar.cc/150?img=3",
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "donor",
        status: "blocked",
    },
    {
        id: 4,
        avatar: "https://i.pravatar.cc/150?img=4",
        name: "Alice Brown",
        email: "alice@example.com",
        role: "admin",
        status: "active",
    },
];

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Load fake data
        setUsers(fakeUsers);
    }, []);

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

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 relative flex flex-col items-start gap-4"
            >
              

               

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#B32346] drop-shadow-lg">
                    All Users 
                </h1>

                
            </motion.div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Avatar</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {users.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3 capitalize">{user.role}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor(
                                                user.status
                                            )}`}
                                        >
                                            {user.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-3 flex justify-center gap-2">
                                        {/* Edit */}
                                        <div className="relative group">
                                            <button className="p-2 rounded-full bg-blue-200 hover:bg-blue-300 transition">
                                                <FaEdit />
                                            </button>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-blue-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                <FaEdit /> Edit
                                            </span>
                                        </div>

                                        {/* Block/Unblock */}
                                        <div className="relative group">
                                            <button
                                                className={`p-2 rounded-full ${user.status === "active"
                                                        ? "bg-red-200 hover:bg-red-300"
                                                        : "bg-green-200 hover:bg-green-300"
                                                    } transition`}
                                            >
                                                {user.status === "active" ? <FaLock /> : <FaUnlock />}
                                            </button>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-gray-800 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                {user.status === "active" ? "Block User" : "Unblock User"}
                                            </span>
                                        </div>

                                        {/* Delete */}
                                        <div className="relative group">
                                            <button className="p-2 rounded-full bg-red-200 hover:bg-red-300 transition">
                                                <FaTrash />
                                            </button>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-red-700 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                <FaTrash /> Delete
                                            </span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;