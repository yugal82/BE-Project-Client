import React from 'react';

const CrowdServiceCard = ({ service }) => {
  return (
    <div className="flex-col items-center justify-center text-center p-2 mb-4">
      <div className="flex items-center justify-center">
        <img className="w-16 h-16" src={service?.img} alt="" />
      </div>
      <div className="w-24 mx-auto py-1 px-2 bg-white text-gray-900 rounded-xl font-semibold mt-4">{service?.step}</div>
      <div className="text-md mt-4 text-gray-400">
        <p>{service?.description}</p>
      </div>
    </div>
  );
};

export default CrowdServiceCard;
