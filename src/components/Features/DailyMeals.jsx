import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../axios/useAxiosSecure';
import { FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';


const DailyMeals = () => {
    const navigate = useNavigate();
    const {axiosSecure} = useAxiosSecure();
      const { data: meals = [], isLoading: mealsLoading } = useQuery({
    queryKey: ["daily-meals"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/meals");
        return res.data;
      } catch {
        return [];
      }
    },
  });
  console.log(meals);
    const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
    return (
              <section className="py-5 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-primary">Today's</span> Fresh Meals
            </h2>
            <p className="text-neutral">
              Handpicked dishes from local chefs — updated daily.
            </p>
          </motion.div>

          {mealsLoading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals?.map((meal, i) => (
                <motion.div
                  key={meal._id || i}
                  initial="hidden"
                  whileInView="visible"
                  variants={itemVariants}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="bg-neutral rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                >
                  <div className="relative h-48 bg-gray-700">
                    <img
                      src={meal.foodImage}
                      alt={meal.foodName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <FaStar className="text-accent" />
                      <span className="font-bold">{meal.rating ?? "-"}</span>
                    </div>
                  </div>
                  <div className="p-4 text-secondary">
                    <h3 className="text-lg font-bold text-black">
                      {meal.foodName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      By <span className="font-semibold">{meal.chefName}</span>
                    </p>
                    <p className="text-primary font-bold mb-2">৳{meal.price}</p>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {meal.ingredients?.join(", ") ?? "Ingredients not listed"}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />{" "}
                        {meal.deliveryArea ?? "City"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-primary" />{" "}
                        {meal.estimatedDeliveryTime ?? "--"} mins
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/order/${meal._id}`, { state: { meal } })
                        }
                        className="btn btn-primary w-full"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/meals")}
              className="btn btn-primary"
            >
              View All Meals
            </button>
          </div>
        </div>
      </section>
    );
};

export default DailyMeals;