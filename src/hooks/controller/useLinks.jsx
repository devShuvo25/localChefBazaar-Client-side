import React from 'react';
import useRole from '../userRole/useRole';
import { MdOutlineDashboard, MdReviews } from "react-icons/md";
import { MdNoMeals } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";

const useLinks = () => {
    // const {role} = useRole()
    const role = "Chef" // Testing
    let links =[]
    if(role === "User"){
          links = [
            // { name: "My Meals", icon: <MdNoMeals />, path: "/dashboard/my-meals" },
            { name: "Favourite Meals", icon:<AiOutlineLike />, path: "/dashboard/my-favourites" },
            { name: "My Reviews", icon:<MdReviews />, path: "/dashboard/my-reviews" },
            { name: "Manage Orders", icon:<FiTruck />, path: "/dashboard/manage-orders" },
          ]; 
    }
    if(role === 'Chef'){
        links = [
            { name: "My Meals", icon: <MdNoMeals />, path: "/dashboard/my-meals" },
            { name: "Create a Meals", icon:<AiOutlineLike />, path: "/dashboard/create-meal" },
            { name: "Order Request", icon:<FiTruck />, path: "/dashboard/order-request" },
          ];
    }
    if(role === 'Admin'){
        links = [
            { name: "Manage User", icon: <MdNoMeals />, path: "/dashboard/my-meals" },
            { name: "Mange request", icon:<AiOutlineLike />, path: "/dashboard/my-favourites" },
            
          ];
    }
    return {links}
}
export default useLinks;