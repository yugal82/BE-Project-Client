import React from 'react';
import CrowdServiceCard from './CrowdServiceCard';

const crowdservices = [
  {
    step: 'Step 1',
    img: './assets/metamask.png',
    description: 'Connect to wallet, explore and create new campaigns.',
  },
  {
    step: 'Step 2',
    img: './assets/campaign.svg',
    description: 'Create your own campaign and setup funding to your cause.',
  },
  {
    step: 'Step 3',
    img: './assets/funding.png',
    description: 'List your campaign on our platform and receive funding for the same.',
  },
];

const CrowdService = () => {
  return (
    <div className="w-full px-12 py-12 sm:py-16 sm:px-24 text-white">
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Easy steps to start a campaign.</h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-x-6 text-white mt-14">
        {crowdservices.map((service) => (
          <CrowdServiceCard key={service.step} service={service} />
        ))}
      </div>
    </div>
  );
};

export default CrowdService;
