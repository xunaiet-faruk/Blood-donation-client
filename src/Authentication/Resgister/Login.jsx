import React, { memo, use } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = memo(() => {
    const { signin, google } = use(Authcontext);
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signin(email, password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        title: "Logged in successfully!",
                        icon: "success",
                        draggable: true
                    });
                }
            })
            .catch(error => {
                console.error(error);
            })
       
    }


    
        // const handleGoogleSignIn = () => {
           
        //     google()
        //         .then((result) => {
        //             Swal.fire({
        //                 title: "Signed in with Google!",
        //                 icon: "success",
        //                 draggable: true
        //             });
        //         })
        //         .catch((error) => console.error("Google Sign-In error:", error));
        // };
    return (
        <section className="min-h-screen flex items-center justify-center overflow-hidden">
            <form onSubmit={handleLogin} className="w-full flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-[500px] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 z-10"
                >
                    <h2 className="text-3xl font-bold text-[#B32346] text-center mb-6">
                        Welcome Back
                    </h2>

                    <div className="space-y-5">

                        {/* Email */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#B32346]/50"
                        >
                            <FaEnvelope className="text-[#B32346]" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent outline-none text-gray-700"
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#B32346]/50"
                        >
                            <FaLock className="text-[#B32346]" />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="w-full bg-transparent outline-none text-gray-700"
                            />
                        </motion.div>

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-[#B32346] cursor-pointer text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                        >
                            Login
                        </motion.button>

                          {/* <motion.button
                                                    type="button"
                                                    onClick={handleGoogleSignIn}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full cursor-pointer flex items-center justify-center gap-2  bg-[#B32346] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                                                >
                                                    <FcGoogle /> Login with Google
                             </motion.button> */}

                        <p className="text-gray-500 text-sm text-center mt-1">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-[#B32346] font-semibold hover:underline">
                                Register
                            </Link>
                        </p>

                    </div>
                </motion.div>
            </form>
        </section>
    );
});

export default Login;