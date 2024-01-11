import React from 'react';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';

const NFTDetails = () => {
  return (
    <div>
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">NFT Details</div>
      <Footer />
    </div>
  );
};

export default NFTDetails;
