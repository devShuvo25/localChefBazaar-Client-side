
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../axios/useAxiosSecure';
import useAuth from '../../hooks/authentication/useAuth';

const Orders = () => {
  const { axiosSecure } = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My <span className="text-primary">Orders</span>
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700">No orders found</h3>
            <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
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
                    src={order.mealImage || order.foodImage || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={order.mealName}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        order.orderStatus === 'delivered'
                          ? 'bg-green-500 text-white'
                          : order.orderStatus === 'cancelled'
                          ? 'bg-red-500 text-white'
                          : 'bg-yellow-400 text-gray-900'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-grow flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1" title={order.mealName || order.foodName}>
                      {order.mealName || order.foodName}
                    </h3>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 flex-grow">
                     {/* Chef Details */}
                     <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <div>
                         {/* Fallback for Chef Name if not present in data */}
                        <p className="font-semibold text-gray-800">{order.chefName || "Chef"}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]" title={order.chefId}>ID: {order.chefId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                       <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="font-semibold text-gray-800">৳ {order.price}</p>
                       </div>
                       <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="font-semibold text-gray-800">{order.quantity}</p>
                       </div>
                    </div>
                
                    <div className="flex items-center gap-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium">
                        Delivery: {order.delivaryDate ? new Date(order.delivaryDate).toLocaleDateString() : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Total Amount</p>
                      <p className="text-lg font-bold text-primary">৳ {order.totalPrice || (order.price * order.quantity + 40)}</p>
                    </div>
                    
                    <button disabled={order.orderStatus !=='Accepted'} className='btn btn-primary btn-xs'>Pay</button>
                     <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : order.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
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
