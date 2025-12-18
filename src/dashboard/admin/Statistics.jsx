import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { FaUsers, FaClipboardList, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../axios/useAxiosSecure';

const Statistics = () => {
  // Dummy Data for Stat Cards
  const {axiosSecure} = useAxiosSecure()
  const [totalPayment,setTotalPayment] = useState()
  const [totalPending,setTotalPending] = useState()
  const [totalDeliverd,setTotalDelivered] = useState()
  const [totalCancelled,setTotalCancelled] = useState()
  const {data:users =[]} = useQuery({
    queryKey: ['totalUser'],
    queryFn: async() => {
      const res = await  axiosSecure.get('/users');
      return res.data
    }
      
     
  })
  useEffect(() => {
    axiosSecure.get('/all-orders')
    .then(res => {
      const orders = res.data;
      console.log(orders);
      const amountArr = orders.map(order => order.price)
      if(amountArr){
       const totalPayment = amountArr.reduce((total, num) => total + num, 0);
       setTotalPayment(totalPayment)
      }
      
    })
  },[axiosSecure])
  useEffect(() => {
    axiosSecure.get('/pending-orders')
    .then(res => {
      if(res.data){
        console.log(res.data);
       setTotalPending(res?.data?.length)
      }
      
    })
  },[axiosSecure])
  useEffect(() => {
    axiosSecure.get('/order-delivered')
    .then(res => {
      if(res.data){
        console.log(res.data);
       setTotalDelivered(res?.data?.length)
      }
      
    })
  },[axiosSecure])
  useEffect(() => {
    axiosSecure.get('/order-cancelled')
    .then(res => {
      if(res.data){
        console.log(res.data);
       setTotalCancelled(res?.data?.length)
      }
      
    })
  },[axiosSecure])
  const stats = [
    {
      id: 1,
      title: 'Total Payment Amount',
      value: totalPayment,
      icon: <FaWallet className="text-3xl" />,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      id: 2,
      title: 'Total Users',
      value: users.length,
      icon: <FaUsers className="text-3xl" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      title: 'Orders Pending',
      value: totalPending,
      icon: <FaClipboardList className="text-3xl" />,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 4,
      title: 'Orders Delivered',
      value: totalDeliverd,
      icon: <FaCheckCircle className="text-3xl" />,
      color: 'bg-sky-100 text-sky-600',
    },
  ];

  // Dummy Data for Bar Chart (Monthly Revenue)
  const barData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  // Dummy Data for Pie Chart (Order Distribution)
  const pieData = [
    { name: 'Delivered', value: totalDeliverd},
    { name: 'Pending', value: totalPending },
    { name: 'Cancelled', value: totalCancelled },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Platform Overview</h1>
          <p className="text-gray-500 mt-2">Key metrics and performance trends at a glance.</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className={`p-4 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          
          {/* Bar Chart - Revenue Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 font-primary">Revenue Trends (USD)</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#10b981" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Order Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 font-primary">Order Distribution</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-gray-600 font-medium ml-2">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Statistics;
