import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import Footer from '../../common/Footer/Footer';
import NFTNavbar from '../nft-home/NFTNavbar';
import NFTProfileTabs from './NFTProfileTabs';
import { useState } from 'react';

const NFTProfile = () => {
  const address = useAddress();
  const [tabIndex, setTabIndex] = useState(0);

  const getSelectedTabIndex = (tabIndex) => setTabIndex(tabIndex);

  return (
    <div className="relative">
      <NFTNavbar />
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
      <div className="w-full px-8 text-white">
        <NFTProfileTabs categories={['Created', 'Listed']} getSelectedTabIndex={getSelectedTabIndex} />
        <div className="w-full">
          {tabIndex === 0 ? (
            // display created/minted NFTs
            <div className="text-white">Created NFTs</div>
          ) : (
            <div className="text-white">Listed NFTs</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTProfile;
