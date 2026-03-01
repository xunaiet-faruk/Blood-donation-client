
import {
    createBrowserRouter,
    
} from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../component/Homepages/Home";
import Error from "../shared/Error";
import Login from "../Authentication/Resgister/Login";
import Register from "../Authentication/Resgister/Register";


 export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout/>,
        errorElement:<Error/>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    },
]);
