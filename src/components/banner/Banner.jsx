import React from 'react';
import { useNavigate } from 'react-router';
import FullWidthSlider from './Slider';
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    if (search) {
      navigate(`/meals?search=${search}`);
    } else {
      navigate("/meals");
    }
  };

  return (
    <section className="relative h-[50vh] md:h-[85vh] w-full overflow-hidden font-inter">
      <FullWidthSlider />

      {/* Overlay Gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl w-full flex flex-col items-center"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl"
          >
            Taste the <span className="text-primary italic">Authentic</span> <br />
            Flavors of Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto font-medium drop-shadow-md"
          >
            Connect with local chefs and enjoy fresh, homemade meals delivered to your doorstep.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 w-full max-w-lg pointer-events-auto"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                placeholder="Find your favorite meal..."
                className="w-full py-4 pl-6 pr-32 text-gray-800 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-2 border-white/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-base sm:text-lg placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-green-600 text-white font-semibold rounded-full px-6 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                Search
              </button>
            </form>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center pointer-events-auto w-full sm:w-auto"
          >
            <button
              onClick={() => navigate("/meals")}
              className="btn hidden lg:flex btn-primary btn-lg rounded-full px-10 text-white shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 transform w-full sm:w-auto border-none"
            >
              Explore Menus
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <button
              onClick={() => navigate("/register")}
              className="btn hidden lg:flex btn-lg rounded-full px-10 bg-white/10 backdrop-blur-md border border-white/40 text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto group"
            >
              Become a Chef
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

};

export default Banner;
