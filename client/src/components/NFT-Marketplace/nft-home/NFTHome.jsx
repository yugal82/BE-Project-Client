import React from 'react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import NFTNavbar from './NFTNavbar';
import { useAddress } from '@thirdweb-dev/react';
import NFTHero from './NFTHero';
import Footer from '../../common/Footer/Footer';

const NFTHome = () => {
  const address = useAddress();

  return (
    <div className="w-full">
      {!address && <ConnectWalletPopup />}
      <NFTNavbar />
      <NFTHero />
      <Footer />
    </div>
  );
};

export default NFTHome;
