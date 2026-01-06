import React from 'react';
import { Link, Outlet } from 'react-router';
import Lottie from 'lottie-react';

import authImage from '../assets/login/Login Character Animation.json';
import navLogo from '../assets/assetsImage/navLogo-black.svg';

const AuthLayout = () => {
  return (
    <div className=" min-h-screen px-1 py-1 md:px-12 pt-8">
      <Link to="/">
        <img src={navLogo} className="h-12" alt="" />
      </Link>
      <div className="flex flex-col-reverse md:flex-row items-center justify-evenly mt-8 gap-8">
        <div className="flex-1 w-1/2">
          <Outlet />
        </div>
        <div className="flex-1 w-1/2">
          <Lottie animationData={authImage} loop={true} autoplay={true} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
