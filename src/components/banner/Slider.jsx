import React, { useState, useEffect } from "react";
// import game1 from '../assets/game_1_1.jpeg'
// import game2 from '../assets/game_2.jpeg'
// import game3 from '../assets/game_3.jpeg'
import { motion } from "framer-motion";

const FullWidthSlider = () => {
    const cards = [
    {
      title: 'Fresh Home-Cooked Meals',
      subtitle: 'Experience the authentic taste of homemade dishes prepared with love.',
      image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1920&auto=format&fit=crop"
    },
    {
      title: 'Expert Local Chefs',
      subtitle: 'Connect with talented local chefs who bring their passion to your table.',
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop"
    },
    {
      title: 'Healthy & Delicious',
      subtitle: 'Enjoy nutritious meals made from fresh, high-quality ingredients.',
      image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1920&auto=format&fit=crop"
    }
  ];
  
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= cards.length ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <motion.div
     initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex  transition-transform duration-700 ease-in-out"
        style={{
          width: `${cards.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / cards.length)}%)`,
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="relative w-full h-full">
        <img
          src={card.image}
          class="w-full h-full object-cover"
        />


      </div>
        ))}
      </div>
    </div>
    </motion.div>
  );
};

export default FullWidthSlider;
