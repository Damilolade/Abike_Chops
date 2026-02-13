import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

/* 🔹 Centralized Firebase signup errors */
const SIGNUP_ERROR_MESSAGES = {
  "auth/email-already-in-use": "Email already in use",
  "auth/weak-password": "Password must be at least 6 characters",
  "auth/invalid-email": "Invalid email address",
};

const ClassForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // ✅ Create user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      // ✅ Update profile
      await updateProfile(userCred.user, {
        displayName: trimmedName,
      });

      setSuccess("Account created successfully 🎉");

      // Clear form
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");

      // Redirect to login
      setTimeout(() => {
        navigate("/training/classlogin");
      }, 1200);
    } catch (err) {
      console.error(err);

      const message =
        SIGNUP_ERROR_MESSAGES[err.code] || "Signup failed";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/80 backdrop-blur rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create Training Account
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-indigo-500" />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-10 px-4 py-2 border rounded-md
              font-semibold text-gray-900
              placeholder:text-gray-400
              caret-indigo-600
              focus:outline-none focus:ring-2
              focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-indigo-500" />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-10 px-4 py-2 border rounded-md
              font-semibold text-gray-900
              placeholder:text-gray-400
              caret-indigo-600
              focus:outline-none focus:ring-2
              focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 px-4 py-2 border rounded-md
              font-semibold text-gray-900
              placeholder:text-gray-400
              caret-indigo-600
              focus:outline-none focus:ring-2
              focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-indigo-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-10 px-4 py-2 border rounded-md
              font-semibold text-gray-900
              placeholder:text-gray-400
              caret-indigo-600
              focus:outline-none focus:ring-2
              focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-indigo-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700
            text-white py-2 rounded-md font-bold tracking-wide
            disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 text-sm text-green-600 text-center">
          {success}
        </p>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/training/classlogin"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ClassForm;
