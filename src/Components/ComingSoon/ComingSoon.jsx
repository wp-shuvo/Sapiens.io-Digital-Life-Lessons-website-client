import Lottie from 'lottie-react';
import React from 'react';
import comingSoonAnimation from '../../assets/comingSoon/COMING SOON.json';

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <div className="max-w-sm relative">
        <Lottie
          animationData={comingSoonAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default ComingSoon;
