// src/components/protectedTrainingRoute.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const ProtectedTrainingRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // set user if logged in
      setLoading(false); // done checking
    });

    return () => unsubscribe(); // clean up listener
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 font-semibold">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/training/classlogin" replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedTrainingRoute;
