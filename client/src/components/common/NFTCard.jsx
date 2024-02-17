import React from 'react';
import { Link } from 'react-router-dom';
import { NFTMarketplaceContractAddress } from '../../utils/constants';

const NFTCard = ({ nft }) => {
  return (
    <Link
      to={`/token/${NFTMarketplaceContractAddress}/${nft?.tokenId}`}
      className="p-2 border border-gray-700 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 shadow-sm shadow-gray-700"
    >
      <div className="p-1">
        <img className="w-full min-h-60 bg-gray-400 rounded-lg" src={nft?.media} alt="nft-image" />
      </div>
      <div className="p-2">
        <p className="text-sm">{nft?.name}</p>
      </div>
      <div className="flex items-center justify-between px-2">
        <span>{nft?.price} ETH</span>
        <button>Buy</button>
      </div>
    </Link>
  );
};

export default NFTCard;
