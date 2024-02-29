import { React, useState, useEffect } from 'react';
import CrowdNavbar from '../crowd-home/CrowdNavbar';
import Footer from '../../common/Footer/Footer';
import ExploreCampaigns from './ExploreCampaigns';

import { useStateContext } from '../../../context';

const CrowdExplore = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { address, contract, getCampaigns, isExploreCampaignsFetched, exploreCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    await getCampaigns();
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && !isExploreCampaignsFetched) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <CrowdNavbar />
      <ExploreCampaigns title="All Campaigns" isLoading={isLoading} campaigns={exploreCampaigns} />
      <Footer />
    </div>
  );
};

export default CrowdExplore;
