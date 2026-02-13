import React from "react";
import { motion } from "framer-motion";
import ourfood from "../assets/ourfood.jpg"; // optional image (replace with your own)
import ceo from "../assets/ceo.jpg";   // optional image (replace with your own)

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-red-50 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4"
        >
          About <span className="text-gray-800">Abike_Chops</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
        >
          At <span className="font-semibold text-red-600">Abike_Chops</span>, we believe food is more
          than taste — it’s creativity, culture, and connection. Our mission is
          to deliver delicious, handcrafted meals and small chops that make
          every event unforgettable — while also empowering others to learn the
          art of finger foods and catering.
        </motion.p>
      </div>

      {/* --- Our Goals --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 text-left"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            🌟 Our Goals
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg leading-relaxed">
            <li>🍢 Serve premium-quality finger foods and grilled dishes made with love.</li>
            <li>💡 Offer creative, affordable catering for events of all sizes.</li>
            <li>🎓 Teach and inspire people to make their own small chops professionally.</li>
            <li>🤝 Build a trusted community around food, creativity, and growth.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={ceo}
            alt="Abike Chops kitchen team"
            className="object-cover w-full h-80"
          />
        </motion.div>
      </div>

      {/* --- Teaching Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-lg order-2 md:order-1"
        >
          <img
            src={ourfood}
            alt="Learn small chops"
            className="object-cover w-full h-80"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 order-1 md:order-2 text-left"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            👩🏽‍🍳 Learn with Abike_Chops
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Beyond catering, we’re passionate about teaching others how to make
            delicious small chops — from puff-puff and samosas to spring rolls,
            grilled wings, and more. Through our tutorials and training programs,
            you’ll gain hands-on experience and confidence to start your own food journey.
          </p>
          <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all">
            Join Our Training
          </button>
        </motion.div>
      </div>

      {/* --- Vision Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mt-20 px-4"
      >
        <h2 className="text-3xl font-bold text-red-600 mb-3">
          Our Vision
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          To be Nigeria’s leading brand for finger foods and small chops — known
          not just for taste, but for creativity, community, and empowerment.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
