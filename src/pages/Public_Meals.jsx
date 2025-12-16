import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import MealsCard from "../components/cards/MealsCard";
import FeaturesCard from "../components/cards/FeaturesCard";
import Loader from "../components/Loader/Loader";

const Public_Meals = () => {
  const navigate = useNavigate();
  const { axiosSecure } = useAxiosSecure();
  const [showFilters, setShowFilters] = useState(false);

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["public-meals"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/meals");
        return res.data;
      } catch {
        return [];
      }
    },
  });

  return (
    <div className=" font-inter">
      {/* Header / Hero */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-primary"
          >
            Daily Meals
          </motion.h1>
          <p className="text-secondary mt-3">
            Browse today's available meals from trusted local chefs.
          </p>
        </div>
      </section>

      {/* Controls: Search, Filter, Sort, View */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
             {/* Search Bar - Square/Rounded-lg Style */}
             <div className="relative w-full lg:max-w-2xl shadow-sm">
               <input 
                 type="text" 
                 placeholder="Search for meals, chefs, or categories..." 
                 className="w-full bg-white text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg py-3.5 pl-14 pr-6 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium h-14"
               />
               <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                 </svg>
               </span>
             </div>

             {/* Action Buttons - Square/Rounded-lg Style */}
             <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
               <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 border px-6 py-3.5 rounded-lg font-semibold transition-all hover:shadow-md h-14 min-w-[120px] justify-center ${
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
               
               <div className="relative h-14 min-w-[180px]">
                  <select className="appearance-none w-full h-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3.5 pl-6 pr-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-semibold cursor-pointer transition-all hover:shadow-md">
                     <option>Recommended</option>
                     <option>Price: Low to High</option>
                     <option>Price: High to Low</option>
                     <option>Newest</option>
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                     </svg>
                  </span>
               </div>
             </div>
          </div>

          {/* Expanded Filters Row with Animation */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-2">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-4">Category</label>
                      <div className="relative">
                         <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                            <option>All Categories</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                         </select>
                         <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                               <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                         </span>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-4">Price Range</label>
                      <div className="relative">
                         <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                            <option>All Prices</option>
                            <option>Under ৳100</option>
                            <option>৳100 - ৳300</option>
                            <option>৳300+</option>
                         </select>
                         <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                               <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                         </span>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 ml-4">Chef</label>
                      <div className="relative">
                         <select className="w-full appearance-none bg-gray-50 hover:bg-white text-gray-700 border border-gray-200 rounded-lg py-3 pl-6 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all font-medium h-12">
                            <option>All Chefs</option>
                            <option>Chef A</option>
                            <option>Chef B</option>
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
        </div>
      </section>

      {/* Meals grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <Loader/>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <MealsCard
                  key={meal._id}
                  meal={meal}
                  onOrder={(m) =>
                    navigate(`/order/${m._id}`, { state: { meal: m } })
                  }
                  onDetails={(m) =>
                    navigate(`/order/${m._id}`, { state: { meal: m } })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Extra Section 1: Featured Chefs (uses FeaturesCard) */}
      <section className="py-12 px-4 ">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            Featured Chefs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeaturesCard
              icon={"👨‍🍳"}
              title={"Chef A"}
              description={
                "Specializes in homestyle Bengali cuisine. 10+ yrs experience."
              }
              ctaText={"View Menu"}
              onCtaClick={() => navigate("/meals")}
            />
            <FeaturesCard
              icon={"👩‍🍳"}
              title={"Chef B"}
              description={"Healthy options and gluten-free meals."}
              ctaText={"View Menu"}
              onCtaClick={() => navigate("/meals")}
            />
            <FeaturesCard
              icon={"🍳"}
              title={"Chef C"}
              description={"Quick lunches and family meals."}
              ctaText={"View Menu"}
              onCtaClick={() => navigate("/meals")}
            />
          </div>
        </div>
      </section>

      {/* Extra Section 2: How It Works */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-primary mb-3">How it works</h3>
          <p className="text-neutral mb-6">
            Find, order and enjoy — it only takes a few clicks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-sm p-6 rounded-lg">
              {" "}
              <h4 className="font-semibold text-primary">Explore</h4>
              <p className="text-sm text-gray-600">Browse daily menus</p>
            </div>
            <div className="bg-white shadow-sm p-6 rounded-lg">
              {" "}
              <h4 className="font-semibold text-primary">Order</h4>
              <p className="text-sm text-gray-600">
                Secure checkout and confirmation
              </p>
            </div>
            <div className="bg-white shadow-sm p-6 rounded-lg">
              {" "}
              <h4 className="font-semibold text-primary">Enjoy</h4>
              <p className="text-sm text-gray-600">
                Delivered fresh to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Section 3: Subscribe CTA */}
      <section className="py-12 px-4 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-primary">Stay updated with daily menus</h4>
            <p className="text-neutral">
              Subscribe for notifications and special offers from chefs near
              you.
            </p>
          </div>
          <div className="flex gap-2">
            <input className="input input-bordered" placeholder="Your email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Public_Meals;
