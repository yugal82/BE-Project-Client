import React from 'react';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import NFTPropertiesDisclosure from './NFTPropertiesDisclosure';
import NFTDetailsDisclosure from './NFTDetailsDisclosure';
import { IoShareOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
import { NFTMarketplaceContractAddress } from '../../../utils/constants';

const NFTDetails = () => {
  const address = useAddress();
  const location = useLocation();
  const nft = location?.state?.nft;

  const owner = nft?.owner;
  const seller = nft?.seller;
  const isListed = nft?.isListed;

  return (
    <div>
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">
        <div className="w-full sm:px-10 md:px-16 md:flex">
          <div className="md:w-8/12 rounded-lg">
            <img className="rounded-lg border-2 border-gray-800 min-h-[30rem]" src={nft?.media} alt="" />
          </div>
          <div className="w-full p-4">
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">DeKrypt Default Collection</p>
                <span className="text-gray-500 text-sm block">
                  {NFTMarketplaceContractAddress.substr(0, 5)}...{NFTMarketplaceContractAddress.substr(-5)}
                </span>
              </div>
              <button className="flex items-center justify-center p-2 bg-gray-800 rounded-lg cursor-pointer">
                <IoShareOutline className="w-6 h-6" />
                <span className="ml-1">Share</span>
              </button>
            </div>
            <div className="mt-4 border-b-2 border-gray-800">
              <h2 className="py-2 text-3xl font-bold">
                {nft?.name} #{nft?.tokenId}
              </h2>
              <p className="text-medium text-gray-500">
                Owned by:{' '}
                <a
                  href={`https://sepolia.etherscan.io/address/${nft?.owner}`}
                  target="_blank"
                  className="text-[#1d4ed8] cursor-pointer"
                >
                  {nft?.owner.substr(0, 5)}....{nft?.owner.substr(-5)}
                </a>
              </p>
              <p className="py-2">Description - {nft?.description}</p>
            </div>
            <div className="py-8 px-4 flex-row md:flex items-center justify-between border-b-2 border-gray-800">
              <div className="w-full">
                <span className="text-medium text-gray-400">Price</span>
                <p className="text-3xl font-semibold">{nft?.price} ETH</p>
              </div>
              <div className="w-full">
                {address === owner ? (
                  <div>
                    {isListed === false ? (
                      <button className="w-full mt-4 md:mt-0 py-3 px-4 md:px-20 bg-[#1d4ed8] font-semibold text-lg rounded-lg">
                        List Now
                      </button>
                    ) : (
                      <div className="py-3 lg:px-4 font-semibold text-lg">
                        You have already listed this NFT.{' '}
                        <Link to="/nft-marketplace/explore" className="text-[#1d4ed8] text-base underline">
                          Checkout explore page to see your listed tokens
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="w-full mt-4 md:mt-0 py-3 px-4 md:px-20 bg-[#1d4ed8] font-semibold text-lg rounded-lg">
                    Buy Now
                  </button>
                )}
              </div>
            </div>
            <div className="py-4">
              <NFTPropertiesDisclosure metadata={nft?.attributes} />
            </div>
            <div className="">
              <NFTDetailsDisclosure
                tokenId={nft?.tokenId}
                NFTMarketplaceContractAddress={NFTMarketplaceContractAddress}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTDetails;
