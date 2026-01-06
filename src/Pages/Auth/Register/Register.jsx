import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = data => {
    console.log(data);
    const profilrImage = data.image[0];
    createUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        //store image to hosting api
        const formData = new FormData();
        formData.append('image', profilrImage);
        const imageApiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`;

        axios.post(imageApiURL, formData).then(res => {
          const photoUrl = res.data.data.display_url;

          // create user in database
          const userInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: photoUrl,
          };

          axiosSecure.post('/users', userInfo).then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              console.log('user created in the database');
            }
          });

          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoUrl,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log('user profile updated');
            })
            .catch(error => {
              console.log(error);
            });
        });
        toast.success('User Registered Successfully');
        navigate(location.state || '/');
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="">
      {/* Login Form */}
      <div className="flex items-center justify-center px-10 py-16 bg-white">
        <div className="w-full max-w-sm">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-500 mb-8">Register with Sapiens.io</p>

          <form onSubmit={handleSubmit(handleRegister)}>
            {/* image */}
            <label className="block mb-2 font-medium">Uplode Image</label>
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
              type="file"
              {...register('image', { required: true })}
              accept="image/*"
            />
            {/*name*/}
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              placeholder=" Your Name"
              {...register('name', { required: true })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
            />
            {errors.name?.type === 'required' && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
            {/* Email */}
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Password */}
            <div className="relative mb-4">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-1 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
                placeholder="Password"
              />
              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 bottom-5 cursor-pointer text-black z-40"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password?.type === 'required' && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500 text-sm">
                  Password must be at least 6 characters long
                </p>
              )}
              {errors.password?.type === 'pattern' && (
                <p className="text-red-500 text-sm">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, one number, and one special character
                </p>
              )}
            </div>
            {/* register Button */}
            <button className="btn bg-lime-300 text-black w-full rounded-md border-none hover:bg-lime-400">
              Register
            </button>
          </form>

          {/* login Link */}
          <p className="mt-4 text-sm text-gray-600">
            Already have account?{' '}
            <Link
              to="/auth/login"
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>

          {/* OR divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
