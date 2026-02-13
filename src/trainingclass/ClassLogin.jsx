import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ClassLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault(); // prevent page reload
    setLoading(true);
    setError(null);

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);

      // Redirect to protected training page
      navigate("/training/ourclass");
    } catch (err) {
      console.error(err.code, err.message);

      let msg = "Login failed";
      switch (err.code) {
        case "auth/user-not-found":
          msg = "No account found with this email";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password";
          break;
        case "auth/invalid-email":
        case "auth/invalid-credential":
          msg = "Invalid email or password";
          break;
        default:
          msg = "Something went wrong. Try again.";
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white/90 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Training Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 py-2 border rounded font-semibold text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-600"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-indigo-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-10 py-2 border rounded font-semibold text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-600"
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-600 text-sm">{error}</p>
      )}

      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/training/classform")}
          className="text-indigo-600 font-semibold cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default ClassLogin;
