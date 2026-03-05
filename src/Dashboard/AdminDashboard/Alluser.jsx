import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaUser, FaLock, FaUnlock, FaUserShield, FaUserCog } from "react-icons/fa";
import Useaxios from "../../Hooks/Useaxios";
import Swal from "sweetalert2";
import { BsFillUnlockFill } from "react-icons/bs";

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
const roleColor = (role) => {
    switch (role) {
        case "admin":
            return "bg-purple-200 text-purple-800";
        case "volunteer":
            return "bg-blue-200 text-blue-800";
        case "donor":
            return "bg-yellow-200 text-yellow-800";
        default:
            return "bg-gray-200 text-gray-800";
    }
};

// Role icon mapping
const roleIcon = (role) => {
    switch (role) {
        case "admin":
            return <FaUserShield className="inline mr-1" />;
        case "volunteer":
            return <FaUserCog className="inline mr-1" />;
        default:
            return <FaUser className="inline mr-1" />;
    }
};


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axios = Useaxios()

    useEffect(() => {
        axios.get("/users")
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setUsers(fakeUsers);
            });
    }, [axios]);

    const handleBlock = async (userId, currentStatus) => {
        try {
            const action = currentStatus === 'blocked' ? 'unblock' : 'block';
            const result = await Swal.fire({
                title: `Are you sure?`,
                text: `Do you want to ${action} this user?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: action === 'block' ? '#d33' : '#3085d6',
                cancelButtonColor: '#6c757d',
                confirmButtonText: `Yes, ${action} it!`
            });

            if (!result.isConfirmed) {
                return;
            }

            const response = await axios.put(`/users/${userId}/block`, {
                action: action
            });

            if (response.data.success) {
                setUsers(users.map(user =>
                    user._id === userId
                        ? { ...user, status: response.data.data.status }
                        : user
                ));

                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
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
    }

    // Delete function 

    const handleDelete = (id) => {
        axios.delete(`/users/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setUsers(users.filter(user => user._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Donation request deleted successfully",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            })
    }


        //Chnage role 

    const handleRoleChange = async (userId, currentRole) => {
        try {
           
            const roles = ['donor', 'volunteer', 'admin'];
            const { value: selectedRole } = await Swal.fire({
                title: 'Change User Role',
                text: `Current role: ${currentRole}`,
                input: 'select',
                inputOptions: {
                    donor: 'Donor',
                    volunteer: 'Volunteer',
                    admin: 'Admin'
                },
                inputPlaceholder: 'Select new role',
                inputValue: currentRole,
                showCancelButton: true,
                confirmButtonColor: '#B32346',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Update Role',
                preConfirm: (role) => {
                    if (!role) {
                        Swal.showValidationMessage('Please select a role');
                    }
                    return role;
                }
            });

            if (selectedRole && selectedRole !== currentRole) {
               
                const confirmResult = await Swal.fire({
                    title: 'Confirm Role Change',
                    text: `Are you sure you want to change this user's role to ${selectedRole}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#B32346',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, change it!'
                });

                if (confirmResult.isConfirmed) {
                 
                    const response = await axios.put(`/users/${userId}/role`, {
                        role: selectedRole
                    });

                    if (response.data.success) {
                        // Update local state
                        setUsers(users.map(user =>
                            user._id === userId
                                ? { ...user, role: response.data.data.role }
                                : user
                        ));

                        Swal.fire({
                            title: "Success!",
                            text: response.data.message,
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                }
            } else if (selectedRole === currentRole) {
                Swal.fire({
                    title: "No Change",
                    text: "Role is already set to " + currentRole,
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
                                            src={user?.photo}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleRoleChange(user._id, user.role)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${roleColor(user.role)} hover:opacity-80 transition-all transform hover:scale-105 cursor-pointer flex items-center gap-1`}
                                        >
                                            {roleIcon(user.role)}
                                            {user.role?.toUpperCase() || "DONOR"}
                                        </button>
                                    </td>  
                                      <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor(
                                                user.status
                                            )}`}
                                        >
                                            {user?.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-3 flex justify-center gap-2">


                                        {/* Block/Unblock */}
                                        <div className="relative group ">
                                            <button onClick={() => handleBlock(user._id, user.status)}
                                                className={`p-2 cursor-pointer rounded-full ${user.status === "active"
                                                    ? "bg-green-200 hover:bg-green-300"
                                                    : "bg-red-200 hover:bg-red-300"
                                                    } transition`}
                                            >
                                                {user.status === "active" ? <BsFillUnlockFill /> : <FaLock />}
                                            </button>
                                            <span className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-2 bg-gray-800 text-white text-sm font-semibold rounded px-3 py-1 whitespace-nowrap z-10 shadow-lg">
                                                {user.status === "active" ? "Block User" : "Unblock User"}
                                            </span>
                                        </div>

                                        {/* Delete */}
                                        <div className="relative group">
                                            <button onClick={() => handleDelete(user._id)} className="p-2 cursor-pointer rounded-full bg-red-200 hover:bg-red-300 transition">
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