import React from 'react';

const CrowdHero = () => {
  return (
    <div className=" w-full flex text-white flex-col md:flex-row justify-center items-center px-4 py-12 sm:py-16 md:px-24 md:mt-6 gap-4">
      <div className="flex flex-col md:items-start gap-2 items-center justify-center">
        <div className="w-full px-12">
          <p className="text-4xl sm:text-5xl font-bold">Donate, or raise funds for a cause, trustable and secured.</p>
          <p className="mt-2 text-gray-200 text-lg text-left">
            Show your support to the builders of next-gen, a platform to inspire the creators.
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <img className="rounded-3xl" src="./assets/crowd-banner.jpg" alt="" />
      </div>
    </div>
  );
};

export default CrowdHero;
