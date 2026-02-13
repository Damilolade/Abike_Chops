import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "animate.css";

import premium from "../assets/premium.jpg";
import abikechops from "../assets/abikechops.jpg";
import CANAPES from "../assets/CANAPES.jpg";
import smallchops from "../assets/smallchops.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/createorder");
  };

  return (
    <div className="bg-black text-white">

      {/* ================= HERO SECTION ================= */}
      <div
        className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 py-8"
        style={{
          backgroundImage: `url(${premium})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-purple-900/60 to-black/90"></div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Hero Title */}
          <h1 className="animate__animated animate__backInDown text-4xl md:text-5xl font-extrabold text-gold mb-2 drop-shadow-xl">
            ABIKE<span className="text-white">_CHOPS</span>
          </h1>

          {/* Hero Subtitle */}
          <h2 className="animate__animated animate__backInUp animate__delay-1s text-xl md:text-2xl font-light text-purple-200 mb-6">
            Heart of Finger Food & Grill in Lagos
          </h2>

          {/* Cards */}
          <div className="animate__animated animate__backInLeft animate__delay-2s grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { img: abikechops, title: "We’re not just Food, we’re Creativity" },
              { img: CANAPES, title: "Bite & Smile" },
              { img: smallchops, title: "Our Meal, Your Meal 🌶️🌶️" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={handleCardClick}
                className={`cursor-pointer rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl p-2
                  animate__animated animate__backInUp animate__delay-${index + 1}s`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h2 className="py-2 text-purple-800 font-semibold text-base">
                  {item.title}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Explore Button */}
          <button
            onClick={() => navigate("/createorder")}
            className="animate__animated animate__backInRight animate__delay-3s bg-gold hover:bg-yellow-500 text-red-700 px-8 py-3 rounded-full text-base font-semibold shadow-md"
          >
            Explore Our Orders
          </button>

          {/* Quote */}
          <div className="animate__animated animate__backInUp animate__delay-4s text-center max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-4xl font-bold text-white/90">
              “Good food. Great prices. Happy people.”
            </h1>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-white text-black py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="animate__animated animate__backInDown text-3xl md:text-4xl font-extrabold text-purple-700 mb-6">
            Why Choose <span className="text-gold">Abike_Chops?</span>
          </h2>

          <p className="animate__animated animate__backInUp animate__delay-1s text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            We’re passionate about turning meals into experiences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "🎉 Event Catering", desc: "From weddings to birthdays, flavor guaranteed." },
              { title: "🔥 Grills & Finger Foods", desc: "Freshly made, hot and delicious." },
              { title: "💰 Affordable Packages", desc: "Top-tier taste at friendly prices." },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`animate__animated animate__backInUp animate__delay-${index + 1}s rounded-2xl p-6 shadow-lg bg-gradient-to-b from-purple-800 to-black border border-gold`}
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
