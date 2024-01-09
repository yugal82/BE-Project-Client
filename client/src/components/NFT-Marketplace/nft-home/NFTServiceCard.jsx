import React from 'react';

const NFTServiceCard = ({ service }) => {
  return (
    <div className="flex-col items-center justify-center text-center p-2">
      <div className="flex items-center justify-center">
        <img src={service?.img} alt="" />
      </div>
      <div className="w-24 mx-auto py-1 px-2 bg-white text-gray-900 rounded-xl font-semibold mt-4">{service?.step}</div>
      <div className="text-sm mt-4 text-gray-400">
        <p>{service?.description}</p>
      </div>
    </div>
  );
};

export default NFTServiceCard;
