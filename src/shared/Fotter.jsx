import React from 'react';
import { motion } from 'framer-motion';

const FloatingDrop = ({ delay, size, left }) => (
    <motion.div
        className="absolute bg-[#B32346] rounded-full"
        style={{
            width: size,
            height: size,
            left: left,
            bottom: '-50px', 
        }}
        animate={{ y: [-10, -100, -200], opacity: [0, 0.5, 1] }}
        transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            repeatType: "loop",
            delay: delay,
        }}
    />
);

const Footer = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Original Footer */}
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>

            <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 relative">
                <aside className="grid-flow-col items-center">
                    <img className='w-20' src="/logo.png" alt="" />
                    <p>
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                </aside>
            </footer>

            {/* Floating Blood Drops */}
            <FloatingDrop delay={0} size={10} left="10%" />
            <FloatingDrop delay={1} size={12} left="25%" />
            <FloatingDrop delay={2} size={8} left="40%" />
            <FloatingDrop delay={1.5} size={15} left="60%" />
            <FloatingDrop delay={0.5} size={10} left="80%" />
        </div>
    );
};

export default Footer;