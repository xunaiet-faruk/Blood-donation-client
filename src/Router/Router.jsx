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
import PublicDonationrequest from "../component/Homepages/Publicdonationreq/PublicDonationrequest";
import Privateroute from "./Privateroute";
import SearchDonors from "../component/Homepages/FindDonar/SearchDonors";
import Blog from "../component/Homepages/Blogsection/Blog";


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
                path: "blog",
                element: <Blog/>
            },
            {
                path: "publicSeeDonor",
                element:<Privateroute><PublicDonationrequest/> </Privateroute>
            },
            {
                path: "searchDonor",
                element:<Privateroute><SearchDonors/> </Privateroute>
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
            <RoleBasedRoute allowedRoles={['admin', 'volunteer', 'donor']}>  
                <DasboardLayout />
            </RoleBasedRoute>
        ),
        children: [
            
            {
                index: true,
                element: (
                    <RoleBasedRoute allowedRoles={['admin', 'volunteer', 'donor']}>
                        <Adminhome />  
                    </RoleBasedRoute>
                )
            },

            
            {
                path: "profile",
                element: (
                    <RoleBasedRoute allowedRoles={['admin', 'volunteer', 'donor']}>
                        <Profile />
                    </RoleBasedRoute>
                ),
            },

            //  ADMIN ONLY ROUTES
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

            //  VOLUNTEER ONLY ROUTES
            {
                path: "assigned-donation-requests",
                element: (
                    <RoleBasedRoute allowedRoles={['volunteer']}>
                        <AssignDonationreq />
                    </RoleBasedRoute>
                )
            },

            //  DONOR ONLY ROUTES
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