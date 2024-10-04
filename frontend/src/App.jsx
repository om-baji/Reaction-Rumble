import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from './components/Appbar';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <AppBar />

      <div className="flex-1 flex flex-col justify-center items-center mt-24 md:mt-32 p-4 relative">
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-20 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-900 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-32 -right-16 w-64 h-64 bg-gradient-to-r from-yellow-400 to-yellow-700 opacity-20 rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="max-w-3xl text-center space-y-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Welcome to Reaction Rumble
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            The ultimate platform to spark conversations, share opinions, and make your voice heard. Join the rumble!
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="relative z-10 mt-12 w-full max-w-lg p-6 bg-opacity-30 backdrop-blur-lg bg-gray-800/50 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-yellow-400">Get Started</h2>
          <div className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 font-semibold w-full text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 font-semibold w-full text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;