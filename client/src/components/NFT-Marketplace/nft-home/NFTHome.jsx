import React from 'react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import NFTNavbar from './NFTNavbar';
import { useAddress } from '@thirdweb-dev/react';
import NFTHero from './NFTHero';
import Footer from '../../common/Footer/Footer';
import NFTService from './NFTService';
import NFTSlider from './NFTSlider';

const NFTHome = () => {
  const address = useAddress();

  return (
    <div className="w-full">
      {!address && <ConnectWalletPopup />}
      <NFTNavbar />
      <NFTHero />
      <NFTSlider address={address} />
      <NFTService />
      <Footer />
    </div>
  );
};

export default NFTHome;
