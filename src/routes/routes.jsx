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
                Component:DashBoard,
                children: [
                    // Dashboard nested routes can be added here
                    {
                        index:true,
                        element: <h1 className="flex justify-center items-center text-primary text-xl font-bold lg:text-4xl">My Meals Featured not added yet</h1>
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
                        Component: AddMeal
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