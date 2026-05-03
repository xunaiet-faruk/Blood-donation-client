import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../Authentication/Context/Authcontext";
import Useaxios from "../../Hooks/Useaxios";

const VolunteerDashboard = () => {
    const [assignedRequests, setAssignedRequests] = useState([]);
    const { user } = useContext(Authcontext);
    const axios = Useaxios();

    useEffect(() => {
        if (user?._id) {
            fetchAssignedRequests();
        }
    }, [user]);

    const fetchAssignedRequests = async () => {
        try {
            const response = await axios.get(`/blood-request/assigned/${user._id}`);
            setAssignedRequests(response.data.data);
        } catch (error) {
            console.error("Error fetching assigned requests:", error);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
    };

    return (
        <div>
            <h2>My Assigned Requests</h2>
            {/* Show only assigned requests */}
        </div>
    );
};

export default VolunteerDashboard ;