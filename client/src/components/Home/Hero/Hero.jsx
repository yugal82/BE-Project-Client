import React from 'react';

const Hero = () => {
  return (
    <div className="w-full py-12 sm:py-16 sm:px-24 text-white">
      <div className="w-full flex-row items-center justify-center lg:flex lg:items-center lg:justify-around">
        <div className="w-full px-12">
          <p className="text-4xl pb-2 sm:text-6xl font-semibold">
            <span className="line-through font-medium mr-2">Feature</span>Platform.
          </p>
          <p className="text-lg text-center text-gray-300 md:text-left">
            Evolving the eco-system of crypto, beyond features and services. Create, buy, and sell NFTs & create
            Crowdfunding campaigns all on one platform.
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <img src="./assets/Hero-Banner.webp" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
