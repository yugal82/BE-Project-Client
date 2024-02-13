// here all the functions related to functionality such as posting data to IPFS, minting NFTs, listing NFTs for sale, buying NFTs, etc will be defined and exported here.

import axios from 'axios';
import { getNFTMarketplaceContractObject } from '../utils/contract';
const pinata_jwt = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

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
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadJsonMetadataToIPFS = async (jsonData) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const metadata = JSON.stringify(jsonData);

  try {
    const response = await axios.post(url, metadata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: pinata_jwt,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createToken = async (uri, price, walletAddress) => {
  let tokenURI = `https://ipfs.io/ipfs/${uri.IpfsHash}`;
  try {
    const contract = getNFTMarketplaceContractObject(walletAddress);
    const mintedToken = await contract.mintNFT(price, tokenURI);
    return {
      mintedToken,
      status: 'success',
      message: 'Token created successfully',
      code: 200,
    };
  } catch (error) {
    if (error.code === 'ACTION_REJECTED') {
      return {
        status: 'failure',
        message: 'User denied transaction',
        code: 4001,
      };
    } else {
      console.log('something went wrong');
    }
  }
};
