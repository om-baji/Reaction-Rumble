import React from 'react';
import { useForm } from 'react-hook-form';
import { BACKEND_URL } from '../../config';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name,
        email,
        password,
      });
      if (!res.data.success) throw new Error("Something went wrong " + res?.data.error);

      toast.success("Signup successful", {
        duration: 3000,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/face");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900 text-white">
 
      <div className="bg-gray-800 text-white flex flex-col justify-center items-center p-8 md:p-16 relative">
    
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-900 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-32 -right-16 w-64 h-64 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 rounded-full blur-2xl"></div>
        </div>

        <h1 className="text-4xl font-bold mb-6 z-10">Join Us Today</h1>
        <p className="text-gray-400 mb-6 z-10">Create an account to explore our features.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 z-10">
          Explore Features
        </button>
      </div>


      <div className="flex items-center justify-center p-8 md:p-16 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-3 mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-3 mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white"
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
