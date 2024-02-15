import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletPopup from '../../components/common/popup/ConnectWalletPopup';
import Footer from '../../components/common/Footer/Footer';
import Navbar from '../../components/Home/Navbar/Navbar';
import ProfileTabs from './ProfileTabs';
import NFTCard from '../../components/common/NFTCard';
import { useStateContext } from '../../context';
import { FaEthereum } from 'react-icons/fa6';
import { FiEdit2 } from 'react-icons/fi';

const Profile = () => {
  const address = useAddress();
  const [tabIndex, setTabIndex] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { getUserNfts, userCreatedNfts } = useStateContext();

  const fetchUserNfts = async () => {
    setIsLoading(true);
    await getUserNfts();
    setIsDataFetched(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserNfts();
  }, [isDataFetched]);

  const getSelectedTabIndex = (tabIndex) => setTabIndex(tabIndex);

  return (
    <div className="relative">
      <Navbar />
      {!address && <ConnectWalletPopup />}
      <div className="banner-and-small-logo relative -top-28">
        {/* banner logo */}
        <div className="w-full bg-gray-50 text-gray-700">
          <img
            className="w-full h-72"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        {/* small logo */}
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
            <p className="py-1 px-2 bg-gray-600 text-white text-sm rounded-lg">Created NFTs: 8</p>
            <p className="py-1 px-2 bg-gray-600 text-white text-sm rounded-lg mx-2">Listed NFTs: 0</p>
            <p className="py-1 px-2 bg-gray-600 text-white text-sm rounded-lg">Created Campaigns: 0</p>
          </div>
        </div>
        <ProfileTabs
          categories={['Created Tokens', 'Listed Tokens', 'Created Campaigns']}
          getSelectedTabIndex={getSelectedTabIndex}
        />
        <div className="w-full">
          {tabIndex === 0 ? (
            // display created/minted NFTs
            <div className="">
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
                {userCreatedNfts?.map((nft) => (
                  <NFTCard key={nft?.tokenId} nft={nft} />
                ))}
              </div>
            </div>
          ) : tabIndex === 1 ? (
            <div className="">
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
                {[1, 2].map((number) => (
                  <NFTCard key={number} number={number} />
                ))}
              </div>
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

export default Profile;
