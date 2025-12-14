import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import useAuth from "../hooks/authentication/useAuth";
import Loader from "../components/Loader/Loader";
import {
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import useUserData from "../hooks/userRole/useRole";

const OrderRequest = () => {
    const {axiosSecure} = useAxiosSecure()
    const {chefId} = useUserData()
    console.log(chefId)
    const {data: orders =[],isLoading,refetch} = useQuery({
        queryKey: ['order-request'],
        queryFn: async() => {
            if(chefId){
                try{
                    const res = await axiosSecure.get(`/order-request/${chefId}`)
            return res.data
                }
                catch{
                    console.log("Something went wrong");
                }
            }
        }
    })
const handleOrderRequest = (id,action) => {
  console.log(id,action);
  if(id && action){
    try{
      axiosSecure.post(`/update-order?id=${id}&action=${action}`,)
      .then(res => {
        if(res.data.modifiedCount){
          refetch();
        }
      })

    }catch{
      console.log("SOmething went wrong");
    }
  }

}

console.log(orders)
  if (isLoading) return <Loader fullScreen message="Fetching your orders..." />;

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-bg">
//         <div className="text-center text-red-600">
//           <p className="text-lg font-semibold">Error loading orders</p>
//           <p className="text-sm">{error.message}</p>
//         </div>
//       </div>
//     );

  return (
    <div className="min-h-screen bg-bg py-4  md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            Order Requests
          </h1>
          <p className="text-gray-600">
            Manage and fulfill orders from your customers
          </p>
        </div>

        {/* No orders */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2x p-5 lg:p-10 text-center shadow-md">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-secondary mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-600">
              You don't have any orders. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  {/* Left: Order Details */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Food Info */}
                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-1">
                          {order.foodName}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <span className="font-semibold">Price:</span> ৳
                            {order.price}
                          </p>
                          <p>
                            <span className="font-semibold">Quantity:</span>{" "}
                            {order.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Order Status & Payment */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">
                            Order Status:
                          </span>
                          <span
                            className={`px-3 ms-[22px] py-1 rounded-full text-xs font-semibold ${
                              order.orderStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : order.orderStatus === "accepted"
                                ? "bg-blue-100 text-blue-700"
                                : order.orderStatus === "delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.orderStatus || "Pending"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">
                            Payment Status:
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.paymentStatus === "completed"
                                ? "bg-green-100 text-green-700"
                                : order.paymentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.paymentStatus || "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-200"></div>

                    {/* User & Order Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          Customer Email
                        </p>
                        <p className="text-gray-600">{order.userEmail}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaClock className="text-primary mt-1 shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order Time
                          </p>
                          <p className="text-gray-600">
                            {order.orderTime
                              ? new Date(order.orderTime).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex items-start gap-2">
                        <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Delivery Address
                          </p>
                          <p className="text-gray-600">{order.userAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="bg-secondary/5 p-6 md:p-8 flex flex-col justify-between md:min-w-max">
                    <div className="mb-4 md:mb-0">
                      <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                        Actions
                      </p>
                    </div>
                    <div className="flex flex-row md:flex-col gap-3">
                      {/* Cancel Button */}
                      <button
                      disabled={order.orderStatus !=='Pending'}
                      onClick={() => handleOrderRequest(order._id, 'Cancel')}
                        
                        className="flex-1 md:flex-none px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>

                      {/* Accept Button */}
                      <button
                      disabled={order.orderStatus !=='Pending'}

                       onClick={() => handleOrderRequest(order._id, 'Accept')}
                        
                        className="flex-1 md:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                    Accept
                      </button>

                      {/* Deliver Button */}
                      <button
                      onClick={() => handleOrderRequest(order._id, 'Deliverd')}
                       
                        
                        className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Deliverd
                      </button>
                    </div>
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

export default OrderRequest;
