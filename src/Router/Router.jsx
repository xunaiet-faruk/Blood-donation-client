import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../component/Homepages/Home";
import Error from "../shared/Error";
import Login from "../Authentication/Resgister/Login";
import Register from "../Authentication/Resgister/Register";
import Donationrequest from "../component/Homepages/DonationRequests/Donationrequest";
import Privateroute from "./Privateroute";
import DasboardLayout from "../Dashboard/DasboardLayout";
import Dasboard from "../Dashboard/Dasboard";
import Profile from "../Dashboard/Profile";
import Alluser from "../Dashboard/AdminDashboard/Alluser";
import CreateDonation from "../Dashboard/DonarDashboard/CreateDonation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
           
        ]
    },
    {
        path: "/dashboard",
        element: (
            <Privateroute>
                <DasboardLayout />
            </Privateroute>
        ),
        children: [
            {
                index: true,
                element: <Dasboard />
            },
            {
                path: "/dashboard/donation-requests",
                element: (
                    <Privateroute>
                        <Donationrequest />
                    </Privateroute>
                )
            },
            {
                path: "/dashboard/profile",
                element: (
                    <Privateroute>
                        <Profile />
                    </Privateroute>
                )
            },
            {
                path: "/dashboard/allusers",
                element: (
                    <Privateroute>
                        <Alluser />
                    </Privateroute>
                )
            },
            {
                path: "/dashboard/create-donation-request",
                element: (
                    <Privateroute>
                        <CreateDonation />
                    </Privateroute>
                )
            },

        ]
    }
]);