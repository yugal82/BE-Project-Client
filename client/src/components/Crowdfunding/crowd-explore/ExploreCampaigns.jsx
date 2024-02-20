import React from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from '../crowd-components/FundCard';

const ExploreCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/crowdfunding/campaigns-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="h-screen px-10 py-6 md:px-28 md:py-10">
      <h1 className=" text-white font-semibold text-lg ">
        {title} ({campaigns.length})
      </h1>
      <div className="w-full flex flex-wrap mt-5 gap-6 ">
        {isLoading && (
          <div className="w-full flex items-center justify-center">
            <div className="animate-spin flex items-center justify-center w-10 h-10 border-b-2 border-white rounded-full"></div>
          </div>
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className=" font-semibold text-base text-[#818183] ">You have not created any campaigns yet</p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard key={campaign.id} {...campaign} handleClick={() => handleNavigate(campaign)} />
          ))}
      </div>
    </div>
  );
};

export default ExploreCampaigns;
