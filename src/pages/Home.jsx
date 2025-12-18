import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FullWidthSlider from "../components/banner/Banner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Banner from "../components/banner/Banner";
import DailyMeals from "../components/Features/DailyMeals";
import CustommerReviews from "../components/Reviews/CustommerReviews";
import HIT from "../components/additional/HIT";
import Action from "../components/additional/Action";
import Welcome from "../components/additional/Welcome";
import useUserData from "../hooks/userRole/useRole";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { role } = useUserData();
  const containerRef = useRef();

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".gsap-section");
      sections.forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );
  console.log(role);

  return (
    <div ref={containerRef} className="bg-bg font-inter overflow-hidden">
      <title>Home</title>

      {/* HERO / BANNER */}
      <div className="gsap-section">
        <Banner />
      </div>

      {/* WELCOME / INTRO */}
      <div className="gsap-section">
        <Welcome />
      </div>

      {/* DYNAMIC DAILY MEALS */}
      <div className="gsap-section">
        <DailyMeals />
      </div>

      {/* CUSTOMER REVIEWS */}
      <div className="gsap-section">
        <CustommerReviews />
      </div>

      {/* EXTRA SECTION: HOW IT WORKS (ADDITIONAL) */}
      <div className="gsap-section">
        <HIT />
      </div>

      <div className="gsap-section">
        <Action />
      </div>
    </div>
  );
};

export default Home;
