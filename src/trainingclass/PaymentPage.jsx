import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

// React Icons
import { FaCreditCard, FaUniversity, FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [method, setMethod] = useState("card");
  const [manualRef, setManualRef] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ Proper Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/training/classlogin");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) return null;

  // ✅ Grant access after verified payment
  const storeAccess = (paymentMethod = "card") => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    localStorage.setItem(
      "ourclass",
      JSON.stringify({
        registered: true,
        paid: true,
        method: paymentMethod,
        email: user.email,
        expiresAt: expiresAt.toISOString(),
      }),
    );

    setSuccess(true);

    setTimeout(() => {
      navigate("/training/ourclass");
    }, 1500);
  };

  // ✅ Flutterwave Payment
  const handleFlutterPayment = () => {
    if (!window.FlutterwaveCheckout) {
      alert("Payment system not loaded. Please refresh.");
      return;
    }

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: Date.now().toString(),
      amount: 5000,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: user.email,
        name: user.displayName || user.email,
      },
      customizations: {
        title: "Training Class Access",
        description: "Payment for training access",
        logo: "https://your-logo-url.com/logo.png",
      },
      callback: function (response) {
        if (
          response.status === "successful" &&
          response.amount === 5000 &&
          response.currency === "NGN"
        ) {
          storeAccess("card");
        } else {
          alert("Payment verification failed.");
        }
      },
      onclose: function () {
        console.log("Payment closed");
      },
    });
  };

  const handleManualPaymentSubmit = () => {
    if (!manualRef.trim()) {
      alert("Please enter your transaction reference.");
      return;
    }
    storeAccess("manual");
  };

  const paymentMethods = [
    {
      id: "card",
      label: "Card / Online",
      icon: <FaCreditCard className="inline mr-2" />,
    },
    {
      id: "bank",
      label: "Bank Transfer / USSD",
      icon: <FaUniversity className="inline mr-2" />,
    },
    {
      id: "manual",
      label: "Manual ATM",
      icon: <FaMoneyCheckAlt className="inline mr-2" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-red-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-gray-100 relative"
      >
        {/* Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-3xl"
            >
              <AiOutlineCheckCircle className="text-green-600 text-8xl mb-4 animate-bounce" />
              <p className="text-green-700 font-bold text-xl">
                Payment Successful!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
          Training Payment
        </h2>

        <p className="text-black text-base sm:text-lg mb-6">
          Choose a payment method to access the training class.
        </p>

        {/* Payment Method Buttons */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`px-4 py-2 rounded-xl font-semibold flex items-center justify-center ${
                method === m.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-black border"
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>

        {/* CARD PAYMENT */}
        {method === "card" && (
          <button
            onClick={handleFlutterPayment}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow hover:bg-purple-700 transition-transform transform hover:scale-105 duration-200"
          >
            Pay Now
          </button>
        )}

        {/* BANK TRANSFER */}
        {method === "bank" && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-black mb-2 flex items-center justify-center">
              <FaUniversity className="mr-2" />
              Bank Transfer Instructions
            </h3>

            <p className="text-gray-600 text-sm mb-2">
              Account Name: <strong>Abike Chops Training</strong>
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Account Number: <strong>2152364902</strong>
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Bank: <strong>UBA</strong>
            </p>

            <button
              onClick={() => storeAccess("bank")}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold shadow hover:bg-red-700 transition flex items-center justify-center"
            >
              <AiOutlineCheckCircle className="mr-2" />I have paid
            </button>
          </div>
        )}

        {/* MANUAL ATM */}
        {method === "manual" && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center justify-center">
              <FaMoneyCheckAlt className="mr-2" />
              Manual ATM Payment
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              Transfer ₦5,000 to the account above and enter the transaction
              code:
            </p>

            <input
              type="text"
              placeholder="Enter transaction reference"
              value={manualRef}
              onChange={(e) => setManualRef(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold text-gray-800"
            />

            <button
              onClick={handleManualPaymentSubmit}
              className="w-full bg-red-600 text-white py-2 rounded-xl font-bold shadow hover:bg-red-700 transition flex items-center justify-center"
            >
              <AiOutlineCheckCircle className="mr-2" />
              Submit Reference
            </button>
          </div>
        )}

        <p className="text-sm text-purple-500 mt-6">
          Secure payments powered by Flutterwave
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
