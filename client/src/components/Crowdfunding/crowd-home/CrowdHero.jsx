import React from 'react';

const CrowdHero = () => {
  return (
    <div className="flex text-white flex-col md:flex-row  px-6 py-10 md:mt-6 gap-4 justify-center items-center">
      <div className="flex flex-col md:items-start gap-2 items-center justify-center">
        <p className="text-4xl self-center font-bold">Donate, or raise funds for a cause, trustable and secured.</p>
        <p className="text-gray-300 text-xl">
          Show your support to the builders of next-gen, a platform to inspire the creators.
        </p>
      </div>
      <div>
        <img className="rounded-2xl scale-90" src="./assets/crowd-banner.jpg" alt="" />
      </div>
    </div>
  );
};

export default CrowdHero;
