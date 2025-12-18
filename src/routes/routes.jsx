import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserPrivetRoutes from "../privetRoutes/userPrivetRoutes/UserPrivetRoutes";
import Public_Meals from "../pages/Public_Meals";
import Details from "../pages/Details";
import DashBoard from "../pages/DashBoard";
import MyMeals from "../components/Dashboard/MyMeals";
import FavouriteMeals from "../components/Dashboard/MyFavourite";
import Error from "../pages/Error";
import OrderForm from "../pages/OrderForm";
import MyReviews from "../dashboard/user/MyReviews";
import AddMeal from "../pages/AddMeal";
import OrderRequest from "../pages/OrderRequest";
import Profile from "../pages/Profile";
import Manage_Request from "../dashboard/admin/Manafe_Request";
import Manage_Users from "../dashboard/admin/Manage_Users";
import Orders from "../dashboard/user/Orders";
import PaymentSuccess from "../pages/Paymentsuccess";
import Statistics from "../dashboard/admin/Statistics";


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
                path:'/details/:id',
                element: <UserPrivetRoutes>
                            <Details/>
                        </UserPrivetRoutes>
            },
            {
                path:'/order/:id',
                element: <UserPrivetRoutes>
                            <OrderForm/>
                        </UserPrivetRoutes>
            },
            {
                path:'/*',
                Component:Error
            },
            {
                path:'/dashboard',
                element: <UserPrivetRoutes>
                            <DashBoard/>
                        </UserPrivetRoutes>,
                children: [
                    // Dashboard nested routes can be added here
                    {
                        index:true,
                        element:<UserPrivetRoutes>
                            <Profile/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'my-meals',
                        element: <UserPrivetRoutes>
                            <MyMeals/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'my-favourites',
                       element: <UserPrivetRoutes>
                            <FavouriteMeals/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'my-reviews',
                        element:<UserPrivetRoutes>
                            <MyReviews/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'create-meal',
                        element: <UserPrivetRoutes>
                            <AddMeal/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'order-request',
                        element: <UserPrivetRoutes>
                            <OrderRequest/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'my-profile',
                        element: <UserPrivetRoutes>
                            <Profile/>
                        </UserPrivetRoutes>
                    }
                    ,{
                        path:'manage-request',
                        element: <UserPrivetRoutes>
                            <Manage_Request/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'manage-users',
                        element:<UserPrivetRoutes>
                            <Manage_Users/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'statistics',
                        element:<UserPrivetRoutes>
                            <Statistics/>
                        </UserPrivetRoutes>
                    }
                    ,
                    {
                        path:'my-orders',
                        element:<UserPrivetRoutes>
                            <Orders/>
                        </UserPrivetRoutes>
                    },
                    {
                        path:'payment-success',
                        element:<UserPrivetRoutes>
                            <PaymentSuccess/>
                        </UserPrivetRoutes>
                    }

                ]
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