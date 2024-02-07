import React from 'react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import { useAddress } from '@thirdweb-dev/react';
import Footer from '../../common/Footer/Footer';
import CrowdNavbar from './CrowdNavbar';
import CrowdHero from './CrowdHero';
import CrowdService from './CrowdService';

const CrowdHome = () => {
  const address = useAddress();

  return (
    <div className="w-full">
      {!address && <ConnectWalletPopup />}
      <CrowdNavbar />
      <CrowdHero />
      <CrowdService />
      <Footer />
    </div>
  );
};

export default CrowdHome;
