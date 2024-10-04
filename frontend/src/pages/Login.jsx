import React from 'react';
import { useForm } from 'react-hook-form';
import { BACKEND_URL } from '../../config';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
        email,
        password
      });

      console.log(BACKEND_URL)
      if (!res.data.success) throw new Error("Something went wrong " + res?.data["error"]);

      toast.success("Login successful", {
        duration: 3000
      });

      localStorage.setItem("token", res.data.token);
      navigate("/face");
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900 text-white">
      {/* Left Side */}
      <div className="bg-gray-800 text-white flex flex-col justify-center items-center p-8 md:p-16 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-900 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-32 -right-16 w-64 h-64 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 rounded-full blur-2xl"></div>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 z-10">Welcome Back</h1>
        <p className="text-gray-400 mb-6 z-10">Please login to your account to continue.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 z-10">
          Explore Features
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{' '}
            <Link to="/register" className="text-yellow-400 hover:text-yellow-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
