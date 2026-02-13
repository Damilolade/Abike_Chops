// src/trainingclass/OurClass.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed
import "animate.css";

import freshspringroll from "../assets/freshspringroll.jpg";
import samosa from "../assets/samosa.jpg";
import ourfood from "../assets/ourfood.jpg";
import platter1 from "../assets/platter1.jpg";

const OurClass = () => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // ✅ user is logged in
      const raw = localStorage.getItem("ourclass");

      if (!raw) {
        // logged in but no payment record yet
        setAllowed(false);
        setLoading(false);
        return;
      }

      const data = JSON.parse(raw);

      const now = new Date();
      const expiry = data.expiresAt ? new Date(data.expiresAt) : null;

      if (data.paid && expiry && now < expiry) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading training...</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Training Locked
          </h1>
          <p className="text-gray-600 mb-4">
            Please complete payment to access the training.
          </p>
          <a
            href="/training/payment"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Go to Payment
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-red-50 via-white to-pink-50 px-6 py-16 space-y-20">
      {/* INTRO */}
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4"
        >
          Welcome to the Training Class 🎓
        </motion.h1>

        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          Learn professional small chops — puff-puff, samosas, spring rolls & more.
        </p>
      </div>

      {/* GALLERY */}
      <div className="flex gap-4 flex-wrap justify-center">
        <img src={samosa} className="w-48 rounded-lg shadow animate__animated animate__fadeInLeft" />
        <img src={freshspringroll} className="w-48 rounded-lg shadow animate__animated animate__fadeInUp" />
        <img src={ourfood} className="w-48 rounded-lg shadow animate__animated animate__fadeInDown" />
        <img src={platter1} className="w-48 rounded-lg shadow animate__animated animate__fadeInRight" />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold mb-3">What You’ll Learn</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Professional puff-puff techniques</li>
          <li>Crispy samosa & spring roll folding</li>
          <li>Batch production for events</li>
          <li>Pricing & customer handling</li>
        </ul>
      </div>
    </section>
  );
};

export default OurClass;
