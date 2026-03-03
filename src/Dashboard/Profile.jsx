import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../shared/PrimaryButton";
import { Authcontext } from "../Authentication/Context/Authcontext";
import Useaxios from "../Hooks/Useaxios";
import Swal from "sweetalert2";


const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const districts = ["Dhaka", "Chattogram", "Rajshahi", "Khulna"];
const upazilas = ["Dhanmondi", "Halishahar", "Boalia", "Sonadanga"];

const Profile = () => {
    const { user } = useContext(Authcontext);
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const axios = Useaxios();

    const fetchProfile = async () => {
        if (!user?.email) return;
        try {
            setLoading(true);
            const response = await axios.get(`/register/${user.email}`);
            console.log("User data from API:", response.data);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [user?.email]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            setSaving(true);

           const result = await axios.put(`/register/${user?.email}`, profile);
            console.log("Update result:", result.data);
            await fetchProfile();
            setEditMode(false);
            Swal.fire({
                title: "Success!",
                text: "Profile updated successfully",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                position: "top-end",
                toast: true
            });

        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update profile. Please try again.",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
                position: "top-end",
                toast: true
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B32346]"></div>
            </div>
        );
    }

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

                {profile?.status === "active" ? (
                    <div className="absolute top-4 right-4 z-20">
                        <motion.div
                            animate={{
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                            className="relative"
                        >
                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1.5 rounded-full shadow-lg">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [1, 0.7, 1]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    className="w-2 h-2 bg-white rounded-full"
                                />
                                <span className="font-semibold text-xs tracking-wider">ACTIVE</span>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-3 h-3 border border-white rounded-full border-t-transparent"
                                />
                            </div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                                className="absolute inset-0 bg-green-400 rounded-full blur-md -z-10"
                            />
                        </motion.div>
                    </div>
                ) : (
                    <div className="absolute top-4 right-4 z-20">
                        <motion.div
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                            className="relative"
                        >
                                <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#B32346] to-[#c31d47] text-white px-3 py-1.5 rounded-full shadow-lg">
                                <div className="w-2 h-2 bg-gray-200 rounded-full" />
                                <span className="font-semibold text-xs tracking-wider">Block</span>
                                <div className="w-3 h-3 border border-gray-200 rounded-full" />
                            </div>
                        </motion.div>
                    </div>
                )}


                <div className="relative z-10 flex flex-col items-center">
                    {/* Avatar -from profile */}
                    <img
                        src={profile?.photo || user?.photoURL || "https://via.placeholder.com/150"}
                        alt={profile?.name || "User avatar"}
                        className="w-32 h-32 rounded-full border-4 border-[#B32346] shadow-lg mb-6 object-cover"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                        }}
                    />

                    {/* Form */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name -*/}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile?.name || user?.displayName || ""}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                />
                            </div>

                            {/* Email -*/}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile?.email || user?.email || ""}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile?.phone || ""}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                />
                            </div>

                            {/* Blood Group -*/}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Blood Group
                                </label>
                                <select
                                    name="bloodGroup"
                                    value={profile?.bloodGroup || ""}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map((bg) => (
                                        <option key={bg} value={bg}>
                                            {bg}
                                        </option>
                                    ))}
                                </select>
                            </div>

                      
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    District
                                </label>
                                <select
                                    name="district"
                                    value={profile?.district || ""}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila -*/}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Upazila
                                </label>
                                <select
                                    name="upazila"
                                    value={profile?.upazila || ""}
                                    disabled={!editMode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${editMode
                                            ? "border-[#B32346] bg-white"
                                            : "border-gray-300 bg-gray-100"
                                        } focus:outline-none focus:ring-2 focus:ring-[#B32346] transition`}
                                >
                                    <option value="">Select Upazila</option>
                                    {upazilas.map((u) => (
                                        <option key={u} value={u}>
                                            {u}
                                        </option>
                                    ))}
                                </select>
                            </div>

                           

                            {/* Member Since -*/}
                            <div>
                                <label className="text-gray-700 font-semibold mb-1 block">
                                    Member Since
                                </label>
                                <input
                                    type="text"
                                    value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                                    disabled
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-center gap-4">
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-[#B32346] text-white cursor-pointer px-8 py-2 rounded-xl text-md shadow-lg font-semibold hover:bg-[#8f1b38] transition"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setEditMode(false);
                                    
                                            fetchProfile();
                                        }}
                                        className="bg-gray-500 text-white cursor-pointer px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    <PrimaryButton
                                        text={saving ? "Saving..." : "Save Changes"}
                                        onClick={handleSave}
                                        disabled={saving}
                                        className={`bg-green-500 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition ${saving ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;