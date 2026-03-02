
import { motion } from "framer-motion";




const CreateDonation = () => {
    
  

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 lg:p-10 min-h-screen bg-gray-50"
        >
            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl lg:text-4xl font-bold text-[#B32346] mb-4"
            >
                Create Donation Request
            </motion.h1>
            <p className="text-gray-700 mb-8 max-w-xl">
                Fill out the form below to request blood donation. Make sure all
                details are correct.
            </p>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-4"
            >
                {/* Requester Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Requester Name</label>
                        <input
                            type="text"
                            
                         
                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Requester Email</label>
                        <input
                            type="email"
                         
                          
                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                        />
                    </div>
                </div>

                {/* Recipient Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                          
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Blood Group</label>
                        <select
                            name="bloodGroup"
                         
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        >
                            <option value="">Select Blood Group</option>
                            
                        </select>
                    </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">District</label>
                        <select
                            name="recipientDistrict"
                        
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        >
                            <option value="">Select District</option>
                           
                        </select>
                    </div>
                    <div>
                        <label className="font-medium">Upazila</label>
                        <select
                            name="recipientUpazila"
                           
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        >
                            <option value="">Select Upazila</option>
                            
                        </select>
                    </div>
                </div>

                {/* Hospital & Address */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Full Address</label>
                        <input
                            type="text"
                            name="address"
                           
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                           
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                       
                            required
                            className="w-full border rounded px-3 py-2 mt-1"
                        />
                    </div>
                </div>

                {/* Request Message */}
                <div>
                    <label className="font-medium">Request Message</label>
                    <textarea
                        name="message"
                        
                        rows="4"
                        placeholder="Write why you need blood..."
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-[#B32346] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#a01f3c] transition"
                >
                    Create Request
                </motion.button>
            </form>
        </motion.div>
    );
};

export default CreateDonation;