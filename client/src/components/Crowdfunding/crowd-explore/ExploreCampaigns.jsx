import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../crowd-assets';

const ExploreCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaigns-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="px-10 py-6 md:px-[120px] md:py-10">
      <h1 className=" text-white font-semibold text-[18px] ">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px] ">
        {isLoading && <img src={Loader} alt="loader" className="w-[100px] h-[100px] object-contain" />}
        {!isLoading && campaigns.length === 0 && (
          <p className=" font-semibold text-[14px] leading-[30px] text-[#818183] ">
            You have not created any campaigns yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ExploreCampaigns;
