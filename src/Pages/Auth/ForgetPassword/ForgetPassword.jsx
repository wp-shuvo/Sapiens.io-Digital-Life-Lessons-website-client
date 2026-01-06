import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router';

const ForgetPassword = () => {
  const { forgetPassword } = useAuth();

  const handleForgetPass = e => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email) {
      toast.error('Please provide an email address.');
      return;
    }

    forgetPassword(email)
      .then(res => {
        console.log('Password reset email sent successfully:', res);
        toast.success('Password reset email sent! Please check your inbox.');
        e.target.reset();
      })
      .catch(error => {
        console.error('Error sending password reset email:', error.message);
        toast.error('Failed to send password reset email. Please try again.');
      });
  };

  return (
    <div className="">
      {/* Login Form */}
      <div className="flex items-center justify-center px-10 py-16 bg-white">
        <div className="w-full max-w-sm">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-500 mb-8"> Sapiens.io</p>

          <form onSubmit={handleForgetPass}>
            {/* Email */}
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#C8E661]"
            />
            {/* Reset Password button */}
            <div>
              <button className="btn w-full bg-lime-300 text-black rounded-md border-none hover:bg-lime-400">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
