import React, { useState } from "react";
import { Mail, Phone, MapPin, Twitter, Instagram } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "sending" | "success"

  // Validate form fields
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.message.trim()) e.message = "Please write a message.";
    return e;
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      return;
    }
    // Simulate sending
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Contact Us</h1>
      <p className="text-sm text-white mb-6">
        Follow us on social media or send a message using the form below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Left Column: Contact Info + Social */}
        <div className="md:col-span-1 space-y-4">
          {/* Contact Info */}
          <div className="p-4 bg-purple-700 shadow rounded-lg">
            <h2 className="text-sm font-semibold text-white mb-3">Contact Info</h2>

            <div className="flex items-start gap-3 mb-2">
              <MapPin size={18} className="text-white" />
              <div>
                <p className="text-xs text-white">Head Office</p>
                <p className="text-sm text-white">Yaba, Lagos, Nigeria</p>
              </div>
            </div>
            <a
            href="mailto:dcfoods52@gmail.com"
              className="flex items-start gap-3 mb-2 p-2 rounded-lg hover:underline break-all"
            >
           <Mail size={18} className="text-white mt-1" />

          <div className="flex flex-col">
          <p className="text-xs text-white opacity-80">Email</p>
          <p className="text-sm text-white break-words">
           dcfoods52@gmail.com
           </p>
           </div>
           </a>

          <a href="tel:+2348086902551" className="flex items-start gap-3 hover:underline">
              <Phone size={18} className="text-white mt-1" />
              <div>
                <p className="text-xs text-white">Phone</p>
                <p className="text-sm text-white">+234 808 690 2551</p>
              </div>
            </a>
          </div>

          {/* Social Media */}
          <div className="p-4 bg-purple-700 shadow rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Follow us</h3>
            <div className="flex gap-2">
              <a
                href="https://twitter.com/theDammi"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:bg-yellow-700"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/damilola_dev6"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:bg-yellow-700"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@abikeschops"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:bg-yellow-700"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://wa.me/2348086902551"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md hover:bg-yellow-700"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-purple-700 rounded-lg shadow space-y-4"
            noValidate
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Send a Message</h2>
              {status === "sending" && <p className="text-sm text-white">Sending…</p>}
              {status === "success" && <p className="text-sm text-white">Message sent — thank you!</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-white">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </label>

              <label className="block">
                <span className="text-xs text-white">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-blue-200"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </label>
            </div>
            <label className="block">
  <span className="text-xs text-white mb-1 block">Message</span>

  <textarea
    name="message"
    value={form.message}
    onChange={handleChange}
    rows={5}
    placeholder="How can we help?"
    className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm
      transition-all duration-200
      focus:outline-none focus:ring-2

      ${
        errors.message
          ? "border-red-400 focus:ring-red-200"
          : "border-gray-200 focus:ring-purple-300"
      }

      ${
        form.message
          ? "font-bold text-gray-900"
          : "font-normal text-gray-400"
      }
    `}
  />

  {errors.message && (
    <p className="text-xs text-red-500 mt-1">
      {errors.message}
    </p>
  )}
</label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 text-sm rounded-md hover:bg-transparent hover:shadow-lg transition-shadow duration-300 break-all disabled:opacity-60">
                Send Message
              </button>

              <a
                href="mailto:dcfoods52@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white hover:underline"
              >
                <Mail size={14} /> Email us
              </a>

              <a
                href="tel:+2348086902551"
                className="inline-flex items-center gap-2 text-sm text-white hover:underline"
              >
                <Phone size={14} /> Call
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
