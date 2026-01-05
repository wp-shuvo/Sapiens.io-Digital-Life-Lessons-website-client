import Lottie from 'lottie-react';
import React from 'react';
import loadingAnimation from '../../assets/loading/Liquid 4 Dot Loader.json';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <div className="max-w-sm relative">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default Loading;
