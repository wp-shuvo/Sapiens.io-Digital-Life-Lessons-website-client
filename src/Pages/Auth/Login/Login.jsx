import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { singInuser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = data => {
    singInuser(data.email, data.password)
      .then(result => {
        toast.success('User Logged In Successfully');
        navigate(location.state?.from || '/');
        reset();
        console.log(result.user);
      })
      .catch(error => {
        toast.error(error.message || 'Login failed');
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-2 md:p-8 ">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-8">Login to Sapiens.io</p>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="block mb-2 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {/* Forgot Password */}
          <div className="mt-3 mb-5">
            <Link
              to="/auth/forget-password"
              className="text-sm text-gray-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-lime-300 text-black py-3 rounded-xl font-semibold hover:bg-lime-400 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
