// here all the functions related to functionality such as posting data to IPFS, minting NFTs, listing NFTs for sale, buying NFTs, etc will be defined and exported here.

import axios from 'axios';
import { getNFTMarketplaceContractObject } from '../utils/contract';
import { walletConnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
const pinata_jwt = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

const BACKEND_BASE_URL = 'http://localhost:8080/';

export const uploadImgToIPFS = async (image) => {
  const pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const data = new FormData();
  data.append('file', image);

  try {
    const res = await axios.post(pinataUrl, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        Authorization: pinata_jwt,
      },
    });
    return {
      status: 'success',
      code: 200,
      message: 'Image uploaded successfully on IPFS',
      imageIPFS: res.data,
    };
  } catch (error) {
    return {
      status: 'failure',
      message: 'Error while uploading image to IPFS.',
      code: 403,
    };
  }
};

export const uploadJsonMetadataToIPFS = async (itemNameRef, externalLinkRef, descriptionRef, properties, imageIPFS) => {
  const nftMetadataJson = {
    itemName: itemNameRef.current.value,
    externalLink: externalLinkRef.current.value,
    description: descriptionRef.current.value,
    attributes: properties,
    image: `https://ipfs.io/ipfs/${imageIPFS?.IpfsHash}`,
  };

  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const metadata = JSON.stringify(nftMetadataJson);

  try {
    const response = await axios.post(url, metadata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: pinata_jwt,
      },
    });
    return {
      status: 'success',
      message: 'Metadata uploaded successfully',
      code: 200,
      uri: response.data,
    };
  } catch (error) {
    return {
      status: 'failure',
      message: 'Error while uploading image to IPFS.',
      code: 403,
    };
  }
};

export const createToken = async (uri, price, walletAddress) => {
  let tokenURI = `https://ipfs.io/ipfs/${uri?.IpfsHash}`;
  try {
    const contract = getNFTMarketplaceContractObject(walletAddress);
    const mintedToken = await contract.mintNFT(price, tokenURI);
    await mintedToken.wait();
    return {
      mintedToken,
      status: 'success',
      message: 'Token created successfully',
      code: 200,
    };
  } catch (error) {
    if (error.code === 'ACTION_REJECTED') {
      return { status: 'failure', message: 'User denied transaction', code: 4001 };
    } else {
      return { status: 'failure', message: 'Something went wrong', code: 400 };
    }
  }
};

export const listToken = async (tokenId, price, walletAddress) => {
  try {
    const contract = getNFTMarketplaceContractObject(walletAddress);
    const tx = await contract?.listItem(tokenId, price);
    await tx.wait();
    return {
      status: 'success',
      message: 'Token listed for sale successfully',
      code: 200,
      data: tx,
    };
  } catch (error) {
    if (error.code === 'ACTION_REJECTED') {
      return { status: 'failure', message: 'User denied transaction', code: 4001 };
    } else {
      return { status: 'failure', message: 'Something went wrong', code: 400 };
    }
  }
};

export const buyToken = async (tokenId, price, walletAddress) => {
  try {
    const contract = getNFTMarketplaceContractObject(walletAddress);
    const estimatedGas = await contract.estimateGas.buyItem(tokenId, {
      value: ethers.utils.parseUnits(price, 'ether'),
    });
    const bufferGas = estimatedGas.mul(15).toNumber();

    const tx = await contract.buyItem(tokenId, {
      value: ethers.utils.parseUnits(price, 'ether'),
      gasLimit: estimatedGas.add(bufferGas),
    });
    await tx.wait();
    return {
      status: 'success',
      message: 'Token bought successfully',
      code: 200,
      data: tx,
    };
  } catch (error) {
    if (error.code === 'ACTION_REJECTED') {
      return { status: 'failure', message: 'User denied transaction', code: 4001 };
    } else {
      return { status: 'failure', message: 'Something went wrong', code: 400 };
    }
  }
};

export const fetchDataOfItemFromIPFS = async (nft) => {
  try {
    const url = nft?.tokenURI;
    const ipfsMetadata = await axios.get(url);
    const mappedNftData = mapNftData(ipfsMetadata?.data, nft);
    return mappedNftData;
  } catch (error) {
    return {
      status: 'failure',
      message: 'Something went wrong while fetching data from IPFS.',
      code: 400,
    };
  }
};

const mapNftData = (ipfsMetadata, nft) => {
  const mappedNftData = {
    name: ipfsMetadata?.itemName,
    externalLink: ipfsMetadata?.externalLink,
    price: parseInt(nft?.price),
    description: ipfsMetadata?.description,
    attributes: ipfsMetadata?.attributes,
    media: ipfsMetadata?.image,
    tokenId: parseInt(nft?.tokenId),
    isListed: nft?.isListed,
    owner: nft?.owner,
    seller: nft?.seller,
    tokenUri: nft?.tokenURI,
  };

  return mappedNftData;
};

// ------------------------- BACKEND API ------------------------
export const getUserInfo = async (address) => {
  try {
    const url = `${BACKEND_BASE_URL}user/${address}`;
    const user = await axios.get(url);
    return {
      status: user?.data?.status,
      message: user?.data?.message,
      data: user?.data,
    };
  } catch (error) {
    return {
      status: 'failure',
      message: 'Something went wrong. Please try again',
      code: 400,
    };
  }
};

export const signup = async (address) => {
  try {
    const url = `${BACKEND_BASE_URL}signup/`;
    const data = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const user = await axios.post(url, { address: address }, data);
    return user;
  } catch (error) {
    return {
      status: 'failure',
      message: error?.response?.data?.message,
      code: 400,
    };
  }
};

export const updateUserInfo = async (userData, address) => {
  try {
    const url = `${BACKEND_BASE_URL}update-user/${address}`;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    const response = await axios.patch(url, userData, { headers });
    return response;
  } catch (error) {
    return { status: 'failure', message: error?.response?.data?.message, code: 400 };
  }
};
