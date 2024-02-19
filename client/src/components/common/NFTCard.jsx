import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTMarketplaceContractAddress } from '../../utils/constants';

const NFTCard = ({ nft, address }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/token/${NFTMarketplaceContractAddress}/${nft?.tokenId}`, { state: { nft } });
  };

  const owner = nft?.owner;
  const seller = nft?.seller;
  const isListed = nft?.isListed;

  return (
    <div
      onClick={navigateTo}
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
        {address === owner && isListed === false ? (
          <button onClick={navigateTo}>Sell</button>
        ) : (
          <button onClick={navigateTo}>{address === seller && isListed === true ? '' : 'Buy'}</button>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
