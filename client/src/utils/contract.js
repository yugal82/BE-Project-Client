// in this file, we will write all the general functions such as getContractObject, etc. for both NFT Marketplace and Crwodfunding

import { ethers } from 'ethers';
import NFTMarketplaceABI from '../ABI/nft-marketplace-abi';
import { NFTMarketplaceContractAddress } from './constants';

export const getNFTMarketplaceContractObject = () => {
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const contractObj = new ethers.Contract(NFTMarketplaceContractAddress, NFTMarketplaceABI, provider);
  return contractObj;
};
