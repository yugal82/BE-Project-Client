import { React, useState, useEffect } from 'react';
import CrowdNavbar from '../crowd-home/CrowdNavbar';
import Footer from '../../common/Footer/Footer';
import ExploreCampaigns from './ExploreCampaigns';

import { useStateContext } from '../../../context';

const CrowdExplore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getActiveCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getActiveCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <CrowdNavbar />
      <ExploreCampaigns title="All Campaigns" isLoading={isLoading} campaigns={campaigns} />
      <Footer />
    </div>
  );
};

export default CrowdExplore;
