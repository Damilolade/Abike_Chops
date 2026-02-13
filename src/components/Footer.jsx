import React from "react";
import { FaTiktok, FaInstagram, FaTwitter, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ====== Brand Info ====== */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-extrabold text-purple-600 mb-3">Abike_Chops</h2>
          <p className="text-white leading-relaxed">
            Delivering premium taste, creative flavors, and affordable catering
            services across Lagos. <br /> Good food, great moments, lasting
            memories.
          </p>
        </div>

        {/* ====== Quick Links ====== */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white">
            <li>
              <a href="/" className="hover:text-red-500 transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="/createorder" className="hover:text-red-500 transition-colors duration-200">Create Order</a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-500 transition-colors duration-200">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-500 transition-colors duration-200">Contact</a>
            </li>
          </ul>
        </div>

        {/* ====== Social Media & Emails ====== */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <a href="https://www.tiktok.com/@abikeschops" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition-all duration-300">
              <FaTiktok size={18} />
            </a>
            <a href="https://www.instagram.com/damilola_dev6" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="https://twitter.com/theDammi" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition-all duration-300">
              <FaTwitter size={18} />
            </a>
            <a href="https://wa.me/2348086902551" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition-all duration-300">
              <FaWhatsapp size={18} />
            </a>
            <a href="https://www.linkedin.com/in/olawepo-damilola-a5a1102b2" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-red-600 transition-all duration-300">
              <FaLinkedinIn size={18} />
            </a>
          </div>

          <p className="text-white text-sm mt-2">
            Email:{" "}
            <a href="mailto:dcfoods52@gmail.com" className="text-red-500 hover:underline">
              info@abikechops.com
            </a>
          </p>

          <p className="text-white text-sm mt-2">
            Developed by <span className="text-red-500 font-semibold">Damilola</span> —{" "}
            <a href="mailto:damilolaolawepo441@gmail.com" className="text-red-500 hover:underline">
              damilolaolawepo441@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-white">
        <p>
          © {new Date().getFullYear()} <span className="text-white">Abike_Chops</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
