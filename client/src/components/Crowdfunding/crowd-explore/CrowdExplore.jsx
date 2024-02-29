import { React, useState, useEffect } from 'react';
import CrowdNavbar from '../crowd-home/CrowdNavbar';
import Footer from '../../common/Footer/Footer';
import ExploreCampaigns from './ExploreCampaigns';

import { useStateContext } from '../../../context';

const CrowdExplore = () => {
  const date = new Date();

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    const filteredCampaigns = data.filter((i) => i.deadline > date);
    setCampaigns(filteredCampaigns);
    setIsLoading(false);

    // console.log(filteredArray);
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
