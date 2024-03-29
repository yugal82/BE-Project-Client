import { React, useContext, createContext, useState } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { getNFTMarketplaceContractObject } from '../utils/contract';
import { fetchDataOfItemFromIPFS, getUserInfo } from '../api/nft-marketplace-api';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [userCreatedNfts, setUserCreatedNfts] = useState([]);
  const [userListedNfts, setUserListedNfts] = useState([]);
  const [isUserNFTsFetched, setIsUserNFTsFetched] = useState(false);
  const [marketListedTokens, setMarketListedTokens] = useState([]);
  const [isMarketItemsFetched, setIsMarketItemsFetched] = useState(false);
  const [isUserCampaignsFetched, setIsUserCampaignsFetched] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [isUserDetailsFetched, setIsUserDetailsFetched] = useState(false);
  const [exploreCampaigns, setExploreCampaigns] = useState([]);
  const [isExploreCampaignsFetched, setIsExploreCampaignsFetched] = useState(false);

  const { contract } = useContract('0x27Edf40a51A6726cd7ee742453ce8947EEB7A76d');

  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const date = new Date();

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
      return {
        status: 'success',
        code: 200,
        message: 'Campaign created successfully',
        data: data,
      };
    } catch (error) {
      if (error.reason === 'user rejected transaction') {
        return {
          status: 'failure',
          code: 4001,
          message: 'User rejected transaction',
        };
      } else {
        return {
          status: 'failure',
          code: 400,
          message: 'Something went wrong. Please try again',
        };
      }
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

    const activeCampaigns = getActiveCampaigns(parsedCampaigns);
    setIsExploreCampaignsFetched(true);
    setExploreCampaigns(activeCampaigns);
    return activeCampaigns;
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();

      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
      const activeUserCampaigns = getActiveCampaigns(filteredCampaigns);
      setIsUserCampaignsFetched(true);
      setUserCampaigns(activeUserCampaigns);
    } catch (error) {
      return {
        status: 'failure',
        code: 400,
        message: 'Error while fetching campaigns. Please refresh the page and try again.',
      };
    }
  };

  const getActiveCampaigns = (campaigns) => {
    const activeCampaigns = campaigns.filter((i) => i.deadline > date);
    return activeCampaigns;
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call('donateToCampaign', [pId], {
        value: ethers.utils.parseEther(amount),
      });
      return {
        status: 'success',
        code: 200,
        message: 'Funds donated successfully',
        data,
      };
    } catch (error) {
      if (error.reason === 'user rejected transaction') {
        return {
          status: 'failure',
          code: 4001,
          message: 'User rejected transaction',
        };
      } else {
        return {
          status: 'failure',
          code: 400,
          message: 'Something went wrong. Please try again',
        };
      }
    }
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

  const getUserDetails = async (address) => {
    const res = await getUserInfo(address);
    setIsUserDetailsFetched(true);
    setUserDetails(res?.data?.data);
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
        isUserCampaignsFetched,
        userCampaigns,
        exploreCampaigns,
        isExploreCampaignsFetched,
        setIsExploreCampaignsFetched,
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
        getUserDetails,
        userDetails,
        setIsUserDetailsFetched,
        isUserDetailsFetched,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
