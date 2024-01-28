import React from 'react';

const FeatureCard = ({ header, description, imageURL }) => {
  return (
    <div className="  bg-white flex flex-col justify-center scale-90 items-center p-4 text-gray-900 border border-gray-900 hover:scale-95 transition-all ease-in-out duration-200 rounded-2xl text-center">
      <img src={imageURL} className="w-16 h-16" alt="" />
      <div className="mt-4">
        <span className="w-full text-lg font-semibold">{header}</span>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
