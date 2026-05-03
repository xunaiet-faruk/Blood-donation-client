import React, { memo, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaTint } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import Useaxios from "../../Hooks/Useaxios";

const Register = memo(() => {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const [emailLoading, setEmailLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const { signup, updateUser, google } = useContext(Authcontext);
    const axios = Useaxios();
    const navigate = useNavigate();
    const location = useLocation();
    const navigateRoute = location.state?.from?.pathname || "/";

    useEffect(() => {
        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => {
                const tableData = data.find(item => item.type === "table");
                const uniqueDistricts = [
                    ...new Map(
                        tableData.data.map(item => [item.district_id, item])
                    ).values()
                ];
                setDistricts(uniqueDistricts);
            })
            .catch(error => console.error("Error loading districts:", error));
    }, []);

    useEffect(() => {
        if (!selectedDistrict) return;
        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => {
                const tableData = data.find(item => item.type === "table");
                const filtered = tableData.data.filter(
                    upa => upa.district_id === selectedDistrict
                );
                setUpazilas(filtered);
            })
            .catch(error => console.error("Error loading upazilas:", error));
    }, [selectedDistrict]);

    const handleRegister = async (e) => {
        e.preventDefault();

        setEmailLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.tel.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const group = form.group.value;
        const upazila = form.upazila.value;
        const district = form.district.options[form.district.selectedIndex].text;

        
        if (!name || !email || !phone || !password || !photo || !group || !upazila || !district) {
            Swal.fire({
                title: "Error!",
                text: "Please fill in all fields",
                icon: "error",
                draggable: true
            });
            setEmailLoading(false);
            return;
        }

        const allInfo = {
            name,
            email,
            phone,
            password,
            photo,
            bloodGroup: group,
            upazila,
            district,
            role: "donor",
            createdAt: new Date().toISOString(),
            status: "active"
        };

        try {
            const userCredential = await signup(email, password);
            console.log("Firebase user created:", userCredential.user);

            await updateUser(name, photo);
            console.log("Firebase profile updated");

            const registerResponse = await axios.post('/register', allInfo);
            console.log("Database save response:", registerResponse.data);

            Swal.fire({
                title: "Registered successfully!",
                text: "Your account has been created",
                icon: "success",
                draggable: true,
                timer: 2000,
                showConfirmButton: false
            });

            form.reset();
            setSelectedDistrict("");
            setUpazilas([]);
            navigate(navigateRoute);

        } catch (error) {
            console.error("Registration error:", error);

            let errorMessage = "An error occurred during registration";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email is already registered";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password should be at least 6 characters";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address";
            } else if (error.response) {
                errorMessage = error.response.data.message || "Server error occurred";
            }

            Swal.fire({
                title: "Registration Failed!",
                text: errorMessage,
                icon: "error",
                draggable: true
            });
        } finally {
            
            setEmailLoading(false);
        }
    };

    // const handleGoogleSignIn = async () => {
        
    //     setGoogleLoading(true);

    //     try {
    //         const result = await google();
    //         console.log("Google sign-in result:", result);

    //         const user = result.user;

    //         const userInfo = {
    //             name: user.displayName,
    //             email: user.email,
    //             photo: user.photoURL,
    //             role: "donor",
    //             bloodGroup: "Not specified",
    //             upazila: "Not specified",
    //             district: "Not specified",
    //             phone: "Not provided",
    //             createdAt: new Date().toISOString(),
    //             status: "active"
    //         };

    //         try {
    //             await axios.post('/register', userInfo);
    //         } catch (dbError) {
    //             if (dbError.response?.status !== 409) {
    //                 throw dbError;
    //             }
    //         }

    //         Swal.fire({
    //             title: "Signed in with Google!",
    //             text: "Successfully authenticated",
    //             icon: "success",
    //             draggable: true,
    //             timer: 2000,
    //             showConfirmButton: false
    //         });

    //         navigate(navigateRoute);

    //     } catch (error) {
    //         console.error("Google Sign-In error:", error);
    //         Swal.fire({
    //             title: "Google Sign-In Failed!",
    //             text: error.message || "An error occurred",
    //             icon: "error",
    //             draggable: true
    //         });
    //     } finally {
    //         // শুধু গুগল সাইন-ইনের loading false করব
    //         setGoogleLoading(false);
    //     }
    // };

    return (
        <section className="min-h-screen flex items-center justify-center my-12 relative overflow-hidden px-4">
            <form onSubmit={handleRegister} className="w-full flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-[500px] rounded-3xl shadow-xl bg-white p-8 sm:p-12 z-10"
                >
                    <h2 className="text-3xl font-bold text-[#B32346] text-center mb-6">
                        Join as a Donor
                    </h2>

                    <div className="space-y-5">
                        {/* Name */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaUser className="text-[#B32346]" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                className="w-full bg-transparent outline-none text-gray-700"
                                required
                                disabled={emailLoading || googleLoading}
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaEnvelope className="text-[#B32346]" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent outline-none text-gray-700"
                                required
                                disabled={emailLoading || googleLoading}
                            />
                        </motion.div>

                        {/* Phone */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaPhone className="text-[#B32346]" />
                            <input
                                type="tel"
                                name="tel"
                                placeholder="Phone Number"
                                className="w-full bg-transparent outline-none text-gray-700"
                                required
                                disabled={emailLoading || googleLoading}
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaLock className="text-[#B32346]" />
                            <input
                                type="password"
                                placeholder="Password (min. 6 characters)"
                                name="password"
                                className="w-full bg-transparent outline-none text-gray-700"
                                required
                                minLength="6"
                                disabled={emailLoading || googleLoading}
                            />
                        </motion.div>

                        {/* District Selection */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <select
                                name="district"
                                className="w-full bg-transparent outline-none text-gray-700"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                required
                                disabled={emailLoading || googleLoading}
                            >
                                <option value="">Select District</option>
                                {districts.map(d => (
                                    <option key={d.district_id} value={d.district_id}>
                                        {d.district_id}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Upazila Selection */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <select
                                name="upazila"
                                className="w-full bg-transparent outline-none text-gray-700"
                                required
                                disabled={!selectedDistrict || emailLoading || googleLoading}
                            >
                                <option value="">Select Upazila</option>
                                {upazilas.map(u => (
                                    <option key={u.id} value={u.name}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Photo URL */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaLock className="text-[#B32346]" />
                            <input
                                type="url"
                                placeholder="Please Share Your Photo URL"
                                name="photo"
                                className="w-full bg-transparent outline-none text-gray-700"
                                required
                                disabled={emailLoading || googleLoading}
                            />
                        </motion.div>

                        {/* Blood Group */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaTint className="text-[#B32346]" />
                            <select
                                name="group"
                                className="w-full bg-transparent outline-none text-gray-700 cursor-pointer"
                                required
                                disabled={emailLoading || googleLoading}
                            >
                                <option value="">Select Blood Group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Register Button - শুধু emailLoading দেখাবে */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full cursor-pointer bg-[#B32346] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={emailLoading || googleLoading}
                        >
                            {emailLoading ? "Registering..." : "Register"}
                        </motion.button>

                        {/* Google Button - শুধু googleLoading দেখাবে */}
                        {/* <motion.button
                            type="button"
                            onClick={handleGoogleSignIn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-2 cursor-pointer bg-white text-gray-700 font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={emailLoading || googleLoading}
                        >
                            <FcGoogle className="text-xl" />
                            {googleLoading ? "Processing..." : "Register with Google"}
                        </motion.button> */}
                    </div>

                    <p className="text-gray-500 text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#B32346] font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </motion.div>
            </form>
        </section>
    );
});

export default Register;