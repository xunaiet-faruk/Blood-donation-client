import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

const DonationView = ({ viewingRequest, setViewingRequest }) => {
    return (
        <AnimatePresence>
            {viewingRequest && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-gray-200 overflow-hidden"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-[#B32346] text-center">
                            Donation Request Details
                        </h2>

                        <div className="grid grid-cols-1 gap-3">
                            <DetailRow label="Recipient" value={viewingRequest.recipientName} />
                            <DetailRow label="District" value={viewingRequest.recipientDistrict} />
                            <DetailRow label="Upazila" value={viewingRequest.recipientUpazila} />
                            <DetailRow label="Hospital" value={viewingRequest.hospitalName} />
                            <DetailRow label="Address" value={viewingRequest.address} />
                            <DetailRow label="Blood Group" value={viewingRequest.bloodGroup} />
                            <DetailRow
                                label="Date & Time"
                                value={`${viewingRequest.donationDate} ${viewingRequest.donationTime || ""}`}
                            />
                            <DetailRow label="Message" value={viewingRequest.message} />
                            <DetailRow
                                label="Status"
                                value={viewingRequest.status}
                                valueClass={getStatusColor(viewingRequest.status)}
                            />
                        </div>

                        <button
                            onClick={() => setViewingRequest(null)}
                            className="mt-6 w-full cursor-pointer py-2 bg-[#B32346] text-white rounded-xl hover:bg-red-700 transition"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Component for each detail row
const DetailRow = ({ label, value, valueClass }) => (
    <div className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition">
        <span className="font-semibold text-gray-700">{label}:</span>
        <span className={`text-gray-900 ${valueClass || ""}`}>{value || "-"}</span>
    </div>
);

// Function to color the status
const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "text-yellow-600 font-bold";
        case "inprogress":
            return "text-blue-600 font-bold";
        case "done":
            return "text-green-600 font-bold";
        case "canceled":
            return "text-red-600 font-bold";
        default:
            return "text-gray-600 font-bold";
    }
};

export default DonationView;