import React, { useEffect } from 'react';
import Slider from './Slider';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../../context';

const NFTSlider = ({ address }) => {
  const { getListedNftsOfMarketplace, marketListedTokens, setIsMarketItemsFetched } = useStateContext();

  const fetchMarketItemsForSlider = async () => {
    await getListedNftsOfMarketplace();
    setIsMarketItemsFetched(true);
  };

  useEffect(() => {
    if (address) fetchMarketItemsForSlider();
  }, []);

  return (
    <div className="w-full px-12 py-12 sm:py-16 sm:px-24 text-white">
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Featured NFTs</h2>
      </div>
      <div className="mt-10">
        {!marketListedTokens ? (
          <div className="w-full flex items-center justify-center p-10">
            <div className="w-20 h-20 animate-spin border-b-2 border-white rounded-full"></div>
          </div>
        ) : (
          <Slider address={address} marketListedTokens={marketListedTokens} />
        )}
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
