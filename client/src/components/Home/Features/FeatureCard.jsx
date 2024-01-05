import React from 'react';

const FeatureCard = ({ header, description }) => {
  return (
    <div className="sm:min-h-48 bg-white text-gray-900 py-6 px-4 border border-gray-900 rounded-3xl text-center">
      <span className="w-full font-semibold">{header}</span>
      <p className="mt-4">{description}</p>
    </div>
  );
};

export default FeatureCard;
