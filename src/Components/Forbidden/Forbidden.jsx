import Lottie from 'lottie-react';
import { Link } from 'react-router';
import forbiddenAnimation from '../../assets/Forbidden/forbidden.json';

const Forbidden = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-white px-4 text-center">
      <Lottie
        animationData={forbiddenAnimation}
        loop
        autoplay
        className="w-56 md:w-80 mb-4"
      />

      <h1 className="text-2xl md:text-3xl font-bold text-red-500">
        You Are Forbidden to Access This Page
      </h1>

      <p className="text-base md:text-lg text-gray-600 mt-2 max-w-md">
        Please contact the administrator if you believe this is an error.
      </p>

      <div className="mt-4 flex gap-3">
        <Link to="/" className="btn btn-primary text-black">
          Go to Home
        </Link>
        <Link to="/dashboard" className="btn btn-secondary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
