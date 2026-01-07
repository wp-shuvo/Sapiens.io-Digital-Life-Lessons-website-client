import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Pricing = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mt-10">
        Pricing Plans
      </h1>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-center">
        Choose the plan that works best for you
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6 p-8">
        {/* Free Plan */}
        <div className="card w-80 bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-info">Free</span>
            <h2 className="text-2xl font-bold mt-2">Free Plan</h2>
            <p className="text-sm text-gray-500 mt-1">
              Perfect for getting started
            </p>

            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>✔ Access up to 5 lessons</li>
              <li>✔ Basic templates</li>
              <li>✔ Standard support</li>
              <li className="opacity-50 line-through">Premium lessons</li>
              <li className="opacity-50 line-through">Ad-free experience</li>
              <li className="opacity-50 line-through">Priority listing</li>
            </ul>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="card w-80 bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Popular</span>
            <h2 className="text-2xl font-bold mt-2">Premium Plan</h2>
            <p className="text-sm text-gray-500 mt-1">
              Unlock all features and lifetime access
            </p>
            <span className="text-xl font-semibold mt-2">৳1500 one-time</span>

            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>✔ Unlimited lessons</li>
              <li>✔ Premium lesson creation</li>
              <li>✔ Ad-free experience</li>
              <li>✔ Priority listing</li>
              <li>✔ Exclusive templates</li>
              <li>✔ Priority support</li>
            </ul>

            <div className="mt-6 text-center">
              {user.isPremium ? (
                <span className="badge badge-success text-lg">Premium ⭐</span>
              ) : (
                <button
                  // onClick={handleUpgrade}
                  className="btn btn-primary text-black btn-block"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
