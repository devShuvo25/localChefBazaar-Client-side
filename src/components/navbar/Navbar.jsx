import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/authentication/useAuth";
import logo from "../../assets/logo.png";
import { MdNoMeals, MdReviews } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import useLinks from "../../hooks/controller/useLinks";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const {links} = useLinks()

  const Links = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/meals" },
    // { name: "Details", path: "/details" },
    { name: "Dashboard", path: "/dashboard" },
  ];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleLogOut = () => {
    logout();
    navigate("login");
  };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // lock scroll when drawer open
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);
  return (
    <div>
      <div className="navbar fixed z-100 bg-white shadow-sm text-secondary px-2 lg:px-8 ">
        <div className="navbar-start">
          <div>
            <button
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="btn btn-primary lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
          <a className="flex justify-center items-center gap-5 text-xl font-bold ">
            <img className="h-12 ms-3" src={logo} alt="" />
            <h1 className="hidden lg:block">The Daily <span className="text-primary">Dish</span></h1>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex  gap-5 items-center px-1">
            {Links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-primary font-semibold   mb-2"
                        : "my-links"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {/* {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-primary font-semibold   mb-2"
                        : "my-links"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))} */}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          {!user ? (
            <div className="flex items-center gap-5 justify-between">
              <Link to={"/login"} className="my-btn">
                Sign in
              </Link>
              <Link
                to={"/register"}
                className="text-primary font-semibold btn border-primary bg-white"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className=" cursor-pointer flex items-center gap-3">
              <button onClick={handleLogOut} className="btn btn-primary">
                Logout
              </button>
              {/* <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/219/219983.png"} alt="" /> */}
              <div className="m-1 w-10 h-10 rounded-full border-2 justify-center items-center border-primary flex">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/219/219983.png"
                  }
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        {}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setDrawerOpen(false)}
              />

              <motion.aside
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl p-6 overflow-y-auto"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-lg font-bold">
                    The Daily <span className="text-primary">Dish</span>
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={() => setDrawerOpen(false)}
                    className="btn btn-ghost"
                  >
                    Close
                  </button>
                </div>

                <nav>
  <ul className="flex flex-col gap-3">

    {/* Home + Meals */}
    {Links.filter(l => l.name !== "Dashboard").map((link) => (
      <li key={link.path}>
        <NavLink
          to={link.path}
          onClick={() => setDrawerOpen(false)}
          className={({ isActive }) =>
            `block py-2 px-3 rounded ${
              isActive
                ? "bg-primary text-white font-semibold"
                : "text-secondary"
            }`
          }
        >
          {link.name}
        </NavLink>
      </li>
    ))}

    {/* Dashboard dropdown */}
    <li>
      <button
        onClick={() => setDashboardOpen(!dashboardOpen)}
        className="w-full flex justify-between items-center py-2 px-3 font-semibold rounded hover:bg-base-200"
      >
        Dashboard
        <span className="text-xl">
          {dashboardOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {dashboardOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-4 mt-2 space-y-2 overflow-hidden"
          >
            <li>
              <Link
                to="/dashboard/my-meals"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2 block px-3 py-2 rounded text-sm hover:bg-primary hover:text-white"
              >
                <MdNoMeals />
                My Meals
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/my-favourites"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2 block px-3 py-2 rounded text-sm hover:bg-primary hover:text-white"
              >
                <AiOutlineLike />
                Favourite Meals
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-reviews"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2 block px-3 py-2 rounded text-sm hover:bg-primary hover:text-white"
              >
                <MdReviews />
                My Reviews
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/manage-orders"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2 block px-3 py-2 rounded text-sm hover:bg-primary hover:text-white"
              >
                <FiTruck />
                Manage Orders
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>

  </ul>
</nav>

              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
