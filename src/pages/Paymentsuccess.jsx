import React, { useEffect } from "react";
import { useSearchParams, Link,  } from "react-router";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHome, FaListAlt } from "react-icons/fa";
import useAxiosSecure from "../axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tranId");
  const {axiosSecure}=useAxiosSecure()
  const sessionId = searchParams.get('session_id')
  const id = searchParams.get('id')

  console.log(sessionId);
  useEffect(() => {
    if(sessionId){
      axiosSecure.patch('/payment-success',{sessionId})
      .then(res => console.log(res.data))
    }

  },[axiosSecure,sessionId])

const {data: history = {}} = useQuery({
  queryKey: ['payment-history'],
  queryFn: async () => {
   if(id){
    console.log('id from params',id);
    try{
    const res = await axiosSecure.get(`/payment-history/${id}`,)
    return res.data
    }
    catch{
      console.log('Something Error');
    }
   }
  }
})
console.log('histor',history);
  return (
<div className="my-5 bg-habit-bg flex items-center justify-center  lg:py-12">
  <title>Payment Success</title>

  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
  >
    <div className="p-5 lg:p-8 text-center">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <FaCheckCircle className="text-5xl text-green-500" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
      <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>

      {/* Transaction Details */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Transaction Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="font-semibold text-green-600">{history?.paymentStatus}</span>
          </div>

          {history?.transectionId?.id && (
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-semibold text-gray-800 font-mono text-sm">{history?.transectionId.id.slice(3,20)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold text-gray-800">{history?.amount} TK</span>
          </div>


          {history?.parcelName && (
            <div className="flex justify-between">
              <span className="text-gray-600">Parcel Name</span>
              <span className="font-semibold text-gray-800">{history?.parcelName || 'N/A'}</span>
            </div>
          )}

          {history?.paidAt && (
            <div className="flex justify-between">
              <span className="text-gray-600">Paid At</span>
              <span className="font-semibold text-gray-800">{new Date(history?.paidAt * 1000).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="flex-1 btn btn-outline border-primary text-primary hover:bg-primary hover:text-white"
        >
          <FaHome className="mr-2" /> Home
        </Link>
        <Link
          to="/dashboard/my-orders"
          className="flex-1 btn btn-primary text-white"
        >
          <FaListAlt className="mr-2" /> My Orders
        </Link>
      </div>
    </div>

    {/* Confirmation Message */}
    <div className="bg-primary/10 p-4 text-center">
      <p className="text-sm text-primary font-medium">
        A confirmation email has been sent to your email.
      </p>
    </div>
  </motion.div>
</div>

  );
};

export default PaymentSuccess;
