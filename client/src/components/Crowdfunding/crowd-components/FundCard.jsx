import React from 'react';
import { daysLeft } from '../../../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  return (
    <div
      className="sm:w-72 w-full rounded-2xl cursor-pointer overflow-hidden border border-gray-700 hover:scale-105 transition-all ease-in-out duration-300 shadow-sm shadow-gray-700"
      onClick={handleClick}
    >
      <img src={image} alt="fund" className="w-full h-44 object-cover rounded-2xl" />
      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className=" font-semibold text-base text-left truncate text-white">{title}</h3>
          <p className="mt-1 font-normal text-gray-500 text-left truncate">{description}</p>
        </div>
        <div>
          <div className="flex gap-2 justify-between mt-4 flex-wrap">
            <div className="flex flex-col ">
              <h4 className=" text-gray-400 font-semibold text-base">{amountCollected}</h4>
              <p className="mt-1 font-normal text-sm text-[#808091] sm:max-w-32">Raised of {target}</p>
            </div>
            <div className="flex flex-col">
              <h4 className=" text-gray-400 font-semibold text-base">{remainingDays}</h4>
              <p className="mt-1 font-normal text-sm text-gray-400 sm:max-w-30">Day(s) left</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-5 gap-3">
          <p className="flex-1 font-normal text-sm text-[#808191]">
            by{' '}
            <span className="text-[#b2b2bd] ">
              {owner?.substr(0, 5)}...{owner?.substr(-5)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
