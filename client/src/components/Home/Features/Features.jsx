import React from 'react';
import FeatureCard from './FeatureCard';
import { ConversationIMG, Scalable, NoAds } from '../../../imageAssets/index';

const features = [
  {
    header: 'Conversational UI',
    description: 'Never find yourself struggling to navigate again.',
    imageURL: ConversationIMG,
  },
  {
    header: 'Scalable',
    description: 'Good development practices are at the heart of our operation.',
    imageURL: Scalable,
  },
  {
    header: 'No Ads',
    description: 'We know you do not like annoying pop-ups, 100% Ads free.',
    imageURL: NoAds,
  },
  {
    header: 'Conversational UI',
    description: 'Never find yourself struggling to navigate again.',
    imageURL: ConversationIMG,
  },
  {
    header: 'Conversational UI',
    description: 'Never find yourself struggling to navigate again.',
    imageURL: ConversationIMG,
  },
  {
    header: 'Conversational UI',
    description: 'Never find yourself struggling to navigate again.',
    imageURL: ConversationIMG,
  },
];

const Features = () => {
  return (
    <div className="p-12 sm:py-16 sm:px-24">
      <div className="pb-6">
        <h2 className="text-3xl text-center font-medium text-white">Built for the community.</h2>
        <p className="text-center text-gray-400 mt-2 font-normal">
          We believe in building an eco-system for the builders of next-gen.
        </p>
      </div>
      <div className="w-full content-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-x-6 text-white mt-6">
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
