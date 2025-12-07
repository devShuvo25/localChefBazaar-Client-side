import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import MealsCard from "../components/cards/MealsCard";
import FeaturesCard from "../components/cards/FeaturesCard";
import Loader from "../components/Loader/Loader";

const Public_Meals = () => {
  const navigate = useNavigate();
  const { axiosSecure } = useAxiosSecure();
//   const [sortOrder, setSortOrder] = useState("desc"); // desc or asc

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

      {/* Controls: Sort */}
      <section className="py-6 px-4">
        <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg text-secondary">
              Showing{" "}
              <span className="font-semibold text-secondary">
                {meals.length}
              </span>{" "}
              meals
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-secondary">Sort by price</label>
          </div>
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
