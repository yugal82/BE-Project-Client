import React from 'react';
import { daysLeft } from '../../../utils';

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <img src={image} alt="fund" className="w-full h-[170px] object-cover rounded-[15px]" />
      <div className="flex flex-col p-4 ">
        <div className="block">
          <h3 className=" font-semibold text-[16px] text-left leading-[26px] truncate text-white ">{title}</h3>
          <p className="mt-[5px]  font-normal text-[#808191] text-left leading-[18px] truncate ">{description}</p>
        </div>
        <div>
          <div className="flex gap-2 justify-between mt-[15px] flex-wrap">
            <div className="flex flex-col ">
              <h4 className=" text-[#b2b3bd] leading-[22px] font-semibold text-[14px]">{amountCollected}</h4>
              <p className="mt-[3px]  font-normal text-[12px] text-[#808091] leading-[18px] sm:max-w-[120px] truncate  ">
                Raised of {target}
              </p>
            </div>
            <div className="flex flex-col ">
              <h4 className=" text-[#b2b3bd] leading-[22px] font-semibold text-[14px]">{remainingDays}</h4>
              <p className="mt-[3px]  font-normal text-[12px] text-[#808091] leading-[18px] sm:max-w-[120px] truncate  ">
                Day(s) left
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <p className="flex-1  font-normal text-[12px] text-[#808191] truncate">
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
