import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
    {
        name: "Rakib Hasan",
        role: "Frontend Developer",
        review: "This platform completely changed my workflow.",
        rating: 5,
    },
    {
        name: "Nusrat Jahan",
        role: "UI/UX Designer",
        review: "Design system is clean and modern.",
        rating: 5,
    },
    {
        name: "Shakil Ahmed",
        role: "Full Stack Developer",
        review: "Highly recommended for production use!",
        rating: 4,
    },
    {
        name: "Farhana Islam",
        role: "Software Engineer",
        review: "Saves a lot of development time.",
        rating: 5,
    },
    {
        name: "Tanvir Ahmed",
        role: "React Developer",
        review: "Smooth animation and clean design.",
        rating: 5,
    },
];

const TestimonialSection = () => {
    const [index, setIndex] = useState(0);

    const extended = [...testimonials, ...testimonials];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full  py-24 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#B32346]">
                        What People Say
                    </h2>
                    <p className="text-gray-500 mt-2 text-lg">
                        Honest feedback from our clients
                    </p>
                </div>

                {/* slider */}
                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: `-${index * (100 / 3.5)}%`, 
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                    >
                        {extended.map((item, i) => (
                            <div
                                key={i}
                                className="
                w-[85%] sm:w-[60%] md:w-[45%] lg:w-[28%] 
                shrink-0 bg-white rounded-2xl p-6 
border border-gray-100
shadow-[0_8px_20px_rgba(0,0,0,0.04)]
hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]   
                transition-all duration-500
                "
                            >
                          
                                <div
                                    className={`
                  ${i % 3 === 0 ? "rotate-[-4deg] translate-y-2" : ""}
                  ${i % 3 === 1 ? "rotate-[2deg] -translate-y-2" : ""}
                  ${i % 3 === 2 ? "rotate-[5deg] translate-y-3" : ""}
                  hover:rotate-0 hover:translate-y-0
                  transition-all duration-500
                `}
                                >
                                    <FaQuoteLeft className="text-[#B32346] text-xl mb-3" />

                                    <p className="text-gray-700 mb-5">{item.review}</p>

                                    <div className="flex gap-1 mb-3">
                                        {Array.from({ length: item.rating }).map((_, idx) => (
                                            <FaStar key={idx} className="text-yellow-400" />
                                        ))}
                                    </div>

                                    <h3 className="font-semibold text-gray-900">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default TestimonialSection;