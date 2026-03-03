import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { Authcontext } from "../../Authentication/Context/Authcontext";
import Useaxios from "../../Hooks/Useaxios";
import Swal from "sweetalert2";

const CreateDonation = () => {
    const { user } = use(Authcontext);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const axios = Useaxios();

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
                console.log("Districts loaded:", uniqueDistricts);
            })
            .catch(error => console.error("Error loading districts:", error));
    }, []);

    useEffect(() => {
        if (!selectedDistrict) {
            setUpazilas([]);
            return;
        }

        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => {
                const tableData = data.find(item => item.type === "table");
                const filtered = tableData.data.filter(
                    upa => upa.district_id === selectedDistrict
                );
                setUpazilas(filtered);
                console.log("Upazilas loaded:", filtered);
            })
            .catch(error => console.error("Error loading upazilas:", error));
    }, [selectedDistrict]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const email = user?.email || form.email.value;
        const recipientName = user?.displayName || form.recipientName.value;
        const bloodGroup = form.bloodGroup.value;
        const recipientDistrict = form.recipientDistrict.options[form.recipientDistrict.selectedIndex].text;
        const recipientUpazila = form.recipientUpazila.value;
        const hospitalName = form.hospitalName.value;
        const address = form.address.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const message = form.message.value;

        const donationData = {
            email,
            recipientName,
            bloodGroup,
            recipientDistrict,
            recipientUpazila,
            hospitalName,
            address,
            donationDate,
            donationTime,
            message
        };

        try {
            const response = await axios.post('/blood-request', donationData);

            if (response.data) {
                Swal.fire({
                    title: "Success!",
                    text: "Donation request created successfully",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                form.reset();
                setSelectedDistrict("");
                setUpazilas([]);
            }
        } catch (error) {
            console.error("Error creating donation request:", error);

            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Failed to create donation request",
                icon: "error",
                confirmButtonColor: "#B32346"
            });
        }
    
       
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 lg:p-10 min-h-screen bg-gray-50"
        >
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

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-4"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Requester Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="font-medium">Requester Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            name="email"
                            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
                            readOnly
                        />
                    </div>
                </div>

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
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">District</label>
                        <select
                            name="recipientDistrict"
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d.district_id} value={d.district_id}>
                                    {d.district_id}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium">Upazila</label>
                        <select
                            name="recipientUpazila"
                            className="w-full border rounded px-3 py-2 mt-1"
                            required
                            disabled={!selectedDistrict}
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map(u => (
                                <option key={u.id} value={u.name}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

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

                <div>
                    <label className="font-medium">Request Message</label>
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Write why you need blood..."
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>

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