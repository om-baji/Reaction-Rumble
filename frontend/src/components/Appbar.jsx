import React from 'react';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <nav className="bg-opacity-30 backdrop-blur-lg bg-zinc-900 text-white p-4 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
  
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-400">
          Reaction Rumble
        </h1>

        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="/login"
            className="hover:text-blue-400 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-blue-400 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
