import React, { useState, useEffect } from "react";
// import game1 from '../assets/game_1_1.jpeg'
// import game2 from '../assets/game_2.jpeg'
// import game3 from '../assets/game_3.jpeg'
import { motion } from "framer-motion";

const FullWidthSlider = () => {
const cards = [
  {
  title:'Build Better Habits, One Day at a Time',
  subtitle:'Track your daily routines, boost productivity, and grow with consistent habits.',
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQEJwmDDoNI3zSbxnlQ1h_ztLoTw8gU-iow&s"
  },
  {
  title:'Stay Consistent, Stay Ahead',
  subtitle:'Track your habits, build streaks, and boost your productivity.',
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfS7kbci9AX3pESqNQU6_QBRsxLXbW4ni6MA&s"
},
  {
  title:'Your Journey to Growth Starts Here',
  subtitle:'Set your goals, track progress, and transform your routine.',
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqmxEBj7frICwcRqgQqvEsleu4nFwKRw7Lqw&s"
  }
]
  
  
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
      className="px-3 rounded-2xl"
    >
          <div className="relative  w-full overflow-hidden rounded-2xl ">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${cards.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / cards.length)}%)`,
        }}
      >
        {cards.map((card) => (
                <div class="relative w-full lg:h-[450px]">
        <img
          src={card.image}
          class="w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-black opacity-60"></div>

        {/* <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
          <h1 class="text-2xl lg:text-5xl text-white font-bold ms-10 text-left ">
           {card.title}
          </h1>
          <h1 className="text-center text-xl font-semibold">
            {card.subtitle}
          </h1>
        </div> */}
      </div>
        ))}
      </div>
    </div>
    </motion.div>
  );
};

export default FullWidthSlider;
