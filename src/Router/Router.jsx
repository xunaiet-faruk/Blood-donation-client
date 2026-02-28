
import {
    createBrowserRouter,
    
} from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Home from "../component/Homepages/Home";
import Error from "../shared/Error";


 export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout/>,
        errorElement:<Error/>,
        children:[
            {
                index:true,
                Component:Home
            }
        ]
    },
]);
