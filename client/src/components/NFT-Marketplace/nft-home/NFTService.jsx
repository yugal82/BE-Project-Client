import React from 'react';
import NFTServiceCard from './NFTServiceCard';

const nftservices = [
  {
    step: 'Step 1',
    img: './assets/service-1.webp',
    description: 'Connect to wallet, discover, explore, & mint new NFTs.',
  },
  {
    step: 'Step 2',
    img: './assets/service-2.webp',
    description: 'Create your new NFT token and get ready to earn money by flaunting your creativity.',
  },
  {
    step: 'Step 3',
    img: './assets/service-3.webp',
    description: 'List your NFT item for sale on our marketplace and receive bids.',
  },
  {
    step: 'Step 4',
    img: './assets/service-4.webp',
    description: 'Trade NFT tokens and earn money.',
  },
];

const NFTService = () => {
  return (
    <div className="w-full px-12 py-12 sm:py-16 sm:px-24 text-white">
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Easy steps to earn money.</h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-x-6 text-white mt-10">
        {nftservices.map((service) => (
          <NFTServiceCard key={service.step} service={service} />
        ))}
      </div>
    </div>
  );
};

export default NFTService;
