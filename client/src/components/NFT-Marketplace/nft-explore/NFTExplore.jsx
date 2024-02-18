import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import NFTCard from '../../common/NFTCard';
import { useStateContext } from '../../../context';
import { Skeleton } from '../../common/Skeleton';

const NFTExplore = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);

  const { getListedNftsOfMarketplace, marketListedTokens, isMarketItemsFetched } = useStateContext();

  const fetchMarketItems = async () => {
    setIsLoading(true);
    await getListedNftsOfMarketplace();
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isMarketItemsFetched) fetchMarketItems();
  }, []);

  return (
    <div>
      {!address && <ConnectWalletPopup />}
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">
        <div className="">
          <h2 className="text-3xl font-semibold">Explore NFTs</h2>
        </div>
        <div>
          {isLoading ? (
            <div className="mt-10 grid grid-cols-1 gap-y-6 sm:gap-y-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-4">
              {Skeleton(4)}
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {marketListedTokens?.map((nft) => (
                <NFTCard key={nft?.tokenId} nft={nft} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTExplore;
