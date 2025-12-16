import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../axios/useAxiosSecure";
import useAuth from "../../hooks/authentication/useAuth";
import PaymentLoader from "../../components/paymentloader/PaymentLoader";
import Loader from "../../components/Loader/Loader";



const Orders = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

const handlePayment = async (order) => {
  try {
    setPaymentLoading(true);

    const paymentInfo = {
      amount: order.totalPrice,
      customer_email: order.userEmail,
      mealId: order.mealId,
      mealName: order.mealName,
      orderId: order._id,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    if(res.data.url){
      window.location.assign(res.data.url);

    }
  } catch (err) {
      setPaymentLoading(false)

    console.error("Payment error:", err);
  }
};



  if (isLoading) {
    return (
     <Loader/>
    );
  }
  // payment handling

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <PaymentLoader show={paymentLoading} />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My <span className="text-primary">Orders</span>
        </h2>

        {/* Controls: Search, Filter, Sort - Edu-Plus Design */}
        <div className="mb-8">
          
          {/* Top Row: Search & Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
             {/* Search Bar - Rounded Full */}
             <div className="relative flex-grow shadow-sm">
               <input 
                 type="text" 
                 placeholder="Search orders..." 
                 className="w-full bg-white text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg py-3.5 pl-14 pr-6 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium h-12"
               />
               <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                 </svg>
               </span>
             </div>

             <div className="flex items-center gap-3 shrink-0">
               {/* Instruction 3: Add Filters button */}
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

               <div className="relative min-w-[200px]">
                  <select className="appearance-none w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-semibold cursor-pointer transition-all hover:shadow-md h-12">
                     <option>Newest First</option>
                     <option>Oldest First</option>
                     <option>Price: Low to High</option>
                     <option>Price: High to Low</option>
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
          {/* Instruction 4: Wrap filter grid in motion.div */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Order Status</label>
                      <div className="relative">
                         <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Cooking</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                         </select>
                         <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                               <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                         </span>
                      </div>
                   </div>

                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 ml-4 uppercase tracking-wider">Price Range</label>
                      <div className="relative">
                         <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                            <option>All Prices</option>
                            <option>Under ৳500</option>
                            <option>৳500 - ৳1000</option>
                            <option>৳1000+</option>
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
             <p className="text-gray-500 font-medium"><span className="text-gray-900 font-bold">{orders.length}</span> orders found</p>
             <button className="text-primary hover:text-green-700 font-semibold hover:underline flex items-center gap-1 transition-colors">Clear</button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No orders found
            </h3>
            <p className="text-gray-500 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={
                      order.mealImage ||
                      order.foodImage ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={order.mealName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        order.orderStatus === "delivered"
                          ? "bg-green-500 text-white"
                          : order.orderStatus === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-400 text-gray-900"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-xl font-bold text-gray-800 line-clamp-1"
                      title={order.mealName || order.foodName}
                    >
                      {order.mealName || order.foodName}
                    </h3>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 flex-grow">
                    {/* Chef Details */}
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </div>
                      <div>
                        {/* Fallback for Chef Name if not present in data */}
                        <p className="font-semibold text-gray-800">
                          {order.chefName || "Chef"}
                        </p>
                        <p
                          className="text-xs text-gray-500 truncate max-w-[150px]"
                          title={order.chefId}
                        >
                          ID: {order.chefId}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-semibold text-gray-800">
                          ৳ {order.price}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-semibold text-gray-800">
                          {order.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        Delivery:{" "}
                        {order.delivaryDate
                          ? new Date(order.delivaryDate).toLocaleDateString()
                          : "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Total Amount</p>
                      <p className="text-lg font-bold text-primary">
                        ৳{" "}
                        {order.totalPrice || order.price * order.quantity + 40}
                      </p>
                    </div>

                    <button
                      disabled={order.orderStatus !== "Accepted"}
                      onClick={() => handlePayment(order)}
                      className="btn btn-primary btn-xs px-5"
                    >
                      Pay
                    </button>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
