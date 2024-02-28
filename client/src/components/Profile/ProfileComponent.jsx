import React, { useState } from 'react';
import ConnectWalletPopup from '../../components/common/popup/ConnectWalletPopup';
import Footer from '../../components/common/Footer/Footer';
import Navbar from '../../components/Home/Navbar/Navbar';
import ProfileTabs from './ProfileTabs';
import NFTCard from '../../components/common/NFTCard';
import { FiEdit2 } from 'react-icons/fi';
import { Skeleton } from '../common/Skeleton';
import { FaEthereum } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import FundCard from '../Crowdfunding/crowd-components/FundCard';
import EditPopup from '../common/popup/EditPopup';
import LoadingAnimation from '../common/LoadingAnimation';

const ProfileComponent = ({
  address,
  userCreatedNfts,
  isLoading,
  userListedNfts,
  userCampaigns,
  userDetails,
  setSuccess,
  isUserDataFetchLoading,
}) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const getSelectedTabIndex = (tabIndex) => setTabIndex(tabIndex);

  const handleNavigate = (campaign) =>
    navigate(`/crowdfunding/campaigns-details/${campaign.title}`, { state: campaign });

  return (
    <div className="relative">
      <Navbar />
      {!address && <ConnectWalletPopup address={address} />}
      {isEditPopupOpen && (
        <EditPopup
          setIsEditPopupOpen={setIsEditPopupOpen}
          address={address}
          setIsUpdateLoading={setIsUpdateLoading}
          setSuccess={setSuccess}
        />
      )}
      {isUpdateLoading && <LoadingAnimation message={'Please wait while we update your details.'} />}
      <div className="banner-and-small-logo relative -top-28">
        <div className="w-full bg-gray-600 border-none cursor-pointer backdrop-filter blur-sm">
          <img
            className={`w-full h-72 ${
              isUserDataFetchLoading ? 'animate-pulse bg-gray-300' : 'hover:bg-black hover:opacity-50'
            } `}
            src={userDetails?.bannerImage}
          />
        </div>
        <div className="absolute -bottom-4 left-4 sm:left-10 w-40 h-40 bg-gray-600 rounded-[50%]">
          <img
            className={`rounded-[50%] w-full h-full ${
              isUserDataFetchLoading ? 'animate-pulse bg-gray-300' : 'hover:bg-black hover:opacity-50'
            }`}
            src={userDetails?.profileImage}
          />
        </div>
      </div>
      <div className="w-full -mt-20 px-8 pb-8 text-white">
        <div className="mb-10">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">{userDetails?.name || 'Unnamed'}</span>
              <button onClick={() => setIsEditPopupOpen(true)} className="bg-[#1D4ED8] rounded-full p-2">
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
            <div className="mt-2">
              <span className="text-base text-gray-500 font-medium">{userDetails?.bio || ''}</span>
            </div>
          </div>
          <div className="flex items-center justify-start mt-4">
            <p className="py-1 px-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg">
              Created Tokens: {userCreatedNfts?.length}
            </p>
            <p className="py-1 px-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg mx-2">
              Listed Tokens: {userListedNfts?.length}
            </p>
            <p className="py-1 px-2 bg-gray-600 text-white text-xs sm:text-sm rounded-lg">
              Created Campaigns: {userCampaigns?.length}
            </p>
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
            <div>
              {isLoading === true ? (
                <div className="grid grid-cols-1 gap-y-6 sm:gap-y-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-4">
                  {Skeleton(4)}
                </div>
              ) : (
                <div>
                  {userCampaigns?.length === 0 ? (
                    <div className="w-full border-2 border-dashed border-gray-500 p-6 sm:p-12">
                      <p className="text-base sm:text-xl">You have not created any campaigns yet.</p>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
                      {userCampaigns?.map((campaign) => (
                        <FundCard key={campaign.id} {...campaign} handleClick={() => handleNavigate(campaign)} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileComponent;
