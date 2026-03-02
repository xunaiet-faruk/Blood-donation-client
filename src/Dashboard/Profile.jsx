import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../shared/PrimaryButton";

// Fake profile data
const fakeProfile = {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@example.com",
    bloodGroup: "A+",
    district: "Dhaka",
    upazila: "Dhanmondi",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocI1btkq3f_B_6TEEHn9FNiaWvuf4CxslzzzINJ7GK3PqV1QrtU=s96-c",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const districts = ["Dhaka", "Chattogram", "Rajshahi", "Khulna"];
const upazilas = ["Dhanmondi", "Halishahar", "Boalia", "Sonadanga"];

const Profile = () => {
    const [profile, setProfile] = useState(fakeProfile);
    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // এখানে আপনি server এ POST/PUT request পাঠাতে পারেন
        console.log("Saved profile:", profile);
        setEditMode(false);
    };

    return (
        <div className="p-6 lg:p-10 min-h-screen bg-gray-50 flex justify-center items-start">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 lg:p-10 relative overflow-hidden"
            >
                {/* Animated background circles */}
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute -top-20 -left-20 w-72 h-72 bg-[#B32346]/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#B32346]/10 rounded-full blur-3xl"
                />

                <div className="relative z-10 flex flex-col items-center">
                    {/* Avatar */}
                    <img
                        src={profile.avatar}
                        alt="avatar"
                        className="w-32 h-32 rounded-full border-4 border-[#B32346] shadow-lg mb-6"
                    />

                    {/* Form */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Blood Group
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={profile.bloodGroup}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                >
                                    {bloodGroups.map((bg) => (
                                        <option key={bg} value={bg}>
                                            {bg}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    District
                                </label>
                                <select
                                    name="district"
                                    value={profile.district}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                >
                                    {districts.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila */}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Upazila
                                </label>
                                <select
                                    name="upazila"
                                    value={profile.upazila}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                >
                                    {upazilas.map((u) => (
                                        <option key={u} value={u}>
                                            {u}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-center gap-4">
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="hover:bg-[#B32346] border-b border-[#B32346] hover:text-white cursor-pointer px-8 py-2 rounded-xl text-md shadow-2xl font-semibold hover:bg-red-600 transition"
                                >
                                    Edit
                                </button>
                            ) : (
                                <PrimaryButton text={"save"}
                                    onClick={handleSave}
                                    className="bg-green-500 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                                >
                                    
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;