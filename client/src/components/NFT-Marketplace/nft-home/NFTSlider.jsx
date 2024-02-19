import React from 'react';
import Slider from './Slider';
import { Link } from 'react-router-dom';

const NFTSlider = ({ address }) => {
  return (
    <div className="w-full px-12 py-12 sm:py-16 sm:px-24 text-white">
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Featured NFTs</h2>
      </div>
      <div className="mt-10">
        <Slider address={address} />
      </div>
      <div className="mt-8 w-full flex items-center justify-center">
        <Link
          to="/nft-marketplace/explore"
          className="text-white bg-[#1d4ed8] py-2 px-6 rounded-lg font-semibold hover:scale-110 transition-all ease-in-out duration-200"
        >
          Explore all NFTs
        </Link>
      </div>
    </div>
  );
};

export default NFTSlider;
