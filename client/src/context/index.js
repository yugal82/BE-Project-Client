import { React, useContext, createContext, useMemo, useState } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useMetadata } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { getNFTMarketplaceContractObject } from '../utils/contract';
import { fetchDataOfItemFromIPFS } from '../api/nft-marketplace-api';

// const address = useAddress();
// const connect = useMetamask();

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [userCreatedNfts, setUserCreatedNfts] = useState([]);
  const [userListedNfts, setUserListedNfts] = useState([]);
  const [isUserNFTsFetched, setIsUserNFTsFetched] = useState(false);
  const [marketListedTokens, setMarketListedTokens] = useState([]);
  const [isMarketItemsFetched, setIsMarketItemsFetched] = useState(false);

  const { contract } = useContract('0x27Edf40a51A6726cd7ee742453ce8947EEB7A76d');

  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await contract.call('createCampaign', [
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log('contract call success', data);
    } catch (error) {
      console.log('contract call fail', error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);

    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  const getUserNfts = async () => {
    try {
      const marketplaceContract = getNFTMarketplaceContractObject(address);
      const userNfts = await marketplaceContract.fetchUserNFTs();
      const mintedNfts = await Promise.all(
        userNfts.map(async (nft) => {
          const metadata = await fetchDataOfItemFromIPFS(nft);
          return metadata;
        })
      );
      setUserCreatedNfts(mintedNfts);
      setIsUserNFTsFetched(true);
    } catch (error) {
      return {
        status: 'failure',
        message: error.message,
        code: 400,
      };
    }
  };

  const getUserListedNfts = async () => {
    try {
      const marketplaceContract = getNFTMarketplaceContractObject(address);
      const listedTokens = await marketplaceContract.fetchListedItemsofUser();
      const tokens = await Promise.all(
        listedTokens.map(async (nft) => {
          const metadata = await fetchDataOfItemFromIPFS(nft);
          return metadata;
        })
      );
      const listedNfts = tokens.filter((nft) => nft?.isListed === true);
      setUserListedNfts(listedNfts);
    } catch (error) {
      return {
        status: 'failure',
        message: error.message,
        code: 400,
      };
    }
  };

  const getListedNftsOfMarketplace = async () => {
    try {
      const marketplaceContract = getNFTMarketplaceContractObject(address);
      const marketplaceListedNfts = await marketplaceContract?.fetchListedMarketItems();
      const marketItems = await Promise.all(
        marketplaceListedNfts.map(async (nft) => {
          const metadata = await fetchDataOfItemFromIPFS(nft);
          return metadata;
        })
      );
      setMarketListedTokens(marketItems);
      setIsMarketItemsFetched(true);
    } catch (error) {
      return {
        status: 'failure',
        message: error.message,
        code: 400,
      };
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getUserNfts,
        userCreatedNfts,
        isUserNFTsFetched,
        setIsUserNFTsFetched,
        getUserListedNfts,
        userListedNfts,
        getListedNftsOfMarketplace,
        marketListedTokens,
        isMarketItemsFetched,
        setIsMarketItemsFetched,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
