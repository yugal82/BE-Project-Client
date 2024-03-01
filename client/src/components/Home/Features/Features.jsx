import React from 'react';
import FeatureCard from './FeatureCard';

const features = [
  {
    header: 'NFT Marketplace',
    description: 'Earn money by leveraging your creative side by creating and selling NFTs.',
    imageURL: './assets/nft-marketplace-icon.webp',
  },
  {
    header: 'Crowdfunding Campaigns',
    description: 'Create crowdfunding campaigns and raise money for a good cause.',
    imageURL: './assets/crowdfunding-icon.webp',
  },
  {
    header: 'Secure',
    description: 'Safely trade NFTs and launch secure crowdfunding campaigns with ease.',
    imageURL: './assets/secure-icon.webp',
  },
  {
    header: 'Conversational UI',
    description: 'Never find yourself struggling to navigate again.',
    imageURL: './assets/conversation.webp',
  },
  {
    header: 'Scalable',
    description: 'Enjoy limitless growth with our scalable solution, designed to expand seamlessly.',
    imageURL: './assets/scalable.webp',
  },
  {
    header: 'No Ads',
    description: 'We know you do not like annoying pop-ups, 100% Ads free.',
    imageURL: './assets/noads.webp',
  },
];

const Features = () => {
  return (
    <div className="p-12 sm:py-16 sm:px-24">
      <div className="">
        <h2 className="text-3xl text-center font-semibold text-white">Built for the community.</h2>
        <p className="text-center text-gray-400 mt-2 font-normal">
          We believe in building an eco-system for the builders of next-gen.
        </p>
      </div>
      <div className="w-full content-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 text-white mt-6">
        {features.map((feature, index) => {
          return (
            <FeatureCard
              header={feature.header}
              description={feature.description}
              imageURL={feature.imageURL}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Features;
