import React from 'react';

const FeatureCard = ({ header, description, imageURL }) => {
  return (
    <div className="  bg-white flex flex-col justify-center scale-90 items-center  text-gray-900 py-8 px-12 border border-gray-900 hover:scale-95 duration-100 rounded-2xl text-center">
      <img src={imageURL} className="scale-50" alt="" />
      <span className="w-full font-semibold">{header}</span>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default FeatureCard;
