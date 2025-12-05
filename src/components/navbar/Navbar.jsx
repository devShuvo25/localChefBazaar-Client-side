import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/authentication/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  const Links = [
    { name: "Home", path: "/" },
    {name: "Meals" , path:"/meals"}
    ];
  const handleLogOut = () => {
    logout();
    navigate("login")
  };
  return (
    <div>
      <div className="navbar bg-white shadow-sm text-secondary px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            ></ul>
          </div>
          <a className=" text-xl font-bold ">
            MALL<span className="text-primary">IK</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex  gap-5 items-center px-1">
            {Links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    ` ${isActive ? "text-primary font-semibold   mb-2" : "my-links"}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
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
              <button onClick={handleLogOut} className="btn btn-primary">Logout</button>
              {/* <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/219/219983.png"} alt="" /> */}
              <div
                
        
                className=" m-1 w-10 h-10 rounded-[50%] border-[2px] justify-center items-center border-primary  flex "
              >
                <img className="h-8 w-8  rounded-[50%]" src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/219/219983.png"} alt="" />
              </div>
            </div>
          )}
        </div>
        {}
      </div>
    </div>
  );
};

export default Navbar;
