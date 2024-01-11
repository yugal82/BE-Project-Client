import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import { Link } from 'react-router-dom';

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
            <Link
              to={`/token/contractAddress/${number}`}
              className="p-2 border border-gray-700 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 shadow-sm shadow-gray-700"
            >
              <div className="p-2">
                <img
                  className="min-h-60 bg-gray-400 rounded-lg"
                  // here the img only works if we store the img in src folder or provide a https url to the image. Since the data of the NFT will be stored on IPFS, we will be getting an IPFS URI from which we can display the image.
                  // temporarily, I have hardcoded the img.
                  src={
                    'https://images.unsplash.com/photo-1640340434868-6877662a809f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt="nft-image"
                />
              </div>
              <div className="p-2">
                <p className="text-sm">NFT Name</p>
              </div>
              <div className="flex items-center justify-between px-2">
                <span>1.0 ETH</span>
                <button>Buy</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTExplore;
