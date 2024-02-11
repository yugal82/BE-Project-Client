import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import NFTCard from '../../common/NFTCard';

const nftCards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const NFTExplore = () => {
  const address = useAddress();
  return (
    <div>
      {!address && <ConnectWalletPopup />}
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">
        <div className="">
          <h2 className="text-3xl font-semibold">Explore NFTs</h2>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {/* display all nft cards here! */}
          {nftCards?.map((number) => (
            <NFTCard key={number} number={number} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTExplore;
