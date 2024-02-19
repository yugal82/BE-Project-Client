import React, { useState } from 'react';
import ConnectWalletPopup from '../../components/common/popup/ConnectWalletPopup';
import Footer from '../../components/common/Footer/Footer';
import Navbar from '../../components/Home/Navbar/Navbar';
import ProfileTabs from './ProfileTabs';
import NFTCard from '../../components/common/NFTCard';
import { FiEdit2 } from 'react-icons/fi';
import { Skeleton } from '../common/Skeleton';
import { FaEthereum } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ProfileComponent = ({ address, userCreatedNfts, isLoading, userListedNfts }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const getSelectedTabIndex = (tabIndex) => setTabIndex(tabIndex);

  return (
    <div className="relative">
      <Navbar />
      {!address && <ConnectWalletPopup />}
      <div className="banner-and-small-logo relative -top-28">
        <div className="w-full bg-gray-50 text-gray-700">
          <img
            className="w-full h-72"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="absolute -bottom-4 left-4 sm:left-10 w-40 h-40">
          <img
            className="rounded-[50%] w-full h-full border-2 border-white"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
      <div className="w-full -mt-20 px-8 pb-8 text-white">
        <div className="mb-10">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">Unnamed</span>
              <button className="bg-[#1D4ED8] rounded-full p-2">
                <FiEdit2 />
              </button>
            </div>
            <div className="flex items-center mt-2">
              <FaEthereum />
              {address && (
                <p className="text-gray-500">
                  {address.substr(0, 5).toLowerCase()}...{address.substr(-5).toLowerCase()}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start mt-4">
            <p className="py-1 px-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg">
              Created Tokens: {userCreatedNfts?.length}
            </p>
            <p className="py-1 px-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg mx-2">
              Listed Tokens: {userListedNfts?.length}
            </p>
            <p className="py-1 px-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg">Created Campaigns: 0</p>
          </div>
        </div>
        <ProfileTabs
          categories={['Created Tokens', 'Listed Tokens', 'Created Campaigns']}
          getSelectedTabIndex={getSelectedTabIndex}
        />
        <div className="w-full mt-8 sm:mt-0">
          {tabIndex === 0 ? (
            // here the selected tab is 'Created Tokens'
            <div>
              {isLoading === true ? (
                <div className="grid grid-cols-1 gap-y-6 sm:gap-y-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-4">
                  {Skeleton(4)}
                </div>
              ) : (
                <div>
                  {userCreatedNfts.length === 0 ? (
                    <div className="w-full border-2 border-dashed border-gray-500 p-6 sm:p-12">
                      <p className="text-base sm:text-xl">You have not created any tokens yet.</p>
                      <Link to="/nft-marketplace/create" className="block mt-4 text-blue-700 underline">
                        Click here to mint your first token!
                      </Link>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
                      {userCreatedNfts?.map((nft) => (
                        <NFTCard key={nft?.tokenId} nft={nft} address={address} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : tabIndex === 1 ? (
            // here the selected tab is 'Listed Tokens'
            <div>
              {isLoading === true ? (
                <div className="grid grid-cols-1 gap-y-6 sm:gap-y-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-4">
                  {Skeleton(4)}
                </div>
              ) : (
                <div>
                  {userListedNfts?.length === 0 ? (
                    <div className="w-full border-2 border-dashed border-gray-500 p-6 sm:p-12">
                      <p className="text-base sm:text-xl">You have not listed any tokens yet.</p>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
                      {userListedNfts?.map((nft) => (
                        <NFTCard key={nft?.tokenId} nft={nft} address={address} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>Crowdfunding Campaigns</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileComponent;
