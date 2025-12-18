import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import useAxiosSecure from "../axios/useAxiosSecure";
import useLinks from "../hooks/controller/useLinks";
import { MdOutlineDashboard, MdReviews } from "react-icons/md";

const DashBoard = () => {
  const location = useLocation();
  const { links } = useLinks();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      <title>Dashboard</title>

      {/*Left Sidebar */}
      <aside className="w-full hidden lg:block md:w-55 bg-primary text-white p-5 md:p-6 md:block sticky top-0 md:h-screen md:overflow-auto">
        <h2 className="text-xl flex items-center gap-2 font-bold mb-6">
          <MdOutlineDashboard /> Dashboard
        </h2>

        <ul className="menu w-full">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block flex p-3 rounded-lg transition-all duration-200
                ${
                  location.pathname === link.path
                    ? "bg-white text-primary font-semibold"
                    : "hover:bg-primary-focus"
                }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* ✅ Right Content */}
      <main className="flex-1 p-3 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
