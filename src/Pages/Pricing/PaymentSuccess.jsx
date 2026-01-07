import React from 'react';
import { Link } from 'react-router';

import successAmination from '../../assets/Success/Success.json';
import Lottie from 'lottie-react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-16">
      <Lottie
        animationData={successAmination}
        loop={true}
        autoplay={true}
        className="w-64 md:w-96 mb-8"
      />

      <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4 text-center">
        Payment Successful!
      </h1>
      <p className="text-gray-700 text-center mb-8 max-w-lg">
        Thank you for your payment. Your subscription/order has been processed
        successfully.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-[#C8E661] text-gray-900 font-semibold rounded-xl hover:bg-[#b7d854] transition text-center"
        >
          Go to Dashboard
        </Link>

        <Link
          to="/"
          className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
