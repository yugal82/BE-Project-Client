import React from 'react';
import { Loader } from '../crowd-assets';

const LoaderComp = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex-col items-center justify-center">
      {/* dont use extra assests to show spinner. I have already used tailwind css animate-spin class to show loader animation. It is already implemented in the <LoadingAnimation /> componenent. */}
      <img src={Loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
      <p className="mt-[20px] text-white font-epilogue font-bold text-[20px] text-center">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default LoaderComp;

// Dont use this component for loader.
// Use the <LoadingAnimation /> component from common folder to show loading component
