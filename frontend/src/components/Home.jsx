// import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-900 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-blue-700 font-bold mb-6 text-center">
          Welcome to Our Website
        </h2>
        <p className="text-lg text-center text-blue-500 mb-12">
          This is the home page. Feel free to browse around and learn more about
          what we do.
        </p>
        <nav className="flex flex-col items-center space-y-4">
          <Link
            to="/register"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Login
          </Link>
          <Link
            to="/profile"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Home;
