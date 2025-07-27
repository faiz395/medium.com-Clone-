// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-md hover:bg-gray-700 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
