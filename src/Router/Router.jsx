// Router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../component/Homepages/Home";
import Error from "../shared/Error";
import Login from "../Authentication/Resgister/Login";
import Register from "../Authentication/Resgister/Register";
import Donationrequest from "../component/Homepages/DonationRequests/Donationrequest";
import DasboardLayout from "../Dashboard/DasboardLayout";
import Profile from "../Dashboard/Profile";
import Alluser from "../Dashboard/AdminDashboard/Alluser";
import CreateDonation from "../Dashboard/DonarDashboard/CreateDonation";
import Adminhome from "../Dashboard/AdminDashboard/Adminhome";
import AllBlooddonationRequest from "../Dashboard/AdminDashboard/AllBlooddonationRequest";
import AdminContentWrite from "../Dashboard/AdminDashboard/AdminContentWrite";
import AdminContenManagment from "../Dashboard/AdminDashboard/AdminContenManagment";
import AssignDonationreq from "../Dashboard/VolunteerDashboard/AssignDonationreq";
import RoleBasedRoute from "../Authentication/RolebaseRoute";

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
            <RoleBasedRoute allowedRoles={['admin', 'volunteer', 'donor']}>  {/* 🔥 সবাইকে অনুমতি দিন */}
                <DasboardLayout />
            </RoleBasedRoute>
        ),
        children: [
            // ড্যাশবোর্ড হোম - role অনুযায়ী আলাদা কন্টেন্ট দেখাবে
            {
                index: true,
                element: (
                    <RoleBasedRoute allowedRoles={['admin', 'volunteer', 'donor']}>
                        <Adminhome />  {/* এই কম্পোনেন্টের ভিতরে role check করে আলাদা কন্টেন্ট দেখান */}
                    </RoleBasedRoute>
                )
            },

            // Profile - সবাই দেখবে
            {
                path: "profile",
                element: (
                    <RoleBasedRoute allowedRoles={['admin', 'volunteer', 'donor']}>
                        <Profile />
                    </RoleBasedRoute>
                ),
            },

            // 🟢 ADMIN ONLY ROUTES
            {
                path: "allusers",
                element: (
                    <RoleBasedRoute allowedRoles={['admin']}>
                        <Alluser />
                    </RoleBasedRoute>
                )
            },
            {
                path: "all-blood-donation-request",
                element: (
                    <RoleBasedRoute allowedRoles={['admin']}>
                        <AllBlooddonationRequest />
                    </RoleBasedRoute>
                )
            },
            {
                path: "content-write",
                element: (
                    <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminContentWrite />
                    </RoleBasedRoute>
                )
            },
            {
                path: "Content-Management",
                element: (
                    <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminContenManagment />
                    </RoleBasedRoute>
                )
            },

            // 🟢 VOLUNTEER ONLY ROUTES
            {
                path: "assigned-donation-requests",
                element: (
                    <RoleBasedRoute allowedRoles={['volunteer']}>
                        <AssignDonationreq />
                    </RoleBasedRoute>
                )
            },

            // 🟢 DONOR ONLY ROUTES
            {
                path: "donation-requests",
                element: (
                    <RoleBasedRoute allowedRoles={['donor']}>
                        <Donationrequest />
                    </RoleBasedRoute>
                )
            },
            {
                path: "create-donation-request",
                element: (
                    <RoleBasedRoute allowedRoles={['donor']}>
                        <CreateDonation />
                    </RoleBasedRoute>
                )
            }
        ]
    }
]);