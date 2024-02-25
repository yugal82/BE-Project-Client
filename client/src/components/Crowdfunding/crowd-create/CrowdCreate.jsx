import React from 'react';
import CrowdNavbar from '../crowd-home/CrowdNavbar';
import Footer from '../../common/Footer/Footer';
import CrowdService from '../crowd-home/CrowdService';
import CreateCampaign from './CreateCampaign';

const CrowdCreate = () => {
  return (
    <div className="">
      <CrowdNavbar />
      <CreateCampaign />
      {/* <CrowdService /> */}
      <Footer />
    </div>
  );
};

export default CrowdCreate;
