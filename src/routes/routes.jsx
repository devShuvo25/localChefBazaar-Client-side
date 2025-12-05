import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserPrivetRoutes from "../privetRoutes/userPrivetRoutes/UserPrivetRoutes";
import Public_Meals from "../pages/Public_Meals";

export const routes = createBrowserRouter([
    {
        path: '/',
        Component:Root,
        children: [
            {
                index:true,
                Component:Home
            },
            {
                index:"/",
                Component:Home
            },
            {
                path:'/meals',
                Component:Public_Meals
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'register',
                Component:Register
            }
        ]
    }
])