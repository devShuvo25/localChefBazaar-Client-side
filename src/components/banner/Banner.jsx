import React from 'react';
import { useNavigate } from 'react-router';
import FullWidthSlider from './Slider';
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[38vh] md:h-[85vh]  w-full overflow-hidden">
      <FullWidthSlider />

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
            Taste Home.{" "}
            <span className="text-primary">Support Local Chefs.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-200 max-w-2xl mx-auto">
            Fresh, homemade meals delivered right to your door. 
            Explore daily menus, check chef availability, and order securely.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <button
              onClick={() => navigate("/meals")}
              className=" sm:w-auto btn btn-primary btn-md sm:btn-lg"
            >
              Explore Daily Menus
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto btn btn-outline btn-md sm:btn-lg border-none shadow-none text-accent"
            >
              Become a Chef
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
