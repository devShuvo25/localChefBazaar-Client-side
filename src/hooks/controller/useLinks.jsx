import React from "react";
import { MdOutlineDashboard, MdReviews } from "react-icons/md";
import { MdNoMeals } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import useUserData from "../userRole/useRole";

const useLinks = () => {
  const { role } = useUserData();
  // const role = "Chef" // Testing
  let links = [];
  if (role === "Chef") {
    links = [
      { name: "My Profile", icon: <MdNoMeals />, path: "/dashboard/my-profile" },
      { name: "My Meals", icon: <MdNoMeals />, path: "/dashboard/my-meals" },
      {
        name: "Create a Meals",
        icon: <AiOutlineLike />,
        path: "/dashboard/create-meal",
      },
      {
        name: "Order Request",
        icon: <FiTruck />,
        path: "/dashboard/order-request",
      },
    ];
  } else if (role === "Admin") {
    links = [
      { name: "My Profile", icon: <MdNoMeals />, path: "/dashboard/my-profile" },

      { name: "Manage User", icon: <MdNoMeals />, path: "/dashboard/my-meals" },
      {
        name: "Mange request",
        icon: <AiOutlineLike />,
        path: "/dashboard/my-favourites",
      },
    ];
  } else {
    links = [
      // { name: "My Meals", icon: <MdNoMeals />, path: "/dashboard/my-meals" },
      { name: "My Profile", icon: <MdNoMeals />, path: "/dashboard/my-profile" },

      {
        name: "Favourite Meals",
        icon: <AiOutlineLike />,
        path: "/dashboard/my-favourites",
      },
      {
        name: "My Reviews",
        icon: <MdReviews />,
        path: "/dashboard/my-reviews",
      },
      {
        name: "Manage Orders",
        icon: <FiTruck />,
        path: "/dashboard/manage-orders",
      },
    ];
  }
  return { links };
};
export default useLinks;
