import React from 'react';
import useAxiosSecure from '../../axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { FaStar } from 'react-icons/fa';


const CustommerReviews = () => {
    const {axiosSecure} = useAxiosSecure();
    const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["customer-reviews"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/reviews?limit=6");
        return res.data;
      } catch {
        return [];
      }
    },
  });
    return (
      <section className="py-16 px-4 bg-neutral">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              What Our <span className="text-primary">Customers</span> Say
            </h2>
            <p className="text-secondary">
              Real reviews from satisfied customers
            </p>
          </motion.div>

          {reviewsLoading ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((r, idx) => (
                <motion.div
                  key={r._id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-5 shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      <img className="h-full w-full rounded-[50%]" src={r.reviewerImage} alt={(r.reviewerImage || "?").charAt(0)}  />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary">
                        {r.reviewerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(r.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary mb-3">"{r.comment}"</p>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < (r.rating || 0) ? "text-accent" : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
};

export default CustommerReviews;