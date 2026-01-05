import React from 'react';
import { Link, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/404error/404 error page with cat.json';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      {/* Optional Illustration */}
      <div className="max-w-xl">
        <Lottie animationData={errorAnimation} loop={true} autoplay={true} />
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved. Let’s
        get you back on track.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        {/* Browser Back */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
        >
          Go Back
        </button>

        {/* Home */}
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-[#C8E661] text-gray-900 font-semibold hover:bg-[#b7d854] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
