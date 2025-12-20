import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../axios/useAxiosSecure";
import useAuth from "../../hooks/authentication/useAuth";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const Manage_Request = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      const res = axiosSecure.get("/user-request");
      return (await res).data;
    },
  });

  const handleManageRequest = (id, action, type) => {
    if (id && action) {
      Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to ${action.slice(
          0,
          -2
        )} this request as a ${type}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${action.slice(0, -2)}`,
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(
              `/user-request?id=${id}&action=${action}&type=${type}&email=${user?.email}`
            )
            .then((res) => {
              if (res.data) {
                refetch();
                Swal.fire({
                  title: action,
                  text: `Your request has been ${action}`,
                  icon: "success",
                });
              }
            });
        }
      });
    }
  };

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <h2 className="text-xl font-semibold mb-4">
        Manage User Requests
      </h2>

      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Manage User Requests
      </h2>

      {/* Controls: Search, Filter, Sort - Edu-Plus Design */}
      <div className="mb-6">
        
        {/* Top Row: Search & Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
           {/* Search Bar */}
           <div className="relative flex-grow shadow-sm">
             <input 
               type="text" 
               placeholder="Search by name or email..." 
               className="w-full bg-white text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg py-3.5 pl-14 pr-6 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium h-12"
             />
             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
               </svg>
             </span>
           </div>

           <div className="flex items-center gap-3 shrink-0">
             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 border px-6 py-3.5 rounded-lg font-semibold transition-all hover:shadow-md h-12 min-w-[120px] justify-center ${
                  showFilters 
                    ? 'bg-primary text-white border-primary shadow-lg ring-2 ring-primary/20' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                }`}
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                Filters
             </button>

             <div className="relative min-w-[170px]">
                <select className="appearance-none w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-semibold cursor-pointer transition-all hover:shadow-md h-12">
                   <option>Newest First</option>
                   <option>Oldest First</option>
                </select>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                   </svg>
                </span>
             </div>
           </div>
        </div>

        {/* Filters Row */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Request Type</label>
                    <div className="relative">
                       <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                          <option>All Types</option>
                          <option>Chef</option>
                          <option>Admin</option>
                       </select>
                       <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                       </span>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Status</label>
                    <div className="relative">
                       <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                          <option>All Status</option>
                          <option>Pending</option>
                          <option>Accepted</option>
                          <option>Rejected</option>
                       </select>
                       <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                       </span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-4 flex justify-between items-center text-sm px-2">
           <p className="text-gray-500 font-medium"><span className="text-gray-900 font-bold">{requests.length}</span> requests found</p>
           <button className="text-primary hover:text-green-700 font-semibold hover:underline flex items-center gap-1 transition-colors">Clear</button>
        </div>
      </div>

      {/* ===================== MOBILE VIEW ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={req.user_image}
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{req.user_name}</p>
                <p className="text-xs text-gray-500">
                  {req.user_email}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Request Type</span>
              <span className="badge badge-secondary">
                {req.request_type}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span
                className={`badge ${
                  req.request_status === "Pending"
                    ? "badge-warning"
                    : req.request_status === "Accepted"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {req.request_status}
              </span>
            </div>

            <p className="text-xs text-gray-400">
              {req.request_time}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                disabled={req.request_status !== "Pending"}
                onClick={() =>
                  handleManageRequest(
                    req?._id,
                    "Accepted",
                    req.request_type
                  )
                }
                className="btn btn-success btn-sm text-white w-full sm:w-auto sm:flex-1"
              >
                Accept
              </button>

              <button
                disabled={req.request_status !== "Pending"}
                onClick={() =>
                  handleManageRequest(
                    req?._id,
                    "Rejected",
                    req.request_type
                  )
                }
                className="btn btn-error btn-sm text-white w-full sm:w-auto sm:flex-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== TABLET + DESKTOP ===================== */}
      <div className="hidden lg:block overflow-x-auto rounded-lg shadow bg-white">
        <table className="table min-w-[900px]">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th>

              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-gray-50"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={req.user_image} alt="user" />
                    </div>
                    <div>
                      <p className="font-bold">{req.user_name}</p>
                      <p className="text-xs opacity-50">
                        {req.user_email}
                      </p>
                    </div>
                  </div>
                </td>



                <td>
                  <span className="badge badge-secondary">
                    {req.request_type}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      req.request_status === "Pending"
                        ? "badge-warning"
                        : req.request_status === "Accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.request_status}
                  </span>
                </td>

                <td className="text-sm text-gray-600">
                  {req.request_time}
                </td>

                <td className="flex items-center gap-2">
                  <button
                    disabled={req.request_status !== "Pending"}
                    onClick={() =>
                      handleManageRequest(
                        req?._id,
                        "Accepted",
                        req.request_type
                      )
                    }
                    className="btn btn-success btn-xs text-white"
                  >
                    Accept
                  </button>

                  <button
                    disabled={req.request_status !== "Pending"}
                    onClick={() =>
                      handleManageRequest(
                        req?._id,
                        "Rejected",
                        req.request_type
                      )
                    }
                    className="btn btn-error btn-xs text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage_Request;
