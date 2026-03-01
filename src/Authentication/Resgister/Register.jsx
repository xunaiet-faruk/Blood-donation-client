import React, { memo, useContext } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaTint, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Register = memo(() => {
    const { signup, updateUser, google } = useContext(Authcontext);

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.tel.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const group = form.group.value;
        const allInfo = { name, email, phone, password, photo, group };
        console.log(allInfo);

        signup(email, password)
            .then(result => {
                updateUser(name, photo)
                    .then(() => {
                        Swal.fire({
                            title: "Registered successfully!",
                            icon: "success",
                            draggable: true
                        });
                    })
                    .catch(error => console.error("Error updating profile:", error));
            })
            .catch(error => console.error(error));
    };


    const handleGoogleSignIn = () => {
       
        google()
            .then((result) => {

                updateUser(result.user.displayName, result.user.photoURL)
                    .then(() => {
                        Swal.fire({
                            title: "Signed in with Google!",
                            icon: "success",
                            draggable: true
                        });
                    })
                    .catch(error => console.error("Error updating profile:", error));
              
            })
            .catch((error) => console.error("Google Sign-In error:", error));
    };

    return (
        <section className="min-h-screen flex items-center justify-center my-12 relative overflow-hidden">
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
                            <input type="text" placeholder="Full Name" name="name" className="w-full bg-transparent outline-none text-gray-700" />
                        </motion.div>

                        {/* Email */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaEnvelope className="text-[#B32346]" />
                            <input type="email" name="email" placeholder="Email Address" className="w-full bg-transparent outline-none text-gray-700" />
                        </motion.div>

                        {/* Phone */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaPhone className="text-[#B32346]" />
                            <input type="tel" name="tel" placeholder="Phone Number" className="w-full bg-transparent outline-none text-gray-700" />
                        </motion.div>

                        {/* Password */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaLock className="text-[#B32346]" />
                            <input type="password" placeholder="Password" name="password" className="w-full bg-transparent outline-none text-gray-700" />
                        </motion.div>

                        {/* Photo */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaLock className="text-[#B32346]" />
                            <input type="url" placeholder="Please Share Your Photo URL" name="photo" className="w-full bg-transparent outline-none text-gray-700" />
                        </motion.div>

                        {/* Blood Group */}
                        <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                            <FaTint className="text-[#B32346]" />
                            <select name="group" className="w-full bg-transparent outline-none text-gray-700 cursor-pointer">
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Register Button */}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full cursor-pointer bg-[#B32346] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300" type="submit">
                            Register
                        </motion.button>

                        {/* Google Button */}
                        <motion.button
                            type="button"
                            onClick={handleGoogleSignIn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-2 mt-3 bg-[#B32346] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            <FcGoogle /> Register with Google
                        </motion.button>
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