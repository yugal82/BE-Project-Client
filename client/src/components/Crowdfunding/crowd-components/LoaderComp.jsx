import React from 'react';
import { Loader } from '../crowd-assets';

const LoaderComp = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex-col items-center justify-center">
      <img src={Loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
      <p className="mt-[20px] text-white font-epilogue font-bold text-[20px] text-center">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default LoaderComp;
